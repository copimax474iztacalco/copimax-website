# COPIMAX SEO Audit Report - Surgical Diagnosis

**Date:** December 14, 2025
**Analyst:** Antigravity AI

## Executive Summary
This report analyzes the current SEO status of `copimax.store`. The diagnostic reveals a **critical issue of keyword cannibalization**, where multiple low-quality "doorway pages" compete for the same keywords as the main commercial pages, diluting authority and confusing search engines. 

The site is technically fast (static HTML), but the content strategy is actively harmful. The plan involves a **brutal consolidation** of pages: eliminating 5+ duplicate pages via 301 redirects and strengthening the 3 main "Money Pages" (`copias-volumen`, `impresiones-cdmx`, `delivery`) with robust Schema Markup, localized content, and unique value propositions.

## 🔴 Critical Issues Found

1.  **Keyword Cannibalization (High Severity):**
    *   `copias-baratas-cerca-de-mi.html`, `copias-baratas-iztacalco.html`, `fotocopias-economicas-cdmx-precios-2025.html` all target "cheap copies cdmx".
    *   `impresiones-baratas-cdmx.html` competes with `impresiones-cdmx.html` and `impresiones-color-volumen-cdmx.html`.

2.  **Duplicate/Thin Content:**
    *   Pages like `papeleria-cdmx-servicios-centro-confianza.html` contain generic content with no real commercial intent.
    *   `copias-baratas-iztacalco.html` is structured as a blog post but competes with transactional pages.

3.  **Missing Technical SEO Elements:**
    *   **Schema Markup:** largely missing or incomplete on key pages. No `FAQPage` or rigorous `Product` schema.
    *   **Canonical Tags:** Inconsistent or self-referencing on duplicate pages.
    *   **Internal Linking:** Haphazard. No clear "Silo" structure directing authority to Money Pages.

## 📉 Content Pruning Strategy (Pages to Eliminate)

The following pages have been identified for elimination to stop cannibalization. Traffic will be redirected (301) to the most relevant Money Page.

| Dead Page | Action | Target Redirect | Reason |
| :--- | :--- | :--- | :--- |
| `fotocopias-economicas-cdmx-precios-2025.html` | **301 Redirect** | `/servicios.html` | Generic blog content, low value. |
| `papeleria-cdmx-servicios-centro-confianza.html` | **301 Redirect** | `/index.html` | Irrelevant keyword "papeleria core", thin content. |
| `papeleria-estudiantes-iztacalco.html` | **301 Redirect** | `/tesis-guia-2025.html` | Consolidate student intent. |
| `impresiones-baratas-cdmx.html` | **301 Redirect** | `/impresiones-cdmx.html` | Duplicate of main impressions page. |
| `copias-baratas-iztacalco.html` | **301 Redirect** | `/copias-baratas-cerca-de-mi.html` | Consolidate "cheap/local" intent. |

## 📊 Keyword Cannibalization Matrix

| Target Keyword | Conflicting Pages (Current) | Strategic Winner (Future) |
| :--- | :--- | :--- |
| "copias baratas cdmx" | `copias-baratas-cerca-de-mi`, `copias-baratas-iztacalco` | **`copias-baratas-cerca-de-mi.html`** (Repositioned as Delivery) |
| "impresiones baratas cdmx" | `impresiones-baratas-cdmx`, `impresiones-cdmx` | **`impresiones-cdmx.html`** |
| "copias volumen" | `copias-volumen-cdmx`, `copimax-centro-de-copiado...` | **`copias-volumen-cdmx.html`** |

## ✅ Recommendations

### High Priority (Immediate)
1.  **Implement 301 Redirects:** Stop the bleeding immediately via `.htaccess`.
2.  **Update Sitemap:** Remove dead URLs, prioritize Money Pages.
3.  **Optimize `copias-volumen-cdmx.html`:** Add Calculator, FAQ, Schema.

### Medium Priority
1.  **Refocus `copias-baratas-cerca-de-mi`:** Change intent to "Delivery/Urgente" to avoid direct competition with "Volume".
2.  **Schema Implementation:** Add `LocalBusiness` and `Product` schema to all Money Pages.

### Low Priority
1.  **Content Expansion:** Add Case Studies and Video Testimonials.
