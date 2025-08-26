
# Documentação do Back-end - FitScore

## 📋 Principais Funcionalidades

- **Cadastro de Candidatos:** Recebe nome, e-mail e 10 respostas para cálculo do Fit Score  
- **Cálculo Automático:** Calcula pontuação (0-100) baseada nas respostas  
- **Classificação Automática:**
  - Fit Altíssimo (≥80)  
  - Fit Aprovado (≥60)  
  - Fit Questionável (≥40)  
  - Fora do Perfil (<40)  
- **Filtros:** Listagem por classificação ou todos os candidatos  
- **Integração n8n:** Webhook automático para novos cadastros  

## 🚀 Como Executar
- Abra a classe `MiniFitscoreApplication` no seu IDE de preferência.
- Clique em **Run** ou execute como aplicação Java.

### Pré-requisitos
- Java JDK 17+  
- Maven 3.6+  
- Banco de dados (ex: PostgreSQL)  

### Configuração
1. Clone o repositório  
2. Configure o banco em `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fitscore
spring.datasource.username=seu-usuario
spring.datasource.password=sua-senha
```

### Execução

```bash
mvn clean install
mvn spring-boot:run
```

A API estará disponível em: `http://localhost:8080/api/candidatos`

## 📊 Estrutura Principal

- **Model:** `Candidato` (entidade JPA)  
- **DTO:** `CandidatoDTO` (saída) e `CandidatoCreateDTO` (entrada)  
- **Repository:** `CandidatoRepository` (operações de BD)  
- **Service:** Lógica de negócio e cálculos  
- **Controller:** Endpoints REST  
