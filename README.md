# Location-Quiz

Kurzanleitung (Deutsch)

**Projekt**

- Ein kleines React/Vite-Projekt mit Standort-basiertem Quiz.
- Enthält interaktive Quizfragen, Animationen (motion) und Confetti bei Erfolg.

**Verzeichnis (wichtig)**

- `src/` – Quellcode (Components, Hooks, Stores)
- `css/` – Styles, u.a. `css/components/quiz.css` für Quiz-spezifische Regeln
- `public/` – statische Assets
- `package.json` – Scripts & Abhängigkeiten

**Voraussetzungen**

- Node.js (>= 18 empfohlen)
- npm (oder yarn)

**Schnellstart**

1. Abhängigkeiten installieren:

```powershell
npm install
```

2. Dev-Server starten:

```powershell
npm run dev
```

3. Öffne die angegebene `localhost`-Adresse im Browser.

**Wichtige Scripts (in `package.json`)**

- `npm run dev` – Startet Vite im Dev-Modus
- `npm run build` – Erzeugt eine Produktions-Build
- `npm run preview` – Lokale Vorschau des Builds

**Features / Hinweise**

- Confetti: `canvas-confetti` wird ausgelöst, wenn ein Quiz korrekt beantwortet wird (`src/components/Quiz.jsx`).
- Animationen: Komponenten verwenden das `motion`-Paket (importiert aus `motion/react`) für Einblend- und Fly-In-Effekte.
- Quizdaten: `src/quizData.js` enthält die Quizfragen/Antworten.
- Zustand: `zustand` wird als Store-Lösung verwendet (`zustandQuizStore.js`, `zustandPoiStore.js`, `zustandLocationStore.js`).

**Styling**

- Styles liegen in `css/`. Komponenten-spezifische Regeln sind unter `css/components/`.
