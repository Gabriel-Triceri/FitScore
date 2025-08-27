package com.mini.fitscore.controller;

import com.mini.fitscore.dto.CandidatoCreateDTO;
import com.mini.fitscore.dto.CandidatoDTO;
import com.mini.fitscore.service.CandidatoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/candidatos")
public class CandidatoController {
    private final CandidatoService service;

    public CandidatoController(CandidatoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CandidatoCreateDTO dto) {
        try {
            CandidatoDTO saved = service.create(dto);
            return ResponseEntity.ok(saved);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping
    public CompletableFuture<ResponseEntity<List<CandidatoDTO>>> list(@RequestParam(required = false) String classificacao) {
        return service.listAllAsync(classificacao)
                .thenApply(ResponseEntity::ok);
    }

    @GetMapping("/{id}")
    public CompletableFuture<ResponseEntity<CandidatoDTO>> getById(@PathVariable Long id) {
        return service.getByIdAsync(id)
                .thenApply(dto -> {
                    if (dto == null) {
                        return ResponseEntity.notFound().build();
                    }
                    return ResponseEntity.ok(dto);
                });
    }
}