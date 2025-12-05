// ==========================================
// COPIMAX HOMEPAGE LOGIC 2025
// Include: Calcolatrice, Navigazione, UI Mobile
// ==========================================

// 1. GLOBAL STATE & CONFIGURATION
window.orderData = {
    quantity: 100,
    type: 'copies',      // 'copies' | 'prints'
    color: 'bw',         // 'bw' | 'color'
    sides: 'double',     // 'single' | 'double'
    colorType: 'text-logo', // 'text-logo' | 'images'
    pdfPages: 1,         // Numero pagine del documento
    upsells: {
        engargolado: { active: false, qty: 0, price: 0 },
        enmicado: { active: false, qty: 0, price: 0 },
        folders: { active: false, qty: 0, price: 0 }
    },
    total: 0
};

// ==========================================
// 2. CORE CALCULATOR LOGIC
// ==========================================
function calculate() {
    // console.log('🔄 Calcolo in corso...');

    // A. Recupera Input Base
    const qInput = document.getElementById('quantity');
    const pInput = document.getElementById('pdf-pages-input');

    const quantity = parseInt(qInput?.value) || 1;
    const pages = parseInt(pInput?.value) || 1;

    // Aggiorna stato globale
    window.orderData.quantity = quantity;
    window.orderData.pdfPages = pages;

    // B. Calcola Impressioni Totali
    // Formula: Copie * Pagine * Lati
    const sidesMult = window.orderData.sides === 'double' ? 2 : 1;
    const totalImpressions = quantity * pages * sidesMult;

    // C. Calcola Prezzo Base Stampa
    let unitPrice = 0;

    if (window.orderData.color === 'bw') {
        // --- BLANCO Y NEGRO ---
        if (totalImpressions < 100) {
            unitPrice = 1.00;
        } else {
            // Volume >= 100
            unitPrice = (window.orderData.sides === 'double') ? 0.35 : 0.40;
        }
    } else {
        // --- COLOR ---
        if (totalImpressions <= 100) {
            // 1-100: $5 (Text) / $10 (Img)
            unitPrice = (window.orderData.colorType === 'images') ? 10.00 : 5.00;
        } else if (totalImpressions <= 300) {
            // 101-300: $4
            unitPrice = 4.00;
        } else {
            // 300+: $3
            unitPrice = 3.00;
        }
    }

    let subtotal = totalImpressions * unitPrice;

    // D. Extra "Impresiones" (Download file)
    if (window.orderData.type === 'prints') {
        subtotal += 5.00;
    }

    // E. Calcola Upsells
    let upsellTotal = 0;

    // 1. Engargolado (Prezzo dinamico per pagine)
    const engCheck = document.getElementById('check-engargolado');
    const engQtyInput = document.getElementById('qty-engargolado');
    if (engCheck && engCheck.checked) {
        const engQty = parseInt(engQtyInput?.value) || 0;
        let engPrice = 15; // Base 1-50
        if (pages > 300) engPrice = 50;
        else if (pages > 200) engPrice = 30;
        else if (pages > 100) engPrice = 25;
        else if (pages > 50) engPrice = 20;

        upsellTotal += engPrice * engQty;

        // Update UI Price Label
        const engPriceLabel = engCheck.closest('.upsell-item')?.querySelector('.upsell-price');
        if (engPriceLabel) engPriceLabel.textContent = `+$${engPrice * engQty}`;

        // Update Order Data
        window.orderData.upsells.engargolado = { active: true, qty: engQty, price: engPrice * engQty, details: `${engQty} engargolados` };
    } else {
        window.orderData.upsells.engargolado = { active: false, qty: 0, price: 0 };
    }

    // 2. Enmicado ($10 fix)
    const enmCheck = document.getElementById('check-enmicado');
    const enmQtyInput = document.getElementById('qty-enmicado');
    if (enmCheck && enmCheck.checked) {
        const enmQty = parseInt(enmQtyInput?.value) || 0;
        const enmPrice = 10.00;
        upsellTotal += enmPrice * enmQty;

        const enmPriceLabel = enmCheck.closest('.upsell-item')?.querySelector('.upsell-price');
        if (enmPriceLabel) enmPriceLabel.textContent = `+$${enmPrice * enmQty}`;

        window.orderData.upsells.enmicado = { active: true, qty: enmQty, price: enmPrice * enmQty, details: `${enmQty} enmicados` };
    } else {
        window.orderData.upsells.enmicado = { active: false, qty: 0, price: 0 };
    }

    // 3. Folder ($15 fix)
    const folCheck = document.getElementById('check-folder');
    const folQtyInput = document.getElementById('qty-folder');
    if (folCheck && folCheck.checked) {
        const folQty = parseInt(folQtyInput?.value) || 0;
        const folPrice = 15.00;
        upsellTotal += folPrice * folQty;

        const folPriceLabel = folCheck.closest('.upsell-item')?.querySelector('.upsell-price');
        if (folPriceLabel) folPriceLabel.textContent = `+$${folPrice * folQty}`;

        window.orderData.upsells.folders = { active: true, qty: folQty, price: folPrice * folQty, details: `${folQty} folders` };
    } else {
        window.orderData.upsells.folders = { active: false, qty: 0, price: 0 };
    }

    // F. Totale Finale
    const finalTotal = subtotal + upsellTotal;
    window.orderData.total = finalTotal;

    // G. Aggiorna UI
    const totalEl = document.getElementById('total-price');
    if (totalEl) animateNumber(totalEl, finalTotal);

    updateOrderSummary();
}

