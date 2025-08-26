package com.mini.fitscore.repository;

import com.mini.fitscore.model.Candidato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, Long> {
    List<Candidato> findByFitScoreGreaterThanEqual(Integer fitScore);
}
