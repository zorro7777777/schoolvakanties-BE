# 📅 Schoolvakanties België — PWA

> Schoolvakanties, feestdagen en kalender voor alle Belgische onderwijsgemeenschappen.  
> Volledig offline bruikbaar als Progressive Web App (PWA).

---

## 🇧🇪 Over deze app

Een single-file Progressive Web App die schoolvakanties, wettelijke feestdagen en gemeenschapsfeestdagen toont voor de drie Belgische onderwijsnetwerken:

| Gemeenschap | Kleur | Taal |
|---|---|---|
| 🟡 Vlaamse Gemeenschap | Geel | Nederlands |
| 🔴 Fédération Wallonie-Bruxelles | Rood | Frans |
| 🔵 Duitstalige Gemeenschap | Blauw | Duits |

---

## ✨ Functies

### 📋 Kalender
- Schoolvakanties per gemeenschap (dynamisch berekend)
- Wettelijke Belgische feestdagen (10 federale feestdagen)
- Gemeenschapsfeestdagen (11 juli / 27 september / 15 november)
- Feestdagen in vakantie of weekend worden **automatisch gefilterd** — enkel effectieve vrije schooldagen worden getoond
- Huidig actieve vakantie gemarkeerd in groen
- Eerstvolgende vakantie gemarkeerd in goud
- Voorbije periodes met 30% opacity (visueel uitgevaagd)
- Countdown-balk: "Over X dagen begint de Krokusvakantie"

### ⚖️ Vergelijkingsmodus
- Twee gemeenschappen naast elkaar vergelijken
- Overlappende periodes (gezin heeft samen vrij) groen gemarkeerd
- Afwijkende periodes geel gemarkeerd
- Ideaal voor gezinnen met kinderen in verschillende onderwijsnetten

### 📥 ICS Export
- Download `.ics` kalenderbestand per gemeenschap
- Of download alle drie tegelijk
- Compatibel met Google Calendar, Apple Calendar en Outlook
- Bevat alle vakanties én vrije feestdagen

### 🔔 Push Notificaties (PWA)
- Browser-gebaseerde push notificaties via Service Worker
- Keuze van timing: dag zelf / 1 / 2 / 3 dagen op voorhand
- Per gemeenschap instelbaar
- Werkt als achtergrondmelding bij installatie als PWA
- Testknop om notificaties te controleren

### 🖨️ Afdrukken / PDF
- Printvriendelijke lay-out: witte achtergrond, zwarte tekst
- Inkvriendelijk — geen donkere vlakken
- Twee tabellen: schoolvakanties + vrije feestdagen
- Automatisch afdrukvenster (kies "Opslaan als PDF")
- Calibri lettertype voor duidelijke l/I/1 onderscheiding

### ⊞ Launcher / Menu
- Alle pagina's bereikbaar via launcher-grid
- Lang indrukken op tegel = toevoegen aan favorieten
- Favorieten opgeslagen in `localStorage`
- Max 3 favorieten + Kalender (altijd aanwezig)

---

## 🧮 Berekeningslogica

### Vlaamse / Duitstalige Gemeenschap
| Vakantie | Berekening |
|---|---|
| Eerste schooldag | Eerste maandag van september |
| Eerste schooldag hoger onderwijs | +21 dagen na basisonderwijs |
| Herfstvakantie | Maandag van week van 1 november, 7 dagen |
| Kerstvakantie | Maandag vóór/op 25 december, **14 dagen vast** |
| Krokusvakantie | 48 dagen vóór Pasen (maandag), 7 dagen |
| Paasvakantie | Paasmaandag, 14 dagen |
| Zomervakantie | 1 juli t/m 31 augustus |

### Franstalige Gemeenschap (hervormd 2022)
| Vakantie | Berekening |
|---|---|
| Eerste schooldag | Laatste maandag van augustus (≥ 25 aug) |
| Herfstvakantie | 1 week vóór Vlaamse herfst, **14 dagen** |
| Kerstvakantie | Identiek aan Vlaanderen |
| Krokus / Congé de détente | Zelfde start als Vlaanderen, **14 dagen** |
| Lentevakantie | Paasmaandag + 21 dagen, 14 dagen |
| Zomervakantie | Eerste maandag ≥ 4 juli, 7 weken (49 dagen) |

### Paasberekening
Algoritme van **Butcher (1876)** — astronomisch correct voor alle jaren.

### Gemeenschapsfeestdagen
| Gemeenschap | Datum | Betekenis |
|---|---|---|
| Vlaanderen | 11 juli | Guldensporenslag 1302 |
| Franstalig | 27 september | Overwinning Belgische patriotten 1830 |
| Duitstalig | 15 november | Dag van de Duitstalige Gemeenschap (sinds 1990) |

> ⚠️ Gemeenschapsfeestdagen zijn **geen wettelijke federale feestdagen** maar scholen zijn er wel gesloten. Ze worden enkel getoond als ze buiten de schoolvakanties en het weekend vallen.

---

## 📡 PWA Installatie

### Android (Chrome)
1. Open `index.html` in Chrome
2. Tik op de drie puntjes → "Toevoegen aan startscherm"
3. Of: Chrome toont automatisch een installatiebanner