// ==========================================
// 3. UI HELPERS & NAVIGATION
// ==========================================
function animateNumber(element, target) {
    element.textContent = `$${target.toFixed(2)} MXN`;
}

function updateOrderSummary() {
    const summaryService = document.getElementById('summary-service');
    const summaryTotal = document.getElementById('summary-total');
    const summaryDetails = document.getElementById('summary-details');

    if (summaryService) {
        const typeStr = window.orderData.type === 'copies' ? 'Copias' : 'Impresiones';
        const colorStr = window.orderData.color === 'bw' ? 'B/N' : 'Color';
        summaryService.textContent = `${typeStr} ${colorStr}`;
    }

    if (summaryTotal) {
        summaryTotal.textContent = `$${window.orderData.total.toFixed(2)} MXN`;
    }

    if (summaryDetails) {
        const sidesStr = window.orderData.sides === 'double' ? 'Doble cara' : 'Una cara';
        let upsellStr = '';
        if (window.orderData.upsells.engargolado.active) upsellStr += ' + Engargolado';
        if (window.orderData.upsells.enmicado.active) upsellStr += ' + Enmicado';
        if (window.orderData.upsells.folders.active) upsellStr += ' + Folder';

        summaryDetails.textContent = `${sidesStr}${upsellStr}`;
    }
}

// Navigation Function
window.showOrderPage = function (shouldPush = true) {
    const homepage = document.getElementById('homepage');
    const homepageContent = document.getElementById('homepage-content');
    const orderPage = document.getElementById('orderpage'); // ID corretto verificato

    if (homepage) homepage.style.display = 'none';
    if (homepageContent) homepageContent.style.display = 'none';
    if (orderPage) orderPage.classList.add('active');

    updateOrderSummary();
    window.scrollTo(0, 0);

    if (shouldPush && window.history && window.history.pushState) {
        window.history.pushState({ page: 'order' }, '', window.location.origin + '/#order');
    }
};

// Mobile Menu Functions
window.toggleMobileMenu = function () {
    const menu = document.getElementById('mobileSlideMenu');
    if (menu) menu.classList.toggle('open');
};

window.closeMobileSlideMenu = function () {
    const menu = document.getElementById('mobileSlideMenu');
    if (menu) menu.classList.remove('open');
};

