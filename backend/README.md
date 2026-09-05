
# Assessment Platform API

Express.js + TypeScript + PostgreSQL + Prisma 7.

## Architecture

The API is organized around business modules rather than technical layers alone:

- `auth` — authentication orchestration and provider-independent session handling
- `companies` — tenant/company management
- `jobs` — recruitment jobs
- `assessments` — assessment lifecycle
- `questions` — question bank
- `candidates` — candidate identity/profile
- `applications` — company-scoped candidate relationship
- `invitations` — candidate invitation flow
- `attempts` — assessment execution
- `submissions` — immutable final submissions
- `evaluations` — automatic/manual grading
- `results` — assessment outcomes
- `audit` — security and business audit trail

## Authentication design

Passport is intentionally NOT used.

The application separates:

1. Authentication provider — Google, email/password, magic link, Auth0, Clerk, Firebase, etc.
2. Token/session verification — JWT/cookie/session verification.
3. Application identity — `User` or `Candidate`.
4. Authorization — company membership + role + resource ownership.

`AuthProvider` is an interface. A provider can be replaced without changing controllers or business services.

Redis should be used for ephemeral concerns such as:

- refresh-token/session revocation
- invitation rate limits
- login rate limits
- idempotency keys
- short-lived candidate session state
- queues / distributed locks

PostgreSQL remains the source of truth.

## Candidate invitation flow

Company creates invitation -> raw token is emailed -> server stores only token hash -> candidate opens link -> token is verified -> candidate identity/session is established -> application/assessment access is checked.

Do not use the invitation token itself as a permanent login credential.

## Start

```bash
cp .env.example .env
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm dev
```
