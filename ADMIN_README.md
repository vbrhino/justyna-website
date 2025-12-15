# Admin UI voor Afspraken Beheer

Dit document legt uit hoe je de Admin UI gebruikt om de `afspraken.csv` te beheren via een gebruiksvriendelijke interface.

## 🎯 Overzicht

De Admin UI stelt je in staat om:
- **Bekijken** van alle afspraken in een overzichtelijk kaartformaat
- **Toevoegen** van nieuwe afspraken met datum en tijdslot
- **Bewerken** van bestaande afspraken
- **Verwijderen** van afspraken
- **Wijzigen** van beschikbaarheid (beschikbaar/bezet) met een simpele toggle
- **Filteren** van afspraken op datum
- **Opslaan** van wijzigingen direct naar GitHub via GitHub Actions

## 🔧 Installatie & Setup

### Stap 1: GitHub Personal Access Token Aanmaken

1. Ga naar GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Klik op "Generate new token (classic)"
3. Geef het token een beschrijvende naam, bijv. "Afspraken Admin"
4. Selecteer de volgende scopes:
   - `repo` (volledige controle over repositories)
   - `workflow` (update GitHub Action workflows)
5. Klik op "Generate token"
6. **BELANGRIJK**: Kopieer het token onmiddellijk en bewaar het veilig!

### Stap 2: Admin Auth Token als Secret Toevoegen

1. Ga naar je repository op GitHub
2. Klik op Settings → Secrets and variables → Actions
3. Klik op "New repository secret"
4. Naam: `ADMIN_AUTH_TOKEN`
5. Waarde: Plak je Personal Access Token hier
6. Klik op "Add secret"

### Stap 3: Workflow Permissies Instellen

1. Ga naar je repository Settings → Actions → General
2. Scroll naar "Workflow permissions"
3. Selecteer "Read and write permissions"
4. Vink "Allow GitHub Actions to create and approve pull requests" aan
5. Klik op "Save"

## 🚀 Admin UI Gebruiken

### Toegang

1. Open `admin.html` in je browser (of ga naar `https://yourwebsite.com/admin.html`)
2. Voer je GitHub Personal Access Token in bij "Authenticatie Token"
3. Klik op "Login"

**Let op**: Het token wordt opgeslagen in de browser's sessie opslag en verdwijnt wanneer je de tab sluit.

### Afspraken Beheren

#### Nieuwe Afspraak Toevoegen
1. Klik op "➕ Nieuwe Afspraak Toevoegen"
2. Voer de datum in (formaat: YYYY-MM-DD, bijv. 2025-12-25)
3. Voer het tijdslot in (formaat: HH:MM-HH:MM, bijv. 09:00-10:30)
4. De afspraak wordt toegevoegd als "Beschikbaar"

#### Beschikbaarheid Wijzigen
- Klik op de toggle switch om te wisselen tussen Beschikbaar (groen) en Bezet (rood)

#### Afspraak Bewerken
1. Klik op "✏️ Bewerken" bij de afspraak
2. Wijzig de datum of tijdslot
3. De wijzigingen worden direct getoond

#### Afspraak Verwijderen
1. Klik op "🗑️ Verwijderen" bij de afspraak
2. Bevestig de verwijdering

#### Afspraken Filteren
1. Selecteer een datum in het filterveld
2. Alleen afspraken voor die datum worden getoond
3. Klik op "Wis Filter" om alle afspraken weer te tonen

### Wijzigingen Opslaan

1. Na het maken van wijzigingen, klik op "💾 Wijzigingen Opslaan"
2. Bevestig dat je de wijzigingen wilt opslaan
3. De wijzigingen worden verzonden naar GitHub Actions
4. De workflow draait en update `afspraken.csv`
5. Na enkele seconden worden de afspraken automatisch opnieuw geladen

### Wijzigingen Annuleren

- Klik op "↩️ Annuleren" om alle niet-opgeslagen wijzigingen ongedaan te maken

