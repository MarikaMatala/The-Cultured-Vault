# Security Policy

The project welcomes responsible vulnerability reports. Security expectations apply to forks and self-hosted deployments as well as the upstream repository.

## Current application status

The repository contains an initial Next.js frontend scaffold. Its catalogue is read-only and loaded from the public `data/catalog-seed.json` file.

At this stage:

- The frontend does not provide registration, sign-in, personal libraries, ratings, reviews, comments or other persisted member data.
- The application does not connect to a database, authentication provider or metadata API.
- The sample catalogue must contain public editorial metadata only. Do not add personal ratings, private notes, account identifiers, credentials or user data.
- `.env.example` contains public presentation placeholders only. Local `.env.local` files are ignored by Git.
- Every `NEXT_PUBLIC_*` value is exposed to the browser bundle. Never place secrets in these variables.
- The Supabase configuration and migrations are source-controlled foundations only. They have not been connected to the frontend or applied to a hosted production database.

This status is not a security audit or a guarantee that the scaffold is free of vulnerabilities. Do not use it to store real user data until the backend, authentication, authorization and database policies have been implemented and reviewed.

## Reporting a vulnerability

Please do not publish exploitable security details in a public issue.

Use GitHub's private vulnerability reporting feature for this repository if it is enabled. If private reporting is unavailable, contact the repository owner privately through GitHub before disclosing details publicly.

Include:

- A concise description of the issue.
- Steps to reproduce it.
- Potential impact.
- A proof of concept, where safe.
- Any suggested mitigation.

Do not include real passwords, API keys, access tokens or personal data in reports.

## Security baseline before enabling backend features

- Server-side validation for all untrusted input.
- Authentication and authorization checks for every protected action.
- Database row-level security for user-owned records.
- No privileged keys in browser bundles or public repositories.
- Rate limiting for authentication, comments, reviews and reports.
- Safe rendering of user-generated content.
- Dependency and secret scanning.
- Secure handling of uploaded files, if uploads are introduced.
- Auditable moderation actions.
- Tested backup, restore and data-deletion procedures for each independent instance.

## Local verification

Run the checks relevant to the current scaffold from the repository root:

```bash
npm ci
npm run check
npm run build
npm run validate:catalogue
PYTHONPATH=src python -m unittest discover -s tests -v
```

A passing local check does not replace a security review, dependency review, accessibility audit or database policy test.
