# nORMvis website

Bilingual (English/Persian) corporate website for nORMvis, backed by a Django REST API and PostgreSQL.

## Stack

- Frontend: React 18, Vite 5, React Router 6, Framer Motion 11, Lucide React
- Backend: Django 5.2, Django REST Framework
- Database: PostgreSQL 16
- Admin: Django Admin

## Run the frontend

```bash
npm install
cp .env.example .env.local
npm run dev
```

Frontend: `http://localhost:5173`

## Run the backend

See [`backend/README.md`](backend/README.md) for complete setup. Quick start:

```bash
cd backend
cp .env.example .env
# Start PostgreSQL with Docker Desktop running
docker compose up -d db
python -m venv .venv
# Activate the virtual environment, then:
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo_data
python manage.py createsuperuser
python manage.py runserver
```

API: `http://127.0.0.1:8000/api/v1/`
Admin: `http://127.0.0.1:8000/admin/`

## Backend capabilities

- Contact form submissions are validated and stored in PostgreSQL.
- Staff can review and update inquiry statuses in Django Admin.
- Services and project showcase content can be managed from Django Admin.
- Public API exposes active services and published projects, with project category/search filters.
- Project and service records support English and Persian fields.
- The React project and detail pages consume the API and retain static demo fallbacks if the API is offline.

## Deployment

Build the frontend with `npm run build` and deploy `dist/` to a static host. Deploy Django separately behind HTTPS with Gunicorn and a reverse proxy. Follow the production checklist in [`backend/README.md`](backend/README.md); do not use the development secret or database password in production.
