// Main JavaScript per COPIMAX
// Funzioni comuni e utilità del sito

console.log('Main JavaScript per COPIMAX caricato');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM principale caricato');
    
    // Funzione per aprire WhatsApp con messaggio predefinito
    window.openWhatsApp = function(message) {
        const phone = '5540219892';
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phone}?text=${encodedMessage}`;
        window.open(url, '_blank');
    };
    
    // Funzione per formattare numeri in pesos messicani
    window.formatMXN = function(amount) {
        return amount.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits: 2
        });
    };
    
    // Funzione per scroll smooth
    window.smoothScroll = function(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Inizializza tooltips e altri elementi UI
    function initUI() {
        // Aggiungi classi per animazioni
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.add('animate-on-scroll');
        });
        
        console.log('UI inizializzata');
    }
    
    // Inizializza tutto
    initUI();
    
    console.log('Main JavaScript inizializzato con successo');
});
