#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Operación "First-Mover 2027" — Copimax CDMX (copimax.store)
-----------------------------------------------------------
Ejecutar entre el 15 y el 20 de diciembre de 2026 para capturar todas las búsquedas
"precios copias 2027", "cuánto cuesta imprimir en 2027" y actualizar el conteo real
de reseñas de Google Maps en todo el sitio (JSON-LD + visual + llms.txt + sitemap.xml).

Uso seguro (vista previa sin modificar archivos):
    python3 scripts/rollover_2027.py --dry-run --reviews 385

Aplicar cambios en producción:
    python3 scripts/rollover_2027.py --apply --reviews 385
"""

import argparse
import datetime
import json
import os
import re
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Expresiones editoriales/comerciales donde "2026" representa el año vigente de tarifas/guías
SAFE_PATTERNS = [
    (r"\bPrecios Reales 2026\b", "Precios Reales 2027"),
    (r"\bPrecios 2026\b", "Precios 2027"),
    (r"\bprecios 2026\b", "precios 2027"),
    (r"\bGuía 2026\b", "Guía 2027"),
    (r"\bguía 2026\b", "guía 2027"),
    (r"\bGuía Fiscal CFDI 2026\b", "Guía Fiscal CFDI 2027"),
    (r"\bTarifas 2026\b", "Tarifas 2027"),
    (r"\btarifas 2026\b", "tarifas 2027"),
    (r"\bvigente(?:s)? (?:octubre |noviembre |diciembre )?2026\b", "vigentes 2027"),
    (r"\ben México 2026\b", "en México 2027"),
    (r"\ben CDMX 2026\b", "en CDMX 2027"),
    (r"\ben 2026\b", "en 2027"),
    (r"© 2026 COPIMAX", "© 2027 COPIMAX"),
    (r"&copy; 2026 COPIMAX", "&copy; 2027 COPIMAX"),
    (r"\(octubre 2026\)", "(enero 2027)"),
    (r"octubre 2026\)", "enero 2027)"),
]


def update_text_year_and_reviews(content: str, new_reviews: int, old_reviews: int = 341) -> str:
    out = content
    for pat, repl in SAFE_PATTERNS:
        out = re.sub(pat, repl, out)

    if new_reviews and new_reviews != old_reviews:
        # JSON-LD reviewCount / ratingCount
        out = re.sub(
            rf'("reviewCount"\s*:\s*")({old_reviews})(")',
            rf"\g<1>{new_reviews}\g<3>",
            out,
        )
        out = re.sub(
            rf'("reviewCount"\s*:\s*)({old_reviews})\b',
            rf"\g<1>{new_reviews}",
            out,
        )
        # Visual badges (e.g., "341 reseñas", "341 ⭐", "+341 reseñas")
        out = re.sub(rf"\b{old_reviews}(\s+reseñas)", rf"{new_reviews}\1", out)
        out = re.sub(rf"\b{old_reviews}(\s*⭐)", rf"{new_reviews}\1", out)

    return out


def main():
    parser = argparse.ArgumentParser(description="Rollover SEO First-Mover 2027 para copimax.store")
    parser.add_argument("--apply", action="store_true", help="Aplica los cambios en disco (por defecto es dry-run)")
    parser.add_argument("--dry-run", action="store_true", help="Simula los cambios sin modificar ningún archivo")
    parser.add_argument("--reviews", type=int, default=341, help="Nuevo total de reseñas verificadas en Google Maps")
    parser.add_argument("--old-reviews", type=int, default=341, help="Total actual de reseñas en el sitio (default: 341)")
    args = parser.parse_args()

    apply_mode = args.apply and not args.dry_run
    today_iso = datetime.date.today().isoformat()

    html_files = []
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if not d.startswith(".") and d not in ("node_modules", "scripts", "copimax-seo-optimization")]
        for f in sorted(fn):
            if f.endswith(".html"):
                html_files.append(os.path.join(dp, f))

    changed_files = 0
    title_warnings = []
    desc_warnings = []

    for hp in html_files:
        with open(hp, "r", encoding="utf-8") as f:
            orig = f.read()
        updated = update_text_year_and_reviews(orig, args.reviews, args.old_reviews)

        if updated != orig:
            changed_files += 1
            # Validate JSON-LD blocks remain 100% valid
            for m in re.finditer(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', updated, re.S | re.I):
                json.loads(m.group(1).strip())

            tm = re.search(r"<title>(.*?)</title>", updated, re.S | re.I)
            if tm and len(tm.group(1).strip()) > 60:
                title_warnings.append((os.path.relpath(hp, ROOT), len(tm.group(1).strip())))

            dm = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', updated, re.S | re.I)
            if dm and len(dm.group(1).strip()) > 155:
                desc_warnings.append((os.path.relpath(hp, ROOT), len(dm.group(1).strip())))

            if apply_mode:
                with open(hp, "w", encoding="utf-8") as f:
                    f.write(updated)

    # llms.txt
    llms_path = os.path.join(ROOT, "llms.txt")
    llms_changed = False
    if os.path.exists(llms_path):
        orig_llms = open(llms_path, encoding="utf-8").read()
        upd_llms = update_text_year_and_reviews(orig_llms, args.reviews, args.old_reviews)
        if upd_llms != orig_llms:
            llms_changed = True
            if apply_mode:
                open(llms_path, "w", encoding="utf-8").write(upd_llms)

    # sitemap.xml lastmod rollover when applied
    sm_path = os.path.join(ROOT, "sitemap.xml")
    if apply_mode and os.path.exists(sm_path):
        sm_txt = open(sm_path, encoding="utf-8").read()
        sm_txt = re.sub(r"<lastmod>2026-\d{2}-\d{2}</lastmod>", f"<lastmod>{today_iso}</lastmod>", sm_txt)
        open(sm_path, "w", encoding="utf-8").write(sm_txt)
        ET.parse(sm_path)

    mode_str = "APLICADO EN DISCO" if apply_mode else "SIMULACIÓN DRY-RUN (0 archivos tocados)"
    print(f"[{mode_str}] Archivos HTML que se actualizan a 2027 / {args.reviews} reseñas: {changed_files}/{len(html_files)}")
    print(f"[{mode_str}] llms.txt actualizado: {'Sí' if llms_changed else 'Sin cambios'}")
    if title_warnings:
        print(f"  ! Avisos Title > 60 chars: {title_warnings}")
    if desc_warnings:
        print(f"  ! Avisos Desc > 155 chars: {desc_warnings}")


if __name__ == "__main__":
    main()
