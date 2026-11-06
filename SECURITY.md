# Security Policy

The application is not yet implemented, but security requirements are part of the project from the beginning.

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

## Planned security baseline

- Server-side validation for all untrusted input.
- Authentication and authorization checks for every protected action.
- Database row-level security for user-owned records.
- No privileged keys in browser bundles or public repositories.
- Rate limiting for authentication, comments, reviews and reports.
- Safe rendering of user-generated content.
- Dependency and secret scanning.
- Secure handling of uploaded files, if uploads are introduced.
- Auditable moderation actions.
