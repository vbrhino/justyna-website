# Be Beauty - Schoonheidssalon Website

Een moderne, meertalige website voor Be Beauty schoonheidssalon met dynamische prijslijst.

## Features

- 🌐 **Meertalig** - Ondersteuning voor Nederlands, Engels en Pools
- 📱 **Responsive Design** - Werkt perfect op alle apparaten (mobiel, tablet, desktop)
- 💰 **Dynamische Prijslijst** - Prijzen worden geladen vanuit CSV bestanden
- 📥 **Downloadbare Prijslijst** - Klanten kunnen de prijslijst downloaden als PDF
- 📅 **Afsprakenkalender** - Toon beschikbare afspraken voor de komende 30 dagen (CSV-beheerd)
- 🔐 **Admin UI** - Gebruiksvriendelijke interface om afspraken te beheren via GitHub Actions
- 🎨 **Modern CSS** - Gebruikt CSS Grid, Flexbox en CSS Variabelen
- 🚀 **Snel & Lichtgewicht** - Geen frameworks of dependencies
- ♿ **Toegankelijk** - Semantische HTML5 markup
- 🎯 **Makkelijk aan te passen** - Overzichtelijke code structuur

## Diensten

Be Beauty biedt professionele schoonheidsbehandelingen:

- **Permanent Make-up** - Wenkbrauwen, Eyeliner, Lippen
- **Wimperextensions** - Classic, Volume, Mega Volume
- **Wenkbrauwen & Wimpers** - Verven, Epileren, Liften, Lamineren
- **Nagels** - Manicure, Gellak, Acryl/Gel Nagels
- **Kobido Massage** - Japanse Gezichtsmassage

## Project Structuur

```
justyna-website/
├── index.html                        # Homepagina
├── about.html                        # Over Ons pagina
├── prijzen.html                      # Prijslijst pagina
├── contact.html                      # Contact pagina met formulier en afsprakenkalender
├── afspraken.html                    # Afspraken kalender pagina
├── admin.html                        # Admin UI voor afspraken beheer
├── styles.css                        # Hoofd stylesheet
├── admin-styles.css                  # Admin UI stylesheet
├── translations.js                   # Meertalige vertalingen
├── prijslijst.js                     # Prijslijst functionaliteit
├── calendar.js                       # Afsprakenkalender functionaliteit
├── admin.js                          # Admin UI functionaliteit
├── prijslijst-nl.csv                 # Nederlandse prijzen
├── prijslijst-en.csv                 # Engelse prijzen
├── prijslijst-pl.csv                 # Poolse prijzen
├── afspraken.csv                     # Beschikbare afspraken (kalender)
├── .github/workflows/                # GitHub Actions workflows
│   └── update-afspraken.yml          # Workflow om afspraken.csv te updaten
├── .gitignore                        # Git ignore bestand
├── README.md                         # Dit bestand
└── ADMIN_README.md                   # Admin UI setup & gebruiksinstructies
```

## Aan de Slag

### Lokaal Bekijken

Open simpelweg `index.html` in je webbrowser:

1. Navigeer naar de project directory
2. Dubbelklik op `index.html` of rechtsklik en selecteer "Openen met" je favoriete browser

### Lokale Server Gebruiken (Aanbevolen)

Voor de beste ervaring, gebruik een lokale webserver:

**Met Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Met Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Met PHP:**
```bash
php -S localhost:8000
```

Open vervolgens je browser en ga naar `http://localhost:8000`

## Prijslijst Updaten

De prijslijst wordt dynamisch geladen vanuit CSV bestanden. Om prijzen te updaten:

1. Open het juiste CSV bestand in de GitHub repo:
   - `prijslijst-nl.csv` voor Nederlands
   - `prijslijst-en.csv` voor Engels
   - `prijslijst-pl.csv` voor Pools

2. Bewerk het CSV bestand direct in GitHub of lokaal

3. Het formaat is:
   ```csv
   Category,Service,Duration,Price
   Permanent Make-up,Wenkbrauwen - Powder brows,2-3 uur,€ 395
   ```

4. Commit en push de wijzigingen - de website laadt automatisch de nieuwe prijzen

## Afspraken Beheren

### 🎨 Admin UI (Aanbevolen)

De eenvoudigste manier om afspraken te beheren is via de **Admin UI**:

