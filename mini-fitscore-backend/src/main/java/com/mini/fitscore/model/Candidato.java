package com.mini.fitscore.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
@Table(name = "candidatos")
public class Candidato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    @Column(columnDefinition = "text")
    private String respostasJson;

    private Integer fitScore;

    private String classificacao;

    private OffsetDateTime criadoEm;

    public Candidato() {
    }

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

    public String getRespostasJson() {
        return respostasJson;
    }

    public void setRespostasJson(String respostasJson) {
        this.respostasJson = respostasJson;
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
        Candidato candidato = (Candidato) o;
        return Objects.equals(id, candidato.id) &&
                Objects.equals(nome, candidato.nome) &&
                Objects.equals(email, candidato.email) &&
                Objects.equals(respostasJson, candidato.respostasJson) &&
                Objects.equals(fitScore, candidato.fitScore) &&
                Objects.equals(classificacao, candidato.classificacao) &&
                Objects.equals(criadoEm, candidato.criadoEm);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, email, respostasJson, fitScore, classificacao, criadoEm);
    }

    @Override
    public String toString() {
        return "Candidato{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", respostasJson='" + respostasJson + '\'' +
                ", fitScore=" + fitScore +
                ", classificacao='" + classificacao + '\'' +
                ", criadoEm=" + criadoEm +
                '}';
    }
}
