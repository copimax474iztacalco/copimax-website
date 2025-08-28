// Calcolatrice per COPIMAX
// Gestisce il calcolo dei prezzi per copias por volumen

document.addEventListener('DOMContentLoaded', function() {
    console.log('Calcolatrice JavaScript caricata');
    
    const qtyEl = document.getElementById('q');
    const sidesEl = document.getElementById('sides');
    const totalEl = document.getElementById('total-preview');
    
    if (!qtyEl || !sidesEl || !totalEl) {
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
        const pricePerPage = sidesEl.value === 'x2' ? 0.35 : 0.40;
        const total = q * pricePerPage;
        totalEl.textContent = fmt(total);
    }
    
    // Event listeners
    qtyEl.addEventListener('input', recalc);
    sidesEl.addEventListener('change', recalc);
    
    // Calcolo iniziale
    recalc();
    
    console.log('Calcolatrice inizializzata con successo');
});