// Video Reels
function initializeVideoReels() {
    const videoCards = document.querySelectorAll('.video-reel-card');
    if (videoCards.length === 0) return;

    // Mobile horizontal scroll enhancement
    if (window.innerWidth <= 768) {
        const reelsGrid = document.querySelector('.reels-grid');
        if (reelsGrid) {
            let isScrolling = false;
            reelsGrid.addEventListener('scroll', () => {
                if (!isScrolling) {
                    isScrolling = true;
                    setTimeout(() => { isScrolling = false; }, 150);
                }
            });
        }
    }
}

// ==========================================
// 4. INITIALIZATION & EVENTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inizializzazione JS Completo (External)...');

    // 1. Option Buttons (Type, Color, Sides)
    document.querySelectorAll('.calc-option').forEach(opt => {
        opt.addEventListener('click', () => {
            // Gestione UI Active State
            const group = opt.dataset.type ? 'type' : (opt.dataset.color ? 'color' : 'sides');
            document.querySelectorAll(`.calc-option[data-${group}]`).forEach(el => el.classList.remove('active'));
            opt.classList.add('active');

            // Aggiorna Dati
            if (group === 'type') window.orderData.type = opt.dataset.type;
            if (group === 'sides') window.orderData.sides = opt.dataset.sides;
            if (group === 'color') {
                window.orderData.color = opt.dataset.color;
                // Toggle Color Details
                const details = document.getElementById('color-details');
                if (details) details.style.display = (opt.dataset.color === 'color') ? 'block' : 'none';
            }

            calculate();
        });
    });

    // 2. Color Details (Text vs Images)
    document.querySelectorAll('.color-type-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.color-type-option').forEach(el => el.classList.remove('active'));
            opt.classList.add('active');
            window.orderData.colorType = opt.dataset.colorType;
            calculate();
        });
    });

    // 3. Numeric Inputs (Quantity, Pages)
    ['quantity', 'pdf-pages-input'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculate);
            el.addEventListener('change', calculate);
        }
    });

    // 4. Upsells (Checkbox & Quantity)
    const upsellConfig = [
        { check: 'check-engargolado', qty: 'qty-engargolado', inputs: 'inputs-engargolado' },
        { check: 'check-enmicado', qty: 'qty-enmicado', inputs: 'inputs-enmicado' },
        { check: 'check-folder', qty: 'qty-folder', inputs: 'inputs-folder' }
    ];

    upsellConfig.forEach(u => {
        const check = document.getElementById(u.check);
        const qty = document.getElementById(u.qty);
        const inputs = document.getElementById(u.inputs);

        if (check) {
            check.addEventListener('change', () => {
                if (inputs) inputs.style.display = check.checked ? 'block' : 'none';
                calculate();
            });
        }
        if (qty) {
            qty.addEventListener('input', calculate);
        }
    });

    // 5. Order Button
    const btnOrder = document.getElementById('btn-order');
    if (btnOrder) {
        btnOrder.addEventListener('click', () => {
            if (typeof showOrderPage === 'function') showOrderPage(true);
        });
    }

    // 6. Deal CTAs
    document.querySelectorAll('.deal-cta').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const dealInfo = btn.dataset.deal;
            const msg = `Hola COPIMAX 👋 Me interesa el paquete: ${dealInfo}. ¿Puedo enviar el archivo por aquí?`;
            window.open('https://wa.me/525540219892?text=' + encodeURIComponent(msg), '_blank');
        });
    });

    // 7. Video Reels
    initializeVideoReels();
    window.addEventListener('resize', () => setTimeout(initializeVideoReels, 100));

    // 8. Popstate (Back button)
    window.addEventListener('popstate', function (event) {
        if (event.state && event.state.page === 'order') {
            showOrderPage(false);
        } else {
            // Show Homepage
            const homepage = document.getElementById('homepage');
            const homepageContent = document.getElementById('homepage-content');
            const orderPage = document.getElementById('orderpage');

            if (homepage) homepage.style.display = 'block';
            if (homepageContent) homepageContent.style.display = 'block';
            if (orderPage) orderPage.classList.remove('active');
        }
    });

    // Avvio Iniziale
    calculate();
});
