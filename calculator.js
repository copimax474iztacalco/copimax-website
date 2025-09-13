// Calcolatrice per COPIMAX
// Gestisce il calcolo dei prezzi per copias por volumen

document.addEventListener('DOMContentLoaded', function() {
    console.log('Calcolatrice JavaScript caricata');
    
    const qtyEl = document.getElementById('q');
    const pagesEl = document.getElementById('pages');
    const sidesEl = document.getElementById('sides');
    
    if (!qtyEl || !sidesEl) {
        console.log('Elementi calcolatrice non trovati, potrebbe non essere questa pagina');
        return;
    }
    
    // Formatta il prezzo in pesos messicani
    const fmt = (n) => n.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 2
    });
    
    // Ricalcola il totale
    function recalc() {
        const q = Math.max(0, parseInt(qtyEl.value || '0'));
        const pages = Math.max(1, parseInt((pagesEl && pagesEl.value) ? pagesEl.value : '1'));
        const sides = sidesEl.value;
        const colorBtn = document.querySelector('.color-btn.active');
        const typeBtn = document.querySelector('.type-btn.active');
        const totalEl = document.getElementById('total-preview');
        
        let pricePerPage = 0.40; // Default BN una cara
        
        if (sides === 'x2') {
            pricePerPage = 0.35; // BN doble cara
        }
        
        // Se è a color, aggiorna il prezzo
        if (colorBtn && colorBtn.dataset.color === 'color') {
            if (sides === 'x2') {
                pricePerPage = 4.35; // Color doble cara
            } else {
                pricePerPage = 5.00; // Color una cara
            }
        }
        
        // Applica moltiplicatore per doble cara: 2 impressioni per foglio
        const sidesMultiplier = sides === 'x2' ? 2 : 1;
        const total = q * pages * sidesMultiplier * pricePerPage;
        
        // Aggiorna anteprima totale se presente nella pagina corrente
        if (totalEl) {
            totalEl.textContent = fmt(total);
        }
        
        // Aggiorna anche il campo tipo automaticamente
        updateTipoField();
    }
    
    // Rendi la funzione recalc globale
    window.recalcCalculator = recalc;
    
    // Aggiorna il campo tipo automaticamente
    function updateTipoField() {
        const tipoInput = document.getElementById('t');
        if (tipoInput) {
            const colorBtn = document.querySelector('.color-btn.active');
            const typeBtn = document.querySelector('.type-btn.active');
            const sides = sidesEl.value;
            
            const color = colorBtn ? colorBtn.dataset.color : 'bn';
            const type = typeBtn ? typeBtn.dataset.type : 'copia';
            
            tipoInput.value = `${color.toUpperCase()} ${sides === 'x2' ? 'doble cara' : 'una cara'}`;
        }
    }
    
    // Event listeners
    qtyEl.addEventListener('input', recalc);
    sidesEl.addEventListener('change', recalc);
    
    // Calcolo iniziale
    recalc();
    
    console.log('Calcolatrice inizializzata con successo');
});

// Funzioni globali per i bottoni
window.changeType = function(btn, type) {
    // Rimuovi classe active da tutti i bottoni tipo
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    // Aggiungi classe active al bottone cliccato
    btn.classList.add('active');
    
    // Ricalcola il totale
    if (window.recalcCalculator) {
        window.recalcCalculator();
    }
    
    console.log('Tipo cambiato a:', type);
};

window.changeColor = function(btn, color) {
    // Rimuovi classe active da tutti i bottoni colore
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    // Aggiungi classe active al bottone cliccato
    btn.classList.add('active');
    
    // Ricalcola il totale
    if (window.recalcCalculator) {
        window.recalcCalculator();
    }
    
    console.log('Colore cambiato a:', color);
};
