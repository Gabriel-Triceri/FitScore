package com.mini.fitscore.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Objects;

public class CandidatoCreateDTO {

    @NotBlank
    private String nome;

    @NotBlank
    @Email
    private String email;

    @Size(min = 10, max = 10)
    private List<Integer> respostas;

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

    public List<Integer> getRespostas() {
        return respostas;
    }

    public void setRespostas(List<Integer> respostas) {
        this.respostas = respostas;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CandidatoCreateDTO that = (CandidatoCreateDTO) o;
        return Objects.equals(nome, that.nome) &&
                Objects.equals(email, that.email) &&
                Objects.equals(respostas, that.respostas);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nome, email, respostas);
    }

    @Override
    public String toString() {
        return "CandidatoCreateDTO{" +
                "nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", respostas=" + respostas +
                '}';
    }
}
