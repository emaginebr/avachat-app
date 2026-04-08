<!--
  Sync Impact Report
  ==================
  Version change: 1.0.0 → 2.0.0
  Modified principles:
    - I. Stack Tecnológica (atualizada para refletir stack real)
  Added sections: none
  Removed sections: none
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no changes needed
    - .specify/templates/spec-template.md ✅ no changes needed
    - .specify/templates/tasks-template.md ✅ no changes needed
  Follow-up TODOs: none
  Bump rationale: MAJOR — redefinição da stack tecnológica (React 18→19,
  Bootstrap→Tailwind, Context API→Zustand, versões de Vite/TS/Router)
-->

# Avachat Frontend Constitution

## Skills Obrigatórias

Para implementação de novas funcionalidades frontend, a seguinte skill
**DEVE** ser utilizada:

| Skill | Quando usar | Invocação |
|---|---|---|
| **react-architecture** | Criar Types, Service, Context, Hook e registrar Provider | `/react-architecture` |

Esta skill cobre:
- Padrões de arquivos frontend (Types, Services, Contexts, Hooks)
- Provider chain e registro de novos providers
- Padrões de tratamento de erros (handleError, clearError, loading state)

**NÃO** reimplemente esses padrões manualmente — siga a skill.

## Core Principles

### I. Stack Tecnológica

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React | 19.x | Framework UI |
| TypeScript | 6.x | Tipagem estática |
| React Router | 7.x | Roteamento SPA |
| Vite | 8.x | Build toolchain |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| @tailwindcss/typography | 0.5.x | Prose classes para Markdown |
| Zustand | 5.x | State management (stores) |
| Fetch API | Nativo | HTTP client (novos serviços) |
| react-markdown | 10.x | Renderização de Markdown |

Regras:
- Vite é o bundler obrigatório — **NÃO** usar CRA, Webpack manual,
  ou outros bundlers.
- **Zustand** é o padrão de state management — **NÃO** adicionar
  Redux, MobX ou outras bibliotecas de estado.
- **Tailwind CSS** é o framework de estilo — **NÃO** adicionar
  Bootstrap, Material UI ou outros frameworks CSS.
- **NÃO** executar comandos `docker` ou `docker compose` no ambiente
  local — Docker não está acessível.
- Variáveis de ambiente frontend usam prefixo `VITE_` (padrão Vite).
  **NÃO** usar `REACT_APP_`.

### II. Case Sensitivity de Diretórios (Inviolável)

| Diretório | Casing | Motivo |
|---|---|---|
| `Contexts/` | Uppercase C | Compatibilidade Docker/Linux |
| `Services/` | Uppercase S | Compatibilidade Docker/Linux |
| `hooks/` | Lowercase h | Convenção React |
| `types/` | Lowercase t | Convenção TypeScript |

Todos os imports **DEVEM** corresponder exatamente ao casing no disco.

### III. Convenções de Código (TypeScript/React)

| Elemento | Convenção | Exemplo |
|---|---|---|
| Componentes | PascalCase | `LoginPage`, `CampaignCard` |
| Interfaces | PascalCase | `CampaignContextType` |
| Variáveis / Funções | camelCase | `getHeaders`, `loadCampaigns` |
| Constantes | UPPER_CASE | `AUTH_STORAGE_KEY` |
| Tipos | `interface` (não `type`) | `interface CampaignInfo {}` |
| Funções | Arrow functions | `const fn = () => {}` |
| Variáveis | `const` por padrão | `const campaigns = []` |

### IV. Autenticação e Segurança

| Aspecto | Padrão |
|---|---|
| Header | `Authorization: Basic {token}` |
| Storage | localStorage key `"login-with-metamask:auth"` |

Regras de segurança:
- **NUNCA** armazenar tokens em cookies — usar localStorage.
- **NUNCA** expor connection strings ou secrets no frontend.

### V. Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `VITE_API_URL` | Sim | URL base da API backend |
| `VITE_WS_URL` | Sim | URL base do WebSocket |
| `VITE_SITE_BASENAME` | Não | Base path do React Router |

Prefixo obrigatório `VITE_` — padrão Vite. Acessar via
`import.meta.env.VITE_*`.

## Checklist para Novos Contribuidores

Antes de submeter qualquer código, verifique:

- [ ] Utilizou a skill `react-architecture` para novas entidades
- [ ] Imports respeitam o casing exato dos diretórios
- [ ] Variáveis de ambiente frontend usam prefixo `VITE_`
- [ ] Estilo usa classes Tailwind (sem CSS customizado desnecessário)

## Governance

- A Constitution tem precedência sobre todas as outras práticas.
- Alterações requerem documentação, aprovação e plano de migração.
- Todos os PRs/reviews DEVEM verificar compliance com os princípios.
- Complexidade adicional DEVE ser justificada.
- Versionamento segue Semantic Versioning (MAJOR.MINOR.PATCH).

**Version**: 2.0.0 | **Ratified**: 2026-04-08 | **Last Amended**: 2026-04-08
