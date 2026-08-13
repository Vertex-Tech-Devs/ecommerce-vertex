#!/usr/bin/env python3
"""
Reconcile composite Firestore indexes on a shard project.

Idempotent: creates any index from firestore.indexes.json (plus the ASC variant
of orders/storeId+orderDate needed by the dashboard metrics) that is missing on
the target project. Run after every deploy so a `--force` firestore deploy can
never leave a shard without its required indexes.

Usage:
  PROJECT_ID=vtx-sd-xxxx python3 scripts/reconcile-indexes.py
"""
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request

PROJECT = os.environ.get("PROJECT_ID", "").strip()
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def get_token() -> str:
    if os.environ.get("CI") == "true" or os.environ.get("GITHUB_ACTIONS") == "true":
        return subprocess.check_output(["gcloud", "auth", "print-access-token"]).decode().strip()
    token_file = "/tmp/ga_token.txt"
    if os.path.exists(token_file):
        return open(token_file).read().strip()
    return subprocess.check_output(["gcloud", "auth", "print-access-token"]).decode().strip()


def call(url: str, method: str = "GET", body: dict | None = None, token: str = "") -> dict:
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read()) if r.status != 204 else {"ok": True}
    except urllib.error.HTTPError as e:
        return {"_err": e.code, "_msg": e.read()[:150].decode(errors="replace")}


def load_specs() -> list[dict]:
    with open(os.path.join(REPO_ROOT, "firestore.indexes.json")) as f:
        specs = json.load(f).get("indexes", [])
    # Variante ASC de orders (storeId + orderDate) — usada por "métricas mensuales".
    specs.append(
        {
            "collectionGroup": "orders",
            "queryScope": "COLLECTION",
            "fields": [
                {"fieldPath": "storeId", "order": "ASCENDING"},
                {"fieldPath": "orderDate", "order": "ASCENDING"},
            ],
        }
    )
    return specs


def main() -> int:
    if not PROJECT:
        print("❌ PROJECT_ID required")
        return 1
    token = get_token()
    base = (
        f"https://firestore.googleapis.com/v1/projects/{PROJECT}"
        f"/databases/(default)/collectionGroups"
    )
    created = 0
    for spec in load_specs():
        cg = spec["collectionGroup"]
        want = [(f["fieldPath"], f["order"]) for f in spec["fields"]]
        existing = call(f"{base}/{cg}/indexes", token=token).get("indexes", [])
        have = {
            tuple((f.get("fieldPath"), f.get("order")) for f in idx.get("fields", []))[:2]
            for idx in existing
        }
        if tuple(want[:2]) in have:
            continue
        res = call(
            f"{base}/{cg}/indexes",
            "POST",
            {"queryScope": spec.get("queryScope", "COLLECTION"), "fields": spec["fields"]},
            token,
        )
        if "_err" in res:
            # 409 = ya existe (puede ser la eliminación previa aún propagándose).
            # Reintenta unos segundos antes de darlo por existente.
            retried = False
            for _ in range(6):
                if res["_err"] != 409:
                    break
                time.sleep(15)
                res = call(
                    f"{base}/{cg}/indexes",
                    "POST",
                    {"queryScope": spec.get("queryScope", "COLLECTION"), "fields": spec["fields"]},
                    token,
                )
                retried = True
            if res["_err"] in (None,):
                created += 1
                print(f"✅ {cg} {want} created (after retry)" if retried else f"✅ {cg} {want} created")
                continue
            if res["_err"] == 409:
                continue  # definitivamente ya existe
            print(f"⚠️ {cg} {want}: HTTP {res['_err']} {res.get('_msg', '')[:80]}")
        else:
            created += 1
            print(f"✅ {cg} {want} created")
    print(f"reconcile done on {PROJECT} (created {created})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