1. Ga naar `admin.html` op je website
2. Log in met je GitHub Personal Access Token
3. Gebruik de gebruiksvriendelijke interface om:
   - ✅ Afspraken te bekijken in een overzichtelijke kaartweergave
   - ➕ Nieuwe afspraken toe te voegen
   - ✏️ Bestaande afspraken te bewerken
   - 🗑️ Afspraken te verwijderen
   - 🔄 Beschikbaarheid aan/uit te zetten met een toggle
   - 📅 Afspraken te filteren op datum
4. Klik op "Wijzigingen Opslaan" om de updates toe te passen

**Zie [ADMIN_README.md](ADMIN_README.md) voor volledige setup instructies.**

### 📝 Handmatig Beheren (Alternatief)

Je kunt ook handmatig het CSV bestand bewerken:

1. Open `afspraken.csv` in de GitHub repo

2. Bewerk de beschikbaarheid voor elke datum en tijdslot:
   ```csv
   Date,TimeSlot,Available
   2025-12-15,09:00-10:30,true
   2025-12-15,13:00-15:00,false
   ```

3. Formaat:
   - **Date**: Datum in YYYY-MM-DD formaat
   - **TimeSlot**: Tijdslot in HH:MM-HH:MM formaat (bijvoorbeeld: 09:00-10:30, 13:00-15:00)
   - **Available**: `true` voor beschikbaar, `false` voor bezet

4. Commit en push de wijzigingen - de kalender toont automatisch de nieuwe beschikbaarheid

**Tip**: De kalender toont automatisch de volgende 30 dagen vanaf vandaag. Voeg nieuwe data toe en verwijder oude om de kalender actueel te houden. Tijdslots kunnen variëren in duur (niet alles hoeft één uur te zijn).

## Aanpassen

### Contact Informatie

**Belangrijk:** Update de volgende placeholder contact informatie voor deployment:
- E-mail: `info@bebeauty.com` 
- Telefoon: `+31 6 12345678`
- Adres: `Smuga, Nederland`

Deze informatie moet worden aangepast in:
- `contact.html` (Contact pagina)
- `prijslijst.js` (Downloadbare prijslijst footer)

### Kleuren

Alle kleuren zijn gedefinieerd als CSS variabelen in `styles.css`. Je kunt het kleurenschema makkelijk aanpassen door de `:root` sectie te wijzigen:

```css
:root {
    --primary-color: #4a90e2;      /* Hoofd merk kleur */
    --secondary-color: #2c3e50;    /* Secundaire kleur */
    --accent-color: #e74c3c;       /* Accent kleur */
    --text-color: #333;            /* Tekst kleur */
    --light-bg: #f4f4f4;           /* Lichte achtergrond */
    --white: #ffffff;              /* Wit */
}
```

### Vertalingen Toevoegen

Om een nieuwe taal toe te voegen:

1. Voeg een nieuwe taalcode toe aan het `translations` object in `translations.js`
2. Maak een nieuw CSV bestand voor de prijzen (bijv. `prijslijst-de.csv` voor Duits)
3. Voeg een taalknop toe aan de navigatie in alle HTML bestanden

### Layout

De website gebruikt een container-gebaseerde layout met een max-width van 1200px. Je kunt dit aanpassen in de `.container` class in `styles.css`.

## Social Media

Be Beauty is te vinden op:
- Instagram: [@js.bebeauty](https://www.instagram.com/js.bebeauty)
- Facebook: [BeBeautySmugaJustyna](https://www.facebook.com/BeBeautySmugaJustyna)
- TikTok: [@bebeauty.js](https://www.tiktok.com/@bebeauty.js)

## Deployment

Deze website kan gedeployed worden naar elke statische hosting service:

- **GitHub Pages**: Push naar een GitHub repository en activeer GitHub Pages
- **Netlify**: Drag and drop de folder of verbind je repository
- **Vercel**: Verbind je repository of gebruik de CLI
- **Firebase Hosting**: Gebruik Firebase CLI om te deployen
- **Elke webserver**: Upload bestanden via FTP/SFTP

## Browser Ondersteuning

- Chrome (laatste versie)
- Firefox (laatste versie)
- Safari (laatste versie)
- Edge (laatste versie)
- Mobiele browsers (iOS Safari, Chrome voor Android)

## Licentie

Dit project is open source en beschikbaar voor iedereen om te gebruiken en aan te passen.