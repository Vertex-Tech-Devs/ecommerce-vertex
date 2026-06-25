#!/bin/bash
# Apply Firebase Storage CORS to Vertex buckets.
# Usage: bash apply-storage-cors.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CORS_FILE="${SCRIPT_DIR}/storage.cors.json"

apply_cors() {
  local bucket="$1"
  local project="$2"

  echo "Applying CORS to gs://${bucket} (project: ${project})..."
  if command -v gcloud &>/dev/null; then
    gcloud storage buckets update "gs://${bucket}" --cors-file="${CORS_FILE}" --project="${project}"
    gcloud storage buckets describe "gs://${bucket}" --format="json(cors)" --project="${project}"
  elif command -v gsutil &>/dev/null; then
    gsutil cors set "${CORS_FILE}" "gs://${bucket}"
    gsutil cors get "gs://${bucket}"
  else
    echo "Error: gcloud or gsutil is required."
    exit 1
  fi
}

# ── Platform project buckets ──────────────────────────────────────────
apply_cors "vertex-platform-dev.appspot.com" "vertex-platform-dev" || true
apply_cors "vertex-platform-dev.firebasestorage.app" "vertex-platform-dev" || true

# ── Dev shard (ecommerce-vertex-dev) buckets ──────────────────────────
apply_cors "ecommerce-vertex-dev.appspot.com" "ecommerce-vertex-dev" || true
apply_cors "ecommerce-vertex-dev.firebasestorage.app" "ecommerce-vertex-dev" || true

# ── Production shard (ecommerce-vertex) buckets ───────────────────────
apply_cors "ecommerce-vertex.appspot.com" "ecommerce-vertex" || true
apply_cors "ecommerce-vertex.firebasestorage.app" "ecommerce-vertex" || true

echo "Done."