### iOS (Safari)
1. Open `index.html` in Safari
2. Tik op het deel-icoontje (vierkantje met pijl omhoog)
3. Kies "Zet op beginscherm"

### Desktop (Chrome/Edge)
1. Open de pagina
2. Klik op het installatie-icoontje in de adresbalk

---

## 📁 Bestandsstructuur

```
schoolvakanties/
├── index.html      # Hoofdapplicatie (single-file)
├── manifest.json             # PWA manifest
├── sw.js                     # Service Worker (offline + push)
├── icon-192.png              # PWA icoon 192×192
├── icon-512.png              # PWA icoon 512×512
├── apple-touch-icon.png      # iOS icoon 180×180
├── favicon-32.png            # Favicon 32×32
├── favicon-16.png            # Favicon 16×16
└── README.md                 # Dit bestand
```

> Alle bestanden moeten **in dezelfde map** staan voor correcte werking van de Service Worker en PWA-installatie.

---

## 🌐 Offline werking

De app werkt volledig offline na de eerste laad:
- Alle vakantieberekeningen gebeuren lokaal in JavaScript
- Geen externe API's voor de kernfunctionaliteit
- Service Worker cached alle bestanden bij eerste bezoek
- ICS export werkt ook offline
- Push notificaties werken via de geïnstalleerde PWA

---

## 📚 Bronvermelding

### Officiële schoolkalenders
| Gemeenschap | Bron | URL |
|---|---|---|
| Vlaanderen | Vlaams Ministerie van Onderwijs en Vorming | https://www.vlaanderen.be/schoolvakanties |
| Franstalig (Wallonië/Brussel) | Fédération Wallonie-Bruxelles | https://www.enseignement.be |
| Duitstalig | Ministerium der Deutschsprachigen Gemeinschaft | https://www.ostbelgienbildung.be |

### Wettelijke feestdagen
- **Federale wettelijke feestdagen** — Federale Overheidsdienst Werkgelegenheid  
  https://werk.belgie.be/nl/themas/feestdagen-en-verloven/feestdagen
- **Vlaamse feestdag (11 juli)** — Vlaamse Regering  
  https://www.vlaanderen.be
- **Fête de la Communauté française (27 september)** — Fédération Wallonie-Bruxelles  
  https://www.federation-wallonie-bruxelles.be
- **Tag der Deutschsprachigen Gemeinschaft (15 november)** — Parlament der Deutschsprachigen Gemeinschaft  
  https://www.pdg.be

### Technische bronnen
- **Paasberekening** — Butcher's algoritme (1876), implementatie gebaseerd op publiek domein wiskundige formules
- **Franstalige kalenderhervorming** — Decreet Fédération Wallonie-Bruxelles (2022–2023), bevestigd via:
  - https://www.forbes.be/nl/vakanties-schoolvakanties-belgie/
  - https://www.feestdagen-belgie.be
  - https://www.parentia.be
- **PWA standaarden** — W3C Web App Manifest, Service Worker API  
  https://www.w3.org/TR/appmanifest/

---

## 🔧 Technische stack

| Component | Technologie |
|---|---|
| Framework | Geen — Vanilla HTML/CSS/JavaScript |
| Berekeningen | Pure JavaScript (geen bibliotheken) |
| Opslag | `localStorage` (favorieten) |
| Offline | Service Worker API |
| Notificaties | Web Notifications API + Service Worker Push |
| Export | Blob API (ICS), `window.open` + `window.print()` (PDF) |
| Installatie | PWA / Web App Manifest |
| Stijl | CSS Variables, `Courier New` monospace (terminal-look) |

---

## 👥 Ontwikkelaars

### Opdrachtgever & inhoudelijk verantwoordelijke
**De Poortere Andy**  
📧 andy.depoortere@gmail.com  
*Concept, inhoudelijke vereisten, testfeedback en projectleiding*

### Technische realisatie
**Claude AI — Sonnet 4.6**  
*Gegenereerd door Anthropic's Claude Sonnet 4.6*  
*Rol: volledige technische implementatie — HTML, CSS, JavaScript, PWA-configuratie, Service Worker, algoritmen, berekeningen, iconen en documentatie*  
https://www.anthropic.com

---

## 📋 Versiegeschiedenis

| Versie | Datum | Wijzigingen |
|---|---|---|
| **v1.0.0** | Mei 2026 | Initiële release — Kalender, Vergelijk, Export ICS, Push notificaties, Afdrukken/PDF, PWA, Service Worker, drie gemeenschappen |

---

## 📄 Licentie

Dit project is vrij te gebruiken voor persoonlijk en educatief gebruik.  
Commercieel gebruik vereist toestemming van de auteur.

---

## ⚠️ Disclaimer

Hoewel de vakantieberekeningen gebaseerd zijn op officiële bronnen en wiskundig worden afgeleid, kunnen er kleine afwijkingen zijn voor toekomstige schooljaren als de overheid de regels aanpast. Raadpleeg steeds de officiële schoolkalender van uw onderwijsinstelling voor definitieve bevestiging.

---

*README gegenereerd door Claude AI Sonnet 4.6 — Mei 2026*
