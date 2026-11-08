#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Optimizador de Fotos Reales de Mostrador a WebP SEO — Copimax CDMX
------------------------------------------------------------------
Convierte fotos tomadas en Vainilla 474 (.jpg, .jpeg, .png, .heic) a versiones
ligeras .webp (1280px y 640px) listas para Google Immagini + AI Overview.

Uso:
    1. Coloca tus fotos nuevas con nombre descriptivo SEO (ej. engargolado-wire-o-vs-plastico-cdmx.jpg)
       dentro de: FOTO Y LOGO/nuevas/
    2. Ejecuta:
       python3 scripts/optimizar_fotos_mostrador.py
"""

import os
import shutil
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IN_DIR = os.path.join(ROOT, "FOTO Y LOGO", "nuevas")
OUT_DIR = os.path.join(ROOT, "assets", "mostrador")


def main():
    os.makedirs(IN_DIR, exist_ok=True)
    os.makedirs(OUT_DIR, exist_ok=True)

    cwebp = shutil.which("cwebp")
    sips = shutil.which("sips")
    if not cwebp and not sips:
        print("[ERROR] Se requiere sips (incluido en macOS) o cwebp.")
        return

    files = [
        f for f in sorted(os.listdir(IN_DIR))
        if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".heic"))
    ]
    if not files:
        print(f"[INFO] Carpeta lista en: {IN_DIR}")
        print("Coloca ahí tus 8-12 fotos reales del mostrador (Vainilla 474) y vuelve a correr este comando.")
        return

    for fn in files:
        slug = os.path.splitext(fn)[0].lower().replace(" ", "-")
        src = os.path.join(IN_DIR, fn)
        ext = "webp" if cwebp else "jpg"
        for width in (1280, 640):
            dst = os.path.join(OUT_DIR, f"{slug}-{width}.{ext}")
            if cwebp:
                subprocess.run([cwebp, "-q", "78", "-resize", str(width), "0", src, "-o", dst], check=True)
            else:
                subprocess.run(
                    [sips, "-s", "format", "jpeg", "-s", "formatOptions", "78", "-Z", str(width), src, "--out", dst],
                    check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                )
        size_kb = os.path.getsize(os.path.join(OUT_DIR, f"{slug}-1280.{ext}")) // 1024
        print(f"[OK] {slug}-1280.{ext} ({size_kb} KB) y {slug}-640.{ext} generados en assets/mostrador/")


if __name__ == "__main__":
    main()
