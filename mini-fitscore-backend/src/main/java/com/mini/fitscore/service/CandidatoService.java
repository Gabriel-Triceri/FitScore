package com.mini.fitscore.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mini.fitscore.dto.CandidatoCreateDTO;
import com.mini.fitscore.dto.CandidatoDTO;
import com.mini.fitscore.model.Candidato;
import com.mini.fitscore.repository.CandidatoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class CandidatoService {
    private final CandidatoRepository repository;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${n8n.webhook.url:}")
    private String n8nWebhookUrl;

    public CandidatoService(CandidatoRepository repository) {
        this.repository = repository;
    }

    public CandidatoDTO create(CandidatoCreateDTO dto) throws Exception {
        return createAsync(dto).get();
    }


    @Async("taskExecutor")
    public CompletableFuture<CandidatoDTO> createAsync(CandidatoCreateDTO dto) {
        try {
            List<Integer> respostas = dto.getRespostas() != null ? dto.getRespostas() : new ArrayList<>();
            if (respostas.size() != 10) {
                throw new IllegalArgumentException("São necessárias 10 respostas");
            }

            int soma = respostas.stream().mapToInt(Integer::intValue).sum();
            int fitScore = Math.toIntExact(Math.round((soma / (10.0f * 10.0f)) * 100.0f));

            String classificacao = classify(fitScore);

            Candidato c = new Candidato();
            c.setNome(dto.getNome());
            c.setEmail(dto.getEmail());
            c.setRespostasJson(objectMapper.writeValueAsString(respostas));
            c.setFitScore(fitScore);
            c.setClassificacao(classificacao);
            c.setCriadoEm(OffsetDateTime.now());

            Candidato saved = repository.save(c);


            notifyN8nWebhookAsync(saved);

            return CompletableFuture.completedFuture(toDto(saved));
        } catch (Exception ex) {
            return CompletableFuture.failedFuture(ex);
        }
    }


    @Async("taskExecutor")
    public void notifyN8nWebhookAsync(Candidato candidato) {
        if (n8nWebhookUrl != null && !n8nWebhookUrl.isBlank()) {
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                Map<String, Object> payload = Map.of(
                        "id", candidato.getId(),
                        "nome", candidato.getNome(),
                        "email", candidato.getEmail(),
                        "fitScore", candidato.getFitScore(),
                        "classificacao", candidato.getClassificacao()
                );
                HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
                restTemplate.postForEntity(n8nWebhookUrl, entity, String.class);
            } catch (Exception ex) {
                System.out.println("Erro ao notificar n8n: " + ex.getMessage());
            }
        }
    }


    @Async("taskExecutor")
    public CompletableFuture<List<CandidatoDTO>> listAllAsync(String classificacaoFilter) {
        return CompletableFuture.completedFuture(listAll(classificacaoFilter));
    }

    public List<CandidatoDTO> listAll(String classificacaoFilter) {
        List<Candidato> all = repository.findAll();
        List<Candidato> filtered = all;

        if (classificacaoFilter != null && !classificacaoFilter.isBlank()) {

            String filtroNormalizado = switch (classificacaoFilter.toUpperCase()) {
                case "BAIXO" -> "Fora do Perfil";
                case "MEDIO", "MÉDIO" -> "Fit Questionável";
                case "ALTO" -> "Fit Aprovado";
                case "ALTISSIMO", "ALTÍSSIMO" -> "Fit Altíssimo";
                default -> classificacaoFilter;
            };

            filtered = all.stream()
                    .filter(c -> c.getClassificacao() != null &&
                            c.getClassificacao().equalsIgnoreCase(filtroNormalizado))
                    .collect(Collectors.toList());
        }

        return filtered.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Async("taskExecutor")
    public CompletableFuture<List<CandidatoDTO>> listApprovedOrHigherAsync() {
        return CompletableFuture.completedFuture(listApprovedOrHigher());
    }

    public List<CandidatoDTO> listApprovedOrHigher() {
        List<Candidato> list = repository.findByFitScoreGreaterThanEqual(80);
        return list.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Async("taskExecutor")
    public CompletableFuture<CandidatoDTO> getByIdAsync(Long id) {
        return CompletableFuture.completedFuture(getById(id));
    }

    public CandidatoDTO getById(Long id) {
        return repository.findById(id).map(this::toDto).orElse(null);
    }

    private CandidatoDTO toDto(Candidato c) {
        CandidatoDTO dto = new CandidatoDTO();
        dto.setId(c.getId());
        dto.setNome(c.getNome());
        dto.setEmail(c.getEmail());
        dto.setFitScore(c.getFitScore());
        dto.setClassificacao(c.getClassificacao());
        try {
            List<Integer> respostas = objectMapper.readValue(c.getRespostasJson(), new TypeReference<List<Integer>>(){});
            dto.setRespostas(respostas);
        } catch (Exception ex) {
            dto.setRespostas(new ArrayList<>());
        }
        dto.setCriadoEm(c.getCriadoEm());
        return dto;
    }

    private String classify(int score) {
        if (score >= 80) return "Fit Altíssimo";
        if (score >= 60) return "Fit Aprovado";
        if (score >= 40) return "Fit Questionável";
        return "Fora do Perfil";
    }
}