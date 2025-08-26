package com.mini.fitscore.controller;

import com.mini.fitscore.dto.CandidatoCreateDTO;
import com.mini.fitscore.dto.CandidatoDTO;
import com.mini.fitscore.service.CandidatoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<List<CandidatoDTO>> list(@RequestParam(required = false) String classificacao) {
        return ResponseEntity.ok(service.listAll(classificacao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        CandidatoDTO dto = service.getById(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }
}
