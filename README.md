# 📘 Documentação Completa - **Sistema FitScore**

## 📋 Visão Geral
O **FitScore** é um sistema completo para avaliação e gerenciamento de candidatos, com **cálculo automático de Fit Score**.  
Ele é composto por:  
- 🖥️ **Back-end**: Spring Boot  
- 🌐 **Front-end**: Next.js  

🎥 **Demonstração em Vídeo**: [Assista aqui](https://youtu.be/LJKjO2CtYBg)

---

## 🚀 Como Executar o Sistema

### ✅ Pré-requisitos
- ☕ **Java JDK 17+**  
- 📦 **Maven 3.6+**  
- 🟩 **Node.js 16+**  
- 📌 **npm** ou **yarn**  
- 🐘 **PostgreSQL**  
- 🔗 **Ngrok instalado** na máquina  

---

### ⚙️ Passo a Passo

#### 1️⃣ Configurar o Banco de Dados
Edite o arquivo de configuração do back-end para inserir suas credenciais do Supabase:  
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fitscore
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
```

---

#### 2️⃣ Back-end (Spring Boot)
```bash
# Navegar até a pasta do back-end
cd fitscore-backend

# Compilar e executar
mvn clean install
mvn spring-boot:run
```

---

#### 3️⃣ Front-end (Next.js)
```bash
# Navegar até a pasta do front-end
cd fitscore-frontend

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

---

#### 🌍 Acessar a Aplicação
- **Front-end:** `http://localhost:3000`  
- **API Back-end:** `http://localhost:8080`  

---

## 🔗 Rodando o Ngrok

O **Ngrok** é usado para expor localmente o **backend** e o **frontend** na internet, permitindo:  
- Integrações externas (ex.: webhooks n8n)  
- Testes em dispositivos móveis  
- Acesso remoto  

### 📌 Pré-requisitos
- Ter o **Ngrok** baixado (`ngrok.exe` no Windows).  
- Ter o arquivo **`ngrok.yml`** configurado na pasta do projeto.  

### ▶️ Comando para iniciar
```powershell
C:\Users\mniac\Downloads\ngrok.exe start --config "C:\Users\mniac\Desktop\FitScore\ngrok.yml" --all
```

### 📄 Exemplo de `ngrok.yml`
```yaml
version: "2"
authtoken: SEU_AUTH_TOKEN
tunnels:
  backend:
    addr: 8080
    proto: http
  frontend:
    addr: 3000
    proto: http
```

➡️ Resultado:  
O terminal exibirá duas URLs públicas (uma para o **backend** e outra para o **frontend**).  

---

## ⚙️ Alterar Porta da API
Se precisar alterar a porta do backend, ajuste no front-end em `dashboard.tsx`:  
```typescript
const baseUrl = 'http://localhost:8080' // Altere aqui
```

---

## 📊 Estrutura do Sistema

### 🖥️ Back-end (Spring Boot)
- **Model:** `Candidato` (entidade JPA)  
- **DTOs:** `CandidatoDTO` (saída) e `CandidatoCreateDTO` (entrada)  
- **Repository:** Operações no banco de dados  
- **Service:** Regras de negócio e cálculos  
- **Controller:** Endpoints REST  

### 🌐 Front-end (Next.js)
- **Dashboard:** Lista e filtra candidatos  
- **Formulário:** Avaliação interativa com progresso  
- **Componentes:** Interface responsiva e intuitiva  
- **Integração:** Consumo da API REST  

---

## 🎯 Funcionalidades

### Back-end
- ✅ Cadastro de candidatos  
- ✅ Cálculo automático de **Fit Score (0-100)**  
- ✅ Classificação automática em categorias:  
  - **Fit Altíssimo** (≥80)  
  - **Fit Aprovado** (≥60)  
  - **Fit Questionável** (≥40)  
  - **Fora do Perfil** (<40)  
- ✅ Filtros de busca  
- ✅ Integração com **n8n via Webhook**  

### Front-end
- ✅ Dashboard com listagem e filtros  
- ✅ Formulário com cálculo em tempo real  
- ✅ Notificações automáticas  
- ✅ Design **responsivo** (desktop & mobile)  

---

## 🔌 Endpoints da API

### 📥 Criar Candidato
```bash
POST /api/candidatos
```
```bash
curl -X POST http://localhost:8080/api/candidatos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "respostas": [8,7,9,6,8,7,9,8,7,9]
  }'
```

### 📤 Listar Candidatos
```bash
GET /api/candidatos?classificacao=ALTO
```

### 📄 Buscar por ID
```bash
GET /api/candidatos/{id}
```

---

## 🛠️ Comandos Úteis

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

---

## ⚠️ Solução de Problemas

- 🔌 **Erro de Conexão com Banco:**  
  Verifique se o PostgreSQL está rodando e se as credenciais no `application.properties` estão corretas.  

- 🌍 **Erro de CORS:**  
  O backend aceita requests apenas do `localhost:3000`. Ajuste se usar outra porta.  

- 📝 **Formulário não envia:**  
  Certifique-se de que todas as 10 perguntas foram respondidas (0 a 10).  
