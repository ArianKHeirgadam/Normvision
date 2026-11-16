# nORMvis Django API

Django REST Framework backend for the React/Vite nORMvis website. PostgreSQL is the primary database. The backend stores editable services, bilingual project content, and contact inquiries.

## Features

- Public read-only API for active services and published projects.
- Project filtering by category, featured flag, and search.
- Bilingual content fields (`*_fa`) so the frontend can switch EN/PER without duplicating records.
- Contact inquiry endpoint with validation, basic anonymous throttling, and a honeypot anti-spam field.
- Django Admin for managing projects/services and reviewing, assigning statuses to, and adding internal notes to inquiries.
- PostgreSQL via Docker Compose.

## Requirements

- Python 3.11+
- Docker Desktop (or a local PostgreSQL 14+ instance)
- Node.js 18+ for the React frontend

## 1. Start PostgreSQL

From this `backend` directory:

```bash
cp .env.example .env
# Change DB_PASSWORD before using this outside local development.
docker compose up -d db
```

## 2. Install and configure Django

```bash
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
# source .venv/bin/activate
pip install -r requirements.txt
```

Django loads the values from `backend/.env` automatically. You can override them with environment variables from your shell when needed.



Then:

```bash
python manage.py migrate
python manage.py seed_demo_data
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

Admin: `http://127.0.0.1:8000/admin/`

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/health/` | Health check |
| GET | `/api/v1/services/` | Active services |
| GET | `/api/v1/projects/` | Published projects |
| GET | `/api/v1/projects/?category=web` | Filter projects by category |
| GET | `/api/v1/projects/?featured=true` | Featured projects |
| GET | `/api/v1/projects/?search=dashboard` | Search project content |
| GET | `/api/v1/projects/<slug>/` | Project details |
| POST | `/api/v1/contact/` | Submit contact inquiry |

Example contact payload:

```json
{
  "name": "Alex Smith",
  "email": "alex@example.com",
  "company": "Example Ltd",
  "service": "web",
  "message": "We need a customer portal for our business.",
  "source_language": "en",
  "website": ""
}
```

A successful inquiry returns HTTP `201`. The message is saved in PostgreSQL and appears in Django Admin. The website field is a hidden honeypot; leave it empty.

## Frontend connection

In the project root, copy `.env.example` to `.env.local` and set:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

Start the frontend separately:

```bash
npm install
npm run dev
```

Projects and project detail pages read from the API, and gracefully fall back to the bundled demo data if the API is temporarily unavailable. The contact form submits to Django.

## Production checklist

- Set a long, unique `DJANGO_SECRET_KEY` and `DJANGO_DEBUG=False`.
- Set exact `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and `CSRF_TRUSTED_ORIGINS` values for your deployed domains.
- Use a strong database password and a managed/private PostgreSQL service; do not expose port 5432 publicly.
- Serve Django behind HTTPS using Gunicorn and a reverse proxy; configure secure cookies, proxy SSL headers, backups, monitoring, and log retention.
- Configure email delivery before adding inquiry acknowledgement emails. The current API stores inquiries and exposes them to authorized staff in Admin; it does not pretend an email has been sent.
- Create a dedicated admin user; never expose Django Admin credentials in the frontend.
