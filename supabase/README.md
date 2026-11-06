# Supabase backend

This directory contains the local Supabase configuration and versioned database migrations for The Cultured Vault.

## Local workflow

From the repository root:

```bash
supabase start
supabase db reset
supabase status
```

Docker and the Supabase CLI are required. The reset command recreates the local database and applies all migrations from scratch; use it only with disposable local development data.

Before using a hosted project, review every migration and run the security checklist in tests/SECURITY_TEST_CHECKLIST.md.

Do not commit .env files, database passwords, access tokens, or Supabase service-role keys. The service-role key bypasses row-level security and must never be shipped to browser code.

## Migration order

1. 20261106000000_initial_schema.sql — initial relational model and RLS.
2. 20261106001000_moderation_policy_guard.sql — pending-only member edits.
3. 20261106002000_auth_profiles_and_comment_visibility.sql — Auth profile bootstrap and comment target/visibility protections.
