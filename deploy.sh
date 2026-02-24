#!/usr/bin/env bash
set -e

echo "[INFO] Starting deployment..."

# Go to repo root (where compose file is)
cd "$(dirname "$0")"

# Check Docker
if ! command -v docker >/dev/null 2>&1; then
  echo "[ERROR] Docker is not installed."
  exit 1
fi

# Check Docker Compose
if ! docker compose version >/dev/null 2>&1; then
  echo "[ERROR] Docker Compose is not available. Use Docker Desktop or install docker compose."
  exit 1
fi

echo "[INFO] Stopping existing containers (including volumes)..."
docker compose down -v

echo "[INFO] Building and starting containers..."
docker compose up -d --build

echo "[INFO] Waiting for services to become healthy..."
for i in {1..45}; do
  # If /health responds, we consider deploy successful
  if curl -fsS http://localhost/health >/dev/null 2>&1; then
    echo "[SUCCESS] Application is live at http://localhost"
    docker compose ps
    exit 0
  fi
  sleep 2
done

echo "[ERROR] Application did not become healthy in time."
docker compose ps
docker compose logs --tail=200 api || true
exit 1