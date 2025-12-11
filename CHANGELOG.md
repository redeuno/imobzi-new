# Changelog

## [2.0.0] - 2025-12-11

### Arquitetura Modular

Reestruturação completa do pacote com 7 nodes modulares cobrindo 100% da API Imobzi (300 endpoints).

### Novos Nodes

- **Imobzi Contacts** (~40 endpoints)
  - Contacts, Leads, Persons, Organizations
  - Tags e Custom Fields

- **Imobzi Properties** (~55 endpoints)
  - Properties, Photos, Types, Features
  - Adverts, Reserves, Neighborhoods

- **Imobzi Deals** (~45 endpoints)
  - Deals, Pipelines, Pipeline Groups
  - Filters, Rotations, Proposals

- **Imobzi Financial** (~50 endpoints)
  - Accounts, Transactions, Categories
  - Invoices, Nota Fiscal, Banks
  - Landlord Accounts/Transactions

- **Imobzi Leases** (~30 endpoints)
  - Leases, Contracts
  - Insurance, Agreements
  - Checklists, Readjustments

- **Imobzi Core** (~80 endpoints)
  - Users, Teams, Documents
  - Calendar, Timelines, Notifications
  - Webhooks, Media Sources, Integrations
  - Reports, Credit Analysis, Chat

### Atualizações

- **Imobzi Webhook** (Trigger)
  - 30+ tipos de eventos suportados
  - Filtro por tipo de evento
  - Opção Raw Data
  - Sintaxe atualizada (NodeConnectionType)

- **Imobzi API Credentials**
  - Campo Base URL configurável
  - Header X-Imobzi-Secret

### Removidos

- `Imobzi.node.ts` - Node monolítico substituído pelos modulares
- `ImobziSimples.node.ts` - Node de teste obsoleto

### Breaking Changes

- Estrutura completamente nova (modular)
- Nodes antigos removidos
- Versão mínima n8n: 1.0.0

---

## [1.2.3] - 2025-12-10

### Correções
- Ajustes de compatibilidade

---

## [1.0.0] - 2025-12-09

### Atualização Major - Nova API Imobzi

- URL Base: `https://api.imobzi.com` → `https://api.imobzi.app`
- Novos recursos adicionados
- Mapeamento para nova estrutura da API

---

## [0.3.48] e anteriores

Versões anteriores com API antiga (`api.imobzi.com`).
