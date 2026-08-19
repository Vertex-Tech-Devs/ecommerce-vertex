#!/bin/bash
# Apply Firebase Storage CORS to Vertex buckets.
# Usage:
#   bash apply-storage-cors.sh                      # Applies CORS to default buckets
#   bash apply-storage-cors.sh <bucket-name>        # Applies CORS to a specific bucket (project ID auto-extracted)
#   bash apply-storage-cors.sh <bucket-name> <project-id> # Applies CORS with explicit project ID

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CORS_FILE="${SCRIPT_DIR}/../storage.cors.json"
if [ ! -f "${CORS_FILE}" ]; then
  CORS_FILE="${SCRIPT_DIR}/storage.cors.json"
fi

apply_cors() {
  local bucket="$1"
  local project="${2:-}"

  if [ -z "${project}" ]; then
    project="${bucket%%.*}"
  fi

  echo "Applying CORS to gs://${bucket} (project: ${project})..."
  if command -v gsutil &>/dev/null; then
    gsutil cors set "${CORS_FILE}" "gs://${bucket}"
    gsutil cors get "gs://${bucket}"
  elif command -v gcloud &>/dev/null; then
    gcloud storage buckets update "gs://${bucket}" --cors-file="${CORS_FILE}" --project="${project}"
    gcloud storage buckets describe "gs://${bucket}" --format="json(cors)" --project="${project}"
  else
    echo "Error: gcloud or gsutil is required."
    exit 1
  fi
}

if [ -n "${1:-}" ]; then
  apply_cors "$1" "${2:-}"
else
  # ── Platform project buckets ──────────────────────────────────────────
  apply_cors "vertex-platform-dev.appspot.com" "vertex-platform-dev" || true
  apply_cors "vertex-platform-dev.firebasestorage.app" "vertex-platform-dev" || true

  # ── Dev shard (ecommerce-vertex-dev) buckets ──────────────────────────
  apply_cors "ecommerce-vertex-dev.appspot.com" "ecommerce-vertex-dev" || true
  apply_cors "ecommerce-vertex-dev.firebasestorage.app" "ecommerce-vertex-dev" || true

  # ── Production shard (ecommerce-vertex) buckets ───────────────────────
  apply_cors "ecommerce-vertex.appspot.com" "ecommerce-vertex" || true
  apply_cors "ecommerce-vertex.firebasestorage.app" "ecommerce-vertex" || true

  # ── Dynamic shard (vtx-sd-*) buckets ─────────────────────────────────
  if command -v gcloud &>/dev/null; then
    for proj in $(gcloud projects list --filter="projectId:vtx-sd-*" --format="value(projectId)" 2>/dev/null); do
      for b in $(gcloud storage buckets list --project="${proj}" --format="value(name)" 2>/dev/null); do
        apply_cors "${b}" "${proj}" || true
      done
    done
  fi
fi

echo "Done."
