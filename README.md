# Lokale Web-App für Produktionsstückzahlen und OEE

Diese Web-App erfasst tägliche Produktionsstückzahlen für Test- und Demo-Zwecke direkt im Browser. Sie berechnet Gutmenge, Abweichung, Zielerreichung sowie eine einfache OEE und zeigt die Ergebnisse in Tabellen, Übersichten, Kennzahlen und responsiven Canvas-Balkendiagrammen an.

Die App läuft vollständig lokal im Browser. Es gibt keine Datenbank, kein Login und keine Server-Komponente. Die Daten werden im `localStorage` des jeweiligen Browsers gespeichert und bleiben nur auf diesem Gerät bzw. in diesem Browserprofil erhalten.

> Wichtig: Diese App ist eine einfache lokale Test-App. Verwenden Sie keine echten Firmendaten, personenbezogenen Daten oder vertraulichen Produktionsdaten.

## Dateien

- `index.html` – Struktur der Eingabemaske, Auswertungen, Dashboard, Tabelle und Bedienelemente
- `style.css` – modernes, responsives Layout für Desktop, Tablet und Smartphone
- `script.js` – Speicherung, Validierung, Berechnungen, CSV-Import/-Export, TXT-Export und Canvas-Diagramme
- `README.md` – Beschreibung und Bedienhinweise

## Eingabefelder

- **Datum**: Produktionstag des Eintrags.
- **Projekt**: Name oder Kürzel des Projekts.
- **Bauteil**: Produziertes Teil oder Artikelgruppe.
- **Maschine**: Maschine, Linie oder Arbeitsplatz.
- **Zielmenge pro Tag**: Soll-Stückzahl für diesen Tag.
- **Produzierte Stückzahl**: Insgesamt produzierte Stückzahl inklusive Ausschuss.
- **Ausschuss**: Nicht verwendbare Stückzahl.
- **Geplante Produktionszeit in Minuten**: Vorgesehene Produktionszeit des Tages.
- **Maschinenstillstand in Minuten**: Stillstandszeit innerhalb der geplanten Produktionszeit.
- **Ideale Taktzeit je Stück in Sekunden**: Theoretisch optimale Zeit für ein Stück.
- **Kommentar**: Freitext für Hinweise, Ursachen oder Besonderheiten.

Negative Zahlen werden verhindert bzw. mit einer klaren Meldung abgewiesen. Wenn Werte fehlen oder `0` sind, zeigt die App für nicht mögliche Kennzahlen **„nicht berechenbar“** an.

## Berechnungen

### Stückzahlkennzahlen

- **Gutmenge** = Produzierte Stückzahl − Ausschuss
- **Abweichung** = Gutmenge − Zielmenge
- **Zielerreichung in Prozent** = Gutmenge / Zielmenge × 100

Die Zielerreichung wird als Ampel dargestellt:

- Grün: mindestens 100 %
- Gelb: mindestens 90 % und unter 100 %
- Rot: unter 90 %
- Grau: nicht berechenbar

### Einfache OEE-Berechnung

Die App berechnet eine vereinfachte OEE aus Verfügbarkeit, Leistung und Qualität:

- **Laufzeit in Minuten** = Geplante Produktionszeit − Maschinenstillstand
- **Verfügbarkeit in Prozent** = Laufzeit / Geplante Produktionszeit × 100
- **Theoretische Stückzahl** = Laufzeit in Sekunden / ideale Taktzeit je Stück
- **Leistung in Prozent** = Produzierte Stückzahl / theoretische Stückzahl × 100
- **Qualität in Prozent** = Gutmenge / Produzierte Stückzahl × 100
- **OEE in Prozent** = Verfügbarkeit × Leistung × Qualität / 10000

Prozentwerte werden auf eine Nachkommastelle gerundet. OEE-Werte über 100 % werden mit einem Hinweis markiert, weil dann vermutlich Taktzeit, Stückzahl oder Zeitangaben geprüft werden sollten.

OEE-Ampel:

- Grün: mindestens 85 %
- Gelb: mindestens 70 % und unter 85 %
- Rot: unter 70 %
- Grau: nicht berechenbar

## Auswertungen und Dashboard

Die App zeigt:

- Tabelle mit allen Eingaben und berechneten Kennzahlen
- Tagesübersicht
- Summen je Projekt, Bauteil und Maschine
- Gesamt-Gutmenge, Gesamt-Ausschuss und Gesamt-Abweichung
- Durchschnittliche Zielerreichung, Verfügbarkeit, Leistung, Qualität und OEE
- Management-Zusammenfassung als Kurztext
- Ampelstatus je Zeile für Zielerreichung und OEE

Das Dashboard enthält sechs automatisch aktualisierte Canvas-Balkendiagramme ohne externe Bibliothek:

1. Gutmenge pro Tag
2. Zielmenge vs. Gutmenge pro Tag
3. Ausschuss pro Tag
4. OEE pro Tag
5. OEE-Bestandteile Verfügbarkeit, Leistung und Qualität pro Tag
6. Kumulierte Abweichung zur Zielmenge

Wenn keine Daten vorhanden sind, zeigen die Diagramme den Hinweis „Noch keine Daten vorhanden.“ an.

## CSV-Import und CSV-Export

Der CSV-Export erzeugt eine Semikolon-getrennte Datei. Der Import hängt die importierten Zeilen an die bestehenden lokalen Daten an und berechnet danach alle Kennzahlen automatisch neu.

Erwartete Kopfzeile:

```csv
Datum;Projekt;Bauteil;Maschine;Zielmenge pro Tag;Produzierte Stückzahl;Ausschuss;Geplante Produktionszeit in Minuten;Maschinenstillstand in Minuten;Ideale Taktzeit je Stück in Sekunden;Kommentar
```

Beispiel:

```csv
Datum;Projekt;Bauteil;Maschine;Zielmenge pro Tag;Produzierte Stückzahl;Ausschuss;Geplante Produktionszeit in Minuten;Maschinenstillstand in Minuten;Ideale Taktzeit je Stück in Sekunden;Kommentar
2026-07-01;Projekt A;Gehäuse;M-01;1000;980;20;480;35;25;Anlaufprobleme am Morgen
2026-07-02;Projekt A;Gehäuse;M-01;1000;1040;10;480;20;25;Stabiler Lauf
```

## Export der Management-Zusammenfassung

Über **Management-TXT exportieren** kann die aktuelle Kurz-Zusammenfassung als `.txt`-Datei heruntergeladen werden.

## Lokal starten

1. Ordner lokal öffnen.
2. `index.html` per Doppelklick im Browser öffnen.
3. Produktionsdaten erfassen, importieren oder exportieren.

Alternativ kann ein lokaler Webserver verwendet werden:

```bash
python3 -m http.server 8000
```

Danach im Browser `http://localhost:8000` öffnen.
