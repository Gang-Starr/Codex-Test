# Lokale Web-App für Produktionsstückzahlen

Diese kleine Web-App erfasst und wertet tägliche Produktionsstückzahlen direkt im Browser aus. Sie ist für frühe Tests und Demos gedacht und verwendet keine Datenbank, kein Login und keine echten Firmendaten.

## Dateien

- `index.html` – Struktur der Eingabemaske, Auswertungen, Tabelle und Diagramme
- `style.css` – übersichtliches, professionelles Layout
- `script.js` – Speicherung, Berechnungen, CSV-Import/-Export und Diagramme

## Funktionen

- Eingabe von Datum, Projekt, Bauteil, Maschine, Zielmenge, produzierter Stückzahl, Ausschuss und Kommentar
- Automatische Berechnung von:
  - Gutmenge = produzierte Stückzahl minus Ausschuss
  - Abweichung = Gutmenge minus Zielmenge
  - Zielerreichung in Prozent
  - Ampelstatus: Grün ab 100 %, Gelb ab 90 %, Rot unter 90 %
- Tabelle mit allen gespeicherten Eingaben
- Tagesübersicht
- Summen je Projekt, Bauteil und Maschine
- Gesamt-Gutmenge, Gesamt-Ausschuss und Gesamt-Abweichung
- Kurze Management-Zusammenfassung
- Eintrag löschen und alle Daten löschen
- CSV exportieren und CSV importieren
- Einfache Canvas-Diagramme:
  - Gutmenge pro Tag
  - Zielmenge vs. Gutmenge

## Lokal starten

1. Repository oder Ordner lokal öffnen.
2. `index.html` per Doppelklick im Browser öffnen.
3. Produktionsdaten erfassen und speichern.

Alternativ kann ein kleiner lokaler Webserver verwendet werden:

```bash
python3 -m http.server 8000
```

Danach im Browser `http://localhost:8000` öffnen.

## Datenspeicherung

Die Daten werden im `localStorage` des Browsers gespeichert. Dadurch bleiben sie auf demselben Gerät und in demselben Browser erhalten, bis sie gelöscht werden.

Wichtig:

- Es gibt keine Server-Komponente.
- Es gibt keine Datenbank.
- Es gibt kein Login.
- Die Daten werden nicht automatisch synchronisiert.

## CSV-Format

Der Export verwendet Semikolon-getrennte CSV-Dateien mit folgender Kopfzeile:

```csv
Datum;Projekt;Bauteil;Maschine;Zielmenge;Produziert;Ausschuss;Kommentar
```

Beim Import wird dieselbe Struktur erwartet. Importierte Einträge werden an die bestehenden lokalen Daten angehängt.

## Mögliche Erweiterungen

- Wochenreport
- Monatsreport
- Forecast vs. Actual
- Rückstand je Kalenderwoche
- Ampel je Projekt
- Automatische Management Summary
- Export als Excel
- Mehrere Projekte, Linien oder Maschinen
