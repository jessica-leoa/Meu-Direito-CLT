![Build Status](https://github.com/jessica-leoa/Meu-Direito-CLT/actions/workflows/main.yml/badge.svg)
![License](https://img.shields.io/github/license/jessica-leoa/Meu-Direito-CLT)
![Last Commit](https://img.shields.io/github/last-commit/jessica-leoa/Meu-Direito-CLT)
![Top Languages](https://img.shields.io/github/languages/top/jessica-leoa/Meu-Direito-CLT)
![Repo Size](https://img.shields.io/github/repo-size/jessica-leoa/Meu-Direito-CLT)
![Contributors](https://img.shields.io/github/contributors/jessica-leoa/Meu-Direito-CLT)
![Open Issues](https://img.shields.io/github/issues/jessica-leoa/Meu-Direito-CLT)
![Forks](https://img.shields.io/github/forks/jessica-leoa/Meu-Direito-CLT)
![Stars](https://img.shields.io/github/stars/jessica-leoa/Meu-Direito-CLT)
![Version](https://img.shields.io/github/v/tag/jessica-leoa/Meu-Direito-CLT)
# Meu-Direito-CLT

## 📖 Sobre o Projeto
**Meu Direito CLT** é um **software open source** criado para democratizar o acesso à informação sobre os direitos trabalhistas no Brasil.  
O projeto nasceu da percepção de que muitos trabalhadores não conhecem seus direitos previstos na CLT e acabam sofrendo abusos ou se sentindo culpados por situações injustas no ambiente de trabalho.    

Sendo assim, o projeto surge com o objetivo é oferecer uma ferramenta prática, simples e confiável para que qualquer trabalhador CLT possa:
- Consultar seus direitos de forma acessível
- Ter resposta das principais dúvidas sobre seus direitos 
- Reconhecer quando está sofrendo abuso de poder
- Saber a importancia de saber seus direitos e onde recorrer quando perceber quando eles são violados
- Tirar dúvidas específicas através de um chatbot especializado (Implemetação futura)

💡 O objetivo do MVP é **fornecer uma API simples, prática e confiável** que auxilie o trabalhador a **simular cálculos trabalhistas** de forma automática e educativa.

---

## 🛠️ Tecnologias Utilizadas

### Back-end
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)  
- Integração com [API Gemini](https://ai.google.dev/) para IA  
- Arquitetura em modulos

### Testes
- [Jest](https://jestjs.io/)  
- [Supertest](https://github.com/ladjs/supertest)  

---

## 🎯 Funcionalidades Principais

Atualmente, o projeto conta com **três módulos principais**, todos com testes automatizados e documentados:

| Módulo          | Descrição                                                                                  | Endpoint                     |
| --------------- | ------------------------------------------------------------------------------------------ | ---------------------------- |
| 🗓️ Férias      | Calcula o valor proporcional de férias + 1/3 constitucional                                | `/api/ferias/calcular`       |
| 💼 Rescisão     | Simula uma rescisão contratual com base no tipo (sem justa causa, pedido de demissão etc.) | `/api/rescisao`              |
| ⏱️ Horas Extras | Calcula o valor das horas extras com acréscimo de 50% ou 100%                              | `/api/horas-extras/calcular` |

---

## 🧩 Arquitetura do Projeto

O projeto segue uma arquitetura modular e organizada:

```
src/
├── modules/
│   ├── ferias/
│   ├── rescisao/
│   └── horas-extras/
│
├── server.ts
└── index.ts
```

Cada módulo contém seus próprios arquivos de:

* `Controller` — lógica das requisições HTTP
* `Service` — regras de negócio e cálculos
* `Entity` — interfaces de entrada/saída de dados
* `Routes` — definição das rotas Express

---

## ⚙️ Instalação e Execução

### 🧰 Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/)

---

### 🪜 Passo a passo de instalação

```bash
# 1️⃣ Clone o repositório
git clone https://github.com/jessica-leoa/Meu-Direito-CLT.git

# 2️⃣ Acesse a pasta
cd Meu-Direito-CLT

# 3️⃣ Instale as dependências
npm install

# 4️⃣ Execute o servidor em modo desenvolvimento
npm run dev
```

---

### 🚀 Como rodar a aplicação

Após iniciar o servidor, a API estará disponível em:

```
http://localhost:3000

```
---

## 🧪 Testes Automatizados

O projeto utiliza **Jest** e **Supertest** para testes de unidade e integração.

### Para executar os testes:

```bash
npm test
```

Os testes cobrem os principais fluxos de cálculo das rotas de:

* Férias
* Rescisão
* Horas Extras

---

## 📸 Testes de Rotas (via Thunder Client)

Na pasta `/docs/tests` estão os **prints obrigatórios** com os testes realizados via Thunder Client.
Exemplo de nomeação:

```
01_calculo_ferias.png
02_rescisao_sem_justa_causa.png
03_horas_extras_100.png
```

---

## 🔄 CI/CD Pipeline

O projeto possui integração contínua configurada com **GitHub Actions**.

📂 Arquivo: `.github/workflows/main.yml`

### Etapas do pipeline:

1. **Instala dependências**
2. **Executa build**
3. **Roda os testes automatizados**
4. **(Deploy automático)** — conectado ao Render via API Key

---

## ☁️ Deploy no Render

O deploy automático é feito após sucesso nos testes, usando:

* **`RENDER_API_KEY`** e **`RENDER_SERVICE_ID`** configurados nos *secrets* do GitHub.

## 📚 Documentação de Rotas

| Módulo           | Método | Rota                         | Parâmetros (JSON)                                                                                                    | Exemplo de Saída                                                       |
| ---------------- | ------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Férias**       | `POST` | `/api/ferias/calcular`       | `{ "salarioMensal": 3000, "mesesTrabalhados": 6 }`                                                                   | `{ "feriasProporcionais": 1500, "umTercoFerias": 500, "total": 2000 }` |
| **Rescisão**     | `POST` | `/api/rescisao`              | `{ "salarioMensal": 3000, "mesesTrabalhados": 6, "avisoPrevioIndenizado": true, "tipoRescisao": "sem_justa_causa" }` | `{ "resumo": [...], "descontos": [...], "totalLiquido": 6079.71 }`     |
| **Horas Extras** | `POST` | `/api/horas-extras/calcular` | `{ "salarioMensal": 3000, "horasExtras": 10, "percentualAdicional": 50 }`                                            | `{ "valorHora": 13.63, "valorTotal": 204.45 }`                         |

---

## ✅ Checklist de Entrega

| Item                                   | Status                         |
| -------------------------------------- | ------------------------------ |
| README completo e descritivo           | ✅                              |
| Passo a passo de instalação e execução | ✅                              |
| Testes automatizados documentados      | ✅                              |
| Pipeline CI/CD configurado             | ✅                              |
| Prints do Thunder Client               | ✅                              |
| Conexão com Render (deploy automático) | ✅                              |
| Integração com MongoDB                 | ❌ *(não aplicável a este MVP)* |

---


## 🤝 Como Contribuir

Este é um **software open source** e toda contribuição é bem-vinda!  

Para saber como colaborar, leia nosso guia de contribuição:  
👉 [CONTRIBUTING.md](CONTRIBUTING.md)

## Wiki
Para mais informações e documentação do projeto, acesse nossa [Wiki](https://github.com/jessica-leoa/Meu-Direito-CLT).



---






