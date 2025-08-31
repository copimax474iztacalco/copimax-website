# Video Reels Setup - COPIMAX

## Descrizione
Questa sezione è stata aggiunta alla pagina iniziale tra la hero section e la sezione servizi. Mostra 4 video reels verticali stile TikTok che presentano i servizi di COPIMAX.

## Caratteristiche
- **Desktop**: 4 video fissi affiancati, hover per riprodurre
- **Mobile**: Scroll orizzontale con un video visibile alla volta
- **Formato**: 9:16 (verticale) come i video TikTok
- **Angoli**: Smussati per un look moderno
- **Responsive**: Si adatta automaticamente a tutti i dispositivi

## Configurazione Video

### 1. Sostituire i Video Placeholder
I video attuali sono placeholder. Sostituirli con video reali di COPIMAX:

```html
<!-- Video Reel 1 - Copias Rápidas -->
<video class="reel-video" muted loop>
  <source src="URL_VIDEO_REAL_COPIAS_RAPIDAS.mp4" type="video/mp4">
</video>

<!-- Video Reel 2 - Impresión Color -->
<video class="reel-video" muted loop>
  <source src="URL_VIDEO_REAL_IMPRESION_COLOR.mp4" type="video/mp4">
</video>

<!-- Video Reel 3 - Engargolado -->
<video class="reel-video" muted loop>
  <source src="URL_VIDEO_REAL_ENGARGOLADO.mp4" type="video/mp4">
</video>

<!-- Video Reel 4 - Atención al Cliente -->
<video class="reel-video" muted loop>
  <source src="URL_VIDEO_REAL_ATENCION_CLIENTE.mp4" type="video/mp4">
</video>
```

### 2. Contenuto Consigliato per i Video
- **Reel 1**: Processo di stampa rapida, macchine in azione
- **Reel 2**: Stampa a colori, qualità dei risultati
- **Reel 3**: Processo di rilegatura, finiture professionali
- **Reel 4**: Team al lavoro, attenzione al cliente

### 3. Specifiche Tecniche
- **Risoluzione**: 1080x1920 (9:16) o 720x1280
- **Durata**: 15-30 secondi per video
- **Formato**: MP4 con codec H.264
- **Dimensione**: Ottimizzare per web (max 10MB per video)

## Personalizzazione

### Titoli e Descrizioni
Modificare i testi negli overlay:

```html
<div class="video-title">Titolo Personalizzato</div>
<div class="video-description">Descrizione personalizzata del servizio</div>
```

### Colori e Stili
I colori seguono il tema di COPIMAX. Modificare in CSS se necessario:

```css
.video-overlay {
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%);
}

.play-button {
  color: #fff;
}
```

## Funzionalità JavaScript

### Desktop (hover)
- Hover su una card → video si riproduce, overlay scompare
- Mouse esce → video si ferma, overlay riappare

### Mobile (touch)
- Tap su una card → video si riproduce/pausa
- Scroll orizzontale → cambio video, pausa automatica

### Gestione Automatica
- Solo un video riproduce alla volta
- Pausa automatica durante lo scroll mobile
- Gestione responsive automatica

## Posizionamento
La sezione è inserita in `index.html` alle linee 3377-3430, tra:
- Hero section (linea 3376)
- Sezione servizi (linea 3431)

## Stili CSS
Gli stili sono definiti in `index.html` alle linee 1021-1080, con:
- Layout grid per desktop
- Flexbox con scroll per mobile
- Media queries responsive
- Animazioni hover e transizioni

## Note per lo Sviluppo
- I video sono muti per default (muted)
- Loop automatico per continuità
- Fallback per browser che non supportano video
- Gestione errori per video non caricabili