### Uitloggen

- Klik op "🚪 Uitloggen" om uit te loggen en het token te verwijderen

## 🔒 Beveiliging

### Belangrijke Beveiligingsnotities

1. **Bewaar je token veilig**: Deel je Personal Access Token nooit met anderen
2. **HTTPS gebruiken**: Gebruik altijd HTTPS bij gebruik van de Admin UI in productie
3. **Token rotatie**: Vernieuw periodiek je GitHub Personal Access Token
4. **Toegangscontrole**: Alleen personen met het token kunnen wijzigingen maken
5. **Audit log**: Alle wijzigingen worden gelogd in GitHub Actions

### Extra Beveiliging (Optioneel)

Voor extra beveiliging kun je:
- De `admin.html` pagina beschermen met basis HTTP authenticatie op je webserver
- Een IP whitelist implementeren op je hosting provider
- De admin pagina in een apart subdomein plaatsen

## 🛠️ Technische Details

### Hoe het werkt

1. **Frontend**: De `admin.html` pagina laadt de huidige `afspraken.csv` en toont deze in een gebruiksvriendelijke interface
2. **Authenticatie**: De gebruiker authenticeert met een GitHub Personal Access Token
3. **Wijzigingen**: Wijzigingen worden lokaal gemaakt in de browser
4. **Opslaan**: Bij "Opslaan" wordt de GitHub Actions workflow getriggerd via de GitHub API
5. **Workflow**: De workflow `update-afspraken.yml` ontvangt de nieuwe CSV data
6. **Verificatie**: De workflow verifieert het auth token tegen het `ADMIN_AUTH_TOKEN` secret
7. **Update**: De workflow schrijft de nieuwe data naar `afspraken.csv` en commit/push deze
8. **Reflectie**: De wijzigingen zijn zichtbaar op de website

### Bestanden

- `admin.html` - Admin interface HTML
- `admin.js` - Admin logica en API integratie
- `admin-styles.css` - Styling voor de admin interface
- `.github/workflows/update-afspraken.yml` - GitHub Actions workflow voor updates

## 📋 Troubleshooting

### "Authentication failed" in GitHub Actions

- Controleer of het `ADMIN_AUTH_TOKEN` secret correct is ingesteld
- Controleer of je het juiste token gebruikt in de Admin UI

### "GitHub API error: 403" of "404"

- Controleer of je token de juiste permissions heeft (`repo` en `workflow`)
- Controleer of de repository naam en owner correct zijn in `admin.js`

### Wijzigingen worden niet opgeslagen

- Controleer de browser console voor errors
- Controleer of de GitHub Actions workflow succesvol is uitgevoerd in de Actions tab
- Controleer of je workflow permissions correct zijn ingesteld

### Token werkt niet

- Zorg ervoor dat het token nog niet verlopen is
- Genereer een nieuw token en update het `ADMIN_AUTH_TOKEN` secret

## 🎨 Aanpassen

### Repository Details Wijzigen

In `admin.js`, pas aan:
```javascript
const GITHUB_OWNER = 'vbrhino';
const GITHUB_REPO = 'justyna-website';
```

### Default Branch Wijzigen

In `admin.js`, bij de `saveChanges()` functie:
```javascript
ref: 'main', // wijzig naar je default branch
```

### Styling Aanpassen

Bewerk `admin-styles.css` om de kleuren en layout aan te passen aan je huisstijl.

## ✨ Features

- ✅ Intuïtieve kaart-gebaseerde interface
- ✅ Real-time beschikbaarheid toggle
- ✅ Datum filtering
- ✅ Inline editing
- ✅ Automatische datum sortering
- ✅ Responsive design (werkt op mobiel en desktop)
- ✅ Status meldingen
- ✅ Veilige authenticatie via GitHub
- ✅ Geen database nodig - alles in CSV

## 📞 Ondersteuning

Voor vragen of problemen, open een issue in de GitHub repository.
