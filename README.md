# Secure-CRUD

A Dockerized CRUD API with MongoDB behind Nginx reverse proxy.

## Architecture
- Nginx (proxy) exposed on port 80
- Node/Express API (internal)
- MongoDB (internal + persistent volume)

## Run locally (Docker Compose)
```bash
docker compose up -d --build