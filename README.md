
# 🏗️ OrçaObras - Sistema de Orçamentos para Obras

![OrçaObras Application](https://cdn.abacus.ai/images/351aa123-c796-4aad-9f42-c71fe579030b.png)

Sistema completo para gestão de orçamentos de obras utilizando método de composição de custos unitários.

## 🚀 Como Usar no GitHub Codespaces

### 1️⃣ **Abrir no Codespaces:**
- Clique no botão verde **"Code"**
- Selecione **"Codespaces"**
- Clique em **"Create codespace on main"**

### 2️⃣ **Aguardar a Configuração:**
- O ambiente será configurado automaticamente
- Isso pode levar 2-3 minutos na primeira vez

### 3️⃣ **Acessar a Aplicação:**
- Após a configuração, a aplicação estará rodando em: **http://localhost:3000**
- Uma notificação aparecerá para abrir no navegador

### 4️⃣ **Fazer Login:**
- **Email:** `admin@orcaobras.com`
- **Senha:** `123456`

## 📊 **Funcionalidades Principais:**

### 🏠 **Dashboard:**
- Visão geral dos orçamentos
- Estatísticas e métricas
- Acesso rápido às funcionalidades

### 🧱 **Gestão de Insumos:**
- Materiais (tijolos, cimento, etc.)
- Mão de obra (pedreiro, servente, etc.)
- Equipamentos (betoneira, andaime, etc.)

### 🏗️ **Composições de Serviços:**
- Alvenaria de vedação
- Estrutura de concreto
- Revestimentos
- Instalações

### 📋 **Orçamentos Completos:**
- Criação de novos orçamentos
- Edição e duplicação
- Relatórios detalhados
- Exportação para Excel

## 🎯 **Exemplo Pré-Carregado:**
O sistema já vem com um orçamento fictício de um **sobrado de 180m²** com:
- 4 quartos e 3 suítes
- Estrutura completa
- Acabamentos
- Instalações

## 🛠️ **Tecnologias Utilizadas:**
- **Next.js 14** (React Framework)
- **TypeScript** (Tipagem estática)
- **Prisma** (ORM para banco de dados)
- **SQLite** (Banco de dados)
- **Tailwind CSS** (Estilização)
- **NextAuth.js** (Autenticação)

## 📱 **Interface Responsiva:**
- Funciona em desktop, tablet e celular
- Design moderno e intuitivo
- Navegação lateral com abas
- Filtros e pesquisas avançadas

## 🔧 **Comandos Úteis:**

```bash
# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma db push

# Iniciar em desenvolvimento
npm run dev

# Fazer build para produção
npm run build

# Iniciar em produção
npm start
```

## 🎨 **Estrutura do Projeto:**

```
├── app/                 # Páginas da aplicação
├── components/          # Componentes reutilizáveis
├── lib/                # Utilitários e configurações
├── prisma/             # Schema do banco de dados
├── public/             # Arquivos estáticos
└── styles/            # Estilos globais
```

## 📧 **Suporte:**
Criado especialmente para gestão profissional de orçamentos de obras, com foco na metodologia de composição de custos unitários utilizada na construção civil.

---
**🚀 Desenvolvido com Next.js + TypeScript + Prisma**
