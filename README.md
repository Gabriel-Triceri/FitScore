
# Documentação Completa - Sistema FitScore

## 📋 Visão Geral
Sistema completo para avaliação e gerenciamento de candidatos com cálculo automático de Fit Score. Composto por back-end Spring Boot e front-end Next.js.
## Link do video
https://youtu.be/LJKjO2CtYBg
## 🚀 Como Executar o Sistema Completo

### Pré-requisitos
- Java JDK 17+
- Maven 3.6+
- Node.js 16+
- npm ou yarn
- Banco de dados PostgreSQL

### Passo a Passo

#### Configurar o Banco de Dados
```bash
# Criar database no PostgreSQL
createdb fitscore
```

#### Back-end (Spring Boot)
```bash
# Navegar até a pasta do back-end
cd fitscore-backend

# Configurar application.properties
# Editar com suas credenciais do banco:
# spring.datasource.url=jdbc:postgresql://localhost:5432/fitscore
# spring.datasource.username=seu-usuario
# spring.datasource.password=sua-senha

# Compilar e executar
mvn clean install
mvn spring-boot:run
```

#### Front-end (Next.js)
```bash
# Navegar até a pasta do front-end
cd fitscore-frontend

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

### Acessar a Aplicação
- Front-end: `http://localhost:3000`
- API Back-end: `http://localhost:8080`


### Alterar Porta da API
Se necessário alterar a porta do back-end, edite o front-end em `dashboard.tsx`:
```typescript
const baseUrl = 'http://localhost:8080' // Altere para a nova porta
```

## 📊 Estrutura do Sistema

### Back-end (Spring Boot)
- **Model:** Candidato (entidade JPA)
- **DTO:** CandidatoDTO (saída) e CandidatoCreateDTO (entrada)
- **Repository:** Operações de banco de dados
- **Service:** Lógica de negócio e cálculos
- **Controller:** Endpoints REST

### Front-end (Next.js)
- **Dashboard:** Visualização de candidatos com filtros
- **Formulário:** Avaliação de candidatos com sistema de blocos
- **Componentes:** Interface responsiva e intuitiva
- **Integração:** Consumo da API RESTful

## 🎯 Funcionalidades Principais

### Back-end
- ✅ Cadastro de candidatos com nome, e-mail e respostas
- ✅ Cálculo automático de Fit Score (0-100)
- ✅ Classificação automática em categorias:
  - Fit Altíssimo (≥80)
  - Fit Aprovado (≥60)
  - Fit Questionável (≥40)
  - Fora do Perfil (<40)
- ✅ Filtros por classificação
- ✅ Integração com n8n via webhook

### Front-end
- ✅ Dashboard com listagem de candidatos
- ✅ Filtros por classificação
- ✅ Formulário de avaliação com progresso
- ✅ Cálculo em tempo real do Fit Score
- ✅ Design responsivo para mobile e desktop
- ✅ Sistema de notificações para candidatos

## 🔌 Endpoints da API

- **GET /api/candidatos**: Lista todos os candidatos (com filtro opcional)
```bash
curl "http://localhost:8080/api/candidatos?classificacao=ALTO"
```

- **POST /api/candidatos**: Cria um novo candidato
```bash
curl -X POST http://localhost:8080/api/candidatos   -H "Content-Type: application/json"   -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "respostas": [8,7,9,6,8,7,9,8,7,9]
  }'
```

- **GET /api/candidatos/{id}**: Busca candidato por ID
```bash
curl http://localhost:8080/api/candidatos/1
```

## 🛠 Comandos Úteis

### Back-end
```bash
# Empacotar para produção
mvn package
```

### Front-end
```bash
# Build de produção
npm run build

# Executar em produção
npm start

```

## ⚠️ Solução de Problemas
- **Erro de Conexão com Banco:** Verifique se o PostgreSQL está rodando e as credenciais no `application.properties` estão corretas.  
- **Erro de CORS:** O back-end está configurado para aceitar requests do front-end na porta 3000.  
- **Formulário Não Envia:** Verifique se todas as 10 perguntas foram respondidas (escala 0-10).  

