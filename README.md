# n8n-nodes-imobzi

Pacote de nodes da comunidade n8n para integração completa com a API da Imobzi.

**Versão 2.0.0** - Arquitetura modular com cobertura de 300 endpoints.

## Nodes Disponíveis

| Node | Descrição | Endpoints |
|------|-----------|-----------|
| **Imobzi Webhook** | Trigger para receber eventos em tempo real | - |
| **Imobzi Contacts** | Contatos, Leads, Pessoas, Organizações | ~40 |
| **Imobzi Properties** | Imóveis, Fotos, Tipos, Características | ~55 |
| **Imobzi Deals** | Negócios, Pipelines, Filtros, Rotações | ~45 |
| **Imobzi Financial** | Contas, Transações, Faturas, NF-e | ~50 |
| **Imobzi Leases** | Locações, Contratos, Seguros | ~30 |
| **Imobzi Core** | Usuários, Documentos, Calendário, Webhooks, Times | ~80 |

**Total: ~300 endpoints da API Imobzi**

## Instalação

### Via npm (global)
```bash
npm install -g @mantovani.bruno/n8n-nodes-imobzi-new
```

### Via interface do n8n
Settings → Community Nodes → Install:
```
@mantovani.bruno/n8n-nodes-imobzi-new
```

## Configuração

### 1. Gerar Chave de API no Imobzi

1. Acesse o menu lateral do Imobzi
2. Clique em **"Integrações & Automações"**
3. Selecione **"Chave de API"**
4. Clique em **"Adicionar uma nova chave de API"**
5. Copie a chave gerada

Docs: [Como funciona a chave de API](https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/)

### 2. Configurar Credenciais no n8n

1. No n8n, vá para **Settings** > **Credentials**
2. Clique em **Add Credential**
3. Procure por **"Imobzi API"**
4. Configure:
   - **API Key**: Cole a chave gerada no Imobzi
   - **Base URL**: `https://api.imobzi.app` (padrão)

## Recursos por Node

### Imobzi Contacts
- **Contact**: getAll, search, exists, getProfilePicture
- **Person**: create, get, getByCode, update, delete
- **Lead**: create, get, getByCode, update, delete
- **Organization**: create, get, getByCode, update, delete
- **Contact Tag**: getAll, create, get, update, delete
- **Person Field**: getAll, create, get, update, delete
- **Organization Field**: getAll, create, get, update, delete

### Imobzi Properties
- **Property**: getAll, search, get, getByCode, create, update, delete, exists, getByMap, getStatistics, getDealsMatch
- **Property Type**: getAll, create, get, update, delete
- **Property Feature**: getAll, create, get, update, delete
- **Property Field**: getAll, create, get, update, delete
- **Property Photo**: add, update, delete
- **Property Advert**: getAll, create, get, update, delete
- **Property Reserve**: getAll, create, get, update, delete
- **Neighborhood**: getAll, create, get, update, delete
- **City**: getAll
- **State**: getAll

### Imobzi Deals
- **Deal**: getAll, search, get, create, update, delete, getRangeAreas, getRangeValues, getPropertiesMatch, getDealsDone
- **Pipeline**: getAll, create, get, update, delete
- **Pipeline Group**: getAll, create, get, update, delete
- **Deal Field**: getAll, create, get, update, delete
- **Deal Lost Reason**: getAll, create, get, update, delete
- **Deal Filter**: getAll, getFields, create, update, delete
- **Deal Rotation**: getAll, create, get, update, delete
- **Proposal**: getByProperty, getByDeal, getAllDeals

### Imobzi Financial
- **Account**: getAll, create, get, update, delete
- **Transaction**: getAll, create, get, update, delete, addAttachment, getMatch, getOrganization
- **Category**: getAll, create, get, update, delete
- **Landlord Account**: getAll, get, getOnlending
- **Landlord Transaction**: getAll, create, get, update, delete
- **Invoice**: getAll, create, get, update, sendNotification
- **Nota Fiscal**: getAll, create, get, update, delete, sendEmail, getLandlordTransactions
- **Bank**: getAll, create, get
- **Financial Tag**: getAll
- **Commission**: getOnlending

### Imobzi Leases
- **Lease**: getAll, create, get, getByCode, update, delete
- **Contract**: getAll, create, get, getByCode, update, delete
- **Lease Field**: getAll, create, get, update, delete
- **Contract Field**: getAll, create, get, update, delete
- **Insurance**: calculate, hire, cancel, noCancellation
- **Agreement**: create
- **Calculate**: calculate
- **Checklist**: getDefault
- **Item Description**: getDefault
- **Annual Readjustment**: getAll, get

### Imobzi Core
- **User**: getAll, get, getProfile, getProperties, getRanking, getRules, getAllRules, validateEmail, create
- **Team**: getAll, get, create, update, delete
- **Document**: getAll, get, create, update, delete, duplicate, addFile, deleteFile, getFee
- **Calendar**: getAll, get, create, update, delete
- **Calendar Type**: getAll, create, update, delete
- **Timeline**: getAll, get, create, update, delete
- **Notification**: getAll, create, update
- **Webhook**: getAll, get, create, update, delete
- **Media Source**: getAll, get, create, update, delete, getReport
- **Integration**: getAll
- **Revision**: getAll, get, restore
- **Parameter**: getAll
- **Chat**: getAll, create
- **Send Message**: send (email, sms, whatsapp)
- **Measure**: getAll, create
- **User Billing**: getAll
- **Utils**: get
- **Vacation Calendar**: get, update
- **Realtor**: getAll
- **Report**: siteAnalytics, userPerformance
- **Credit Analysis**: getAll, get, create, update, delete, getFee
- **Real Estate Post**: getComments, createComment, updateComment, deleteComment, getReplies, createReply, updateReply, deleteReply

### Imobzi Webhook (Trigger)
Recebe eventos em tempo real:
- Contacts: created, updated, deleted
- Leads: created, updated, deleted
- Properties: created, updated, deleted
- Deals: created, updated, deleted, stage_changed, won, lost
- Contracts: created, updated, deleted
- Leases: created, updated, deleted
- Documents: created, updated, deleted
- Calendar: created, updated, deleted
- Tasks: created, updated, completed
- Transactions: created, updated
- Invoices: created, paid
- Visits: scheduled, confirmed, cancelled, completed

## Compatibilidade

- **n8n**: >= 1.0.0
- **Node.js**: >= 20.15
- **Plano Imobzi**: CRM Business ou Gestão de Locação Real Estate
- **API**: https://api.imobzi.app

## Links

- [Repositório GitHub](https://github.com/redeuno/imobzi-new)
- [Pacote npm](https://www.npmjs.com/package/@mantovani.bruno/n8n-nodes-imobzi-new)
- [Documentação API Imobzi](https://developer.imobzi.com/)
- [Documentação n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

---

**Autor**: Bruno Mantovani
**Versão**: 2.0.0
**Licença**: MIT
**API Base**: https://api.imobzi.app
