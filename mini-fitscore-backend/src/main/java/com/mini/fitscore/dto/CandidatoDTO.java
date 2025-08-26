package com.mini.fitscore.dto;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

public class CandidatoDTO {

    private Long id;
    private String nome;
    private String email;
    private Integer fitScore;
    private String classificacao;
    private List<Integer> respostas;
    private OffsetDateTime criadoEm;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getFitScore() {
        return fitScore;
    }

    public void setFitScore(Integer fitScore) {
        this.fitScore = fitScore;
    }

    public String getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(String classificacao) {
        this.classificacao = classificacao;
    }

    public List<Integer> getRespostas() {
        return respostas;
    }

    public void setRespostas(List<Integer> respostas) {
        this.respostas = respostas;
    }

    public OffsetDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(OffsetDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CandidatoDTO that = (CandidatoDTO) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(nome, that.nome) &&
                Objects.equals(email, that.email) &&
                Objects.equals(fitScore, that.fitScore) &&
                Objects.equals(classificacao, that.classificacao) &&
                Objects.equals(respostas, that.respostas) &&
                Objects.equals(criadoEm, that.criadoEm);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, email, fitScore, classificacao, respostas, criadoEm);
    }

    @Override
    public String toString() {
        return "CandidatoDTO{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", fitScore=" + fitScore +
                ", classificacao='" + classificacao + '\'' +
                ", respostas=" + respostas +
                ", criadoEm=" + criadoEm +
                '}';
    }
}
