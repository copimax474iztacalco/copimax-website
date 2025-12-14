# COPIMAX SEO Implementation Checklist - 90 Days to 40k Visits

This document outlines the step-by-step execution plan for deploying the SEO strategy.

## Phase 1: The "Clean Up" (Day 1-2)
**Goal:** Stop cannibalization and tell Google about our new structure.

- [ ] **Backup:** Download a full backup of your current site (`public_html` or equivalent).
- [ ] **Upload .htaccess:** Upload the provided `.htaccess` file to your root directory.
    - *Verification:* Visit `copimax.store/fotocopias-economicas-cdmx-precios-2025.html` and ensure it automatically redirects to `servicios.html`.
- [ ] **Upload robots.txt:** Upload to root.
- [ ] **Upload sitemap.xml:** Upload to root.
- [ ] **Google Search Console:**
    - Log in to GSC.
    - Submit the new sitemap URL (`https://copimax.store/sitemap.xml`).
    - Use the "Removals" tool to temporarily hide the "Dead Pages" if they are still appearing in snippets (optional but recommended).

## Phase 2: Deploy Optimized Money Pages (Day 3-5)
**Goal:** Launch the high-converting pages.

- [ ] **Upload CSS:** Upload `seo-optimizations.css` to your css folder (create one if it doesn't exist, e.g., `/assets/css/` or just `/css/`).
- [ ] **Deploy Page 1 (Volume):**
    - Rename your OLD `copias-volumen-cdmx.html` to `copias-volumen-cdmx.BAK`.
    - Upload the new `copias-volumen-cdmx-OPTIMIZED.html` and rename it to `copias-volumen-cdmx.html`.
- [ ] **Deploy Page 2 (Color):**
    - Backup and replace `impresiones-cdmx.html` with the optimized version.
- [ ] **Deploy Page 3 (Delivery):**
    - Backup and replace `copias-baratas-cerca-de-mi.html` with the optimized version.
- [ ] **Deploy Page 4 (Engargolados):**
    - Upload `engargolados-volumen-cdmx-OPTIMIZED.html` and rename it to `engargolados-volumen-cdmx.html`.
    - *Note:* This is a new dedicated page for binding services with its own calculator.
- [ ] **Verify:** Check that all styles load correctly and the calculators work.

## Phase 3: Monitoring & Iterate (Week 2 onwards)
**Goal:** Track growth.

- [ ] **Google Analytics:** Ensure GA4 is firing on all new pages.
- [ ] **Keyword Tracking:** Use the provided CSV to log your rankings every Monday.
- [ ] **Content Marketing:**
    - Share the new "Delivery Page" on your Facebook/Instagram.
    - Ask your top 5 clients to leave a review mentioning "Volume" or "Color" specifically to boost local relevance.

## 🚨 CRITICAL RULES REMINDER
1.  **NEVER DELETE** the old homepage or `copimax-centro-de-copiado-cdmx-por-mayoreo` page.
2.  **NEVER CHANGE URLs** of the Money Pages once deployed.
3.  **IMAGES:** Ensure you upload the placeholder images or replace the `src` in the HTML with your own real photos (highly recommended).
