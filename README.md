# Lokale Web-App für Produktionsstückzahlen und optionale OEE

Diese Web-App erfasst tägliche Produktionsstückzahlen für Test- und Demo-Zwecke direkt im Browser. Sie berechnet Gutmenge, Abweichung, Zielerreichung, Status-Ampeln, KPI-Karten, Tabellen, Diagramme und eine kurze Management-Zusammenfassung.

Die App läuft vollständig lokal im Browser. Es gibt keine Datenbank, kein Login und keine Server-Komponente. Daten werden im `localStorage` des jeweiligen Browsers gespeichert und bleiben nur auf diesem Gerät bzw. in diesem Browserprofil erhalten.

> Wichtig: Diese App ist eine einfache lokale Test-App. Verwenden Sie keine echten Firmendaten, personenbezogenen Daten oder vertraulichen Produktionsdaten.

## Dateien

- `index.html` – Struktur der Eingabemaske, Auswertungen, Dashboard, Tabelle und Bedienelemente
- `style.css` – modernes, responsives Layout für Desktop, Tablet und Smartphone
- `script.js` – Speicherung, Validierung, Berechnungen, CSV-Import/-Export, TXT-Export und Canvas-Diagramme
- `README.md` – Beschreibung und Bedienhinweise

## Pflichtfelder für die normale Stückzahlauswertung

Diese Felder werden für jeden Eintrag benötigt. Die normale Stückzahlauswertung funktioniert immer, auch ohne OEE-Daten:

- Datum
- Projekt
- Bauteil
- Maschine
- Zielmenge pro Tag (muss größer als 0 sein)
- Produzierte Stückzahl (muss größer oder gleich 0 sein)
- Ausschuss (darf nicht größer als die produzierte Stückzahl sein)
- Kommentar

Berechnungen:

- **Gutmenge** = Produzierte Stückzahl − Ausschuss
- **Abweichung** = Gutmenge − Zielmenge
- **Zielerreichung in Prozent** = Gutmenge / Zielmenge × 100

Statuslogik Zielerreichung:

- Grün: Zielerreichung >= 100 %
- Gelb: Zielerreichung >= 90 % und < 100 %
- Rot: Zielerreichung < 90 %
- Grau: nicht berechenbar

## Optionale OEE-Berechnung

Die OEE-Berechnung ist optional. Die App berechnet OEE nur, wenn alle drei zusätzlichen OEE-Felder vollständig und gültig ausgefüllt sind:

- Geplante Produktionszeit in Minuten > 0
- Maschinenstillstand in Minuten >= 0
- Ideale Taktzeit je Stück in Sekunden > 0

Zusätzlich darf der Maschinenstillstand nicht größer sein als die geplante Produktionszeit.

Wenn eines dieser OEE-Felder fehlt oder ungültig ist, wird keine OEE berechnet. Die Tabelle zeigt dann **„nicht berechnet“**, der OEE-Status ist grau und die OEE-Diagramme ignorieren diesen Datensatz. Die Management-Zusammenfassung zählt getrennt, wie viele Einträge mit und ohne OEE-Berechnung vorliegen.

OEE-Formeln:

- **Laufzeit in Minuten** = Geplante Produktionszeit − Maschinenstillstand
- **Verfügbarkeit in Prozent** = Laufzeit / Geplante Produktionszeit × 100
- **Theoretische Stückzahl** = Laufzeit in Sekunden / ideale Taktzeit je Stück
- **Leistung in Prozent** = Produzierte Stückzahl / theoretische Stückzahl × 100
- **Qualität in Prozent** = Gutmenge / Produzierte Stückzahl × 100
- **OEE in Prozent** = Verfügbarkeit × Leistung × Qualität / 10000

Prozentwerte werden auf eine Nachkommastelle gerundet. OEE-Werte über 100 % werden als Hinweis markiert, weil dann vermutlich Taktzeit, Stückzahl oder Zeitangaben geprüft werden sollten.

Statuslogik OEE:

- Grün: OEE >= 85 %
- Gelb: OEE >= 70 % und < 85 %
- Rot: OEE < 70 %
- Grau: OEE nicht berechenbar

## Auswertungen und Dashboard

Die App zeigt:

- Tabelle mit allen Eingaben und berechneten Kennzahlen
- Tagesübersicht
- Summen je Projekt, Bauteil und Maschine
- Gesamt-Gutmenge, Gesamt-Ausschuss und Gesamt-Abweichung
- Durchschnittliche Zielerreichung
- Durchschnittliche Verfügbarkeit, Leistung, Qualität und OEE nur aus gültigen OEE-Einträgen
- Anzahl Einträge mit OEE-Berechnung und ohne OEE-Berechnung
- Management-Zusammenfassung als Kurztext und TXT-Export
- Ampelstatus je Zeile für Zielerreichung und OEE

Das Dashboard enthält responsive Canvas-Diagramme ohne externe Bibliothek:

1. Gutmenge pro Tag
2. Zielmenge vs. Gutmenge pro Tag
3. Ausschuss pro Tag
4. Kumulierte Abweichung
5. OEE pro Tag (nur gültige OEE-Einträge)
6. OEE-Bestandteile Verfügbarkeit, Leistung und Qualität pro Tag (nur gültige OEE-Einträge)

Wenn keine OEE-Daten vorhanden sind, zeigen die OEE-Diagramme **„Keine OEE-Daten vorhanden“**.

## CSV-Import und CSV-Export

Der CSV-Export erzeugt eine Semikolon-getrennte Datei mit allen Spalten. Der Import hängt gültige importierte Zeilen an die bestehenden lokalen Daten an und berechnet danach alle Kennzahlen automatisch neu.

Kopfzeile:

```csv
Datum;Projekt;Bauteil;Maschine;Zielmenge pro Tag;Produzierte Stückzahl;Ausschuss;Geplante Produktionszeit in Minuten;Maschinenstillstand in Minuten;Ideale Taktzeit je Stück in Sekunden;Kommentar
```

Beispiel mit OEE-Daten:

```csv
Datum;Projekt;Bauteil;Maschine;Zielmenge pro Tag;Produzierte Stückzahl;Ausschuss;Geplante Produktionszeit in Minuten;Maschinenstillstand in Minuten;Ideale Taktzeit je Stück in Sekunden;Kommentar
2026-07-01;Projekt A;Gehäuse;M-01;1000;980;20;480;35;25;Anlaufprobleme am Morgen
2026-07-02;Projekt A;Gehäuse;M-01;1000;1040;10;480;20;25;Stabiler Lauf
```

Beispiel ohne OEE-Daten:

```csv
Datum;Projekt;Bauteil;Maschine;Zielmenge pro Tag;Produzierte Stückzahl;Ausschuss;Geplante Produktionszeit in Minuten;Maschinenstillstand in Minuten;Ideale Taktzeit je Stück in Sekunden;Kommentar
2026-07-03;Projekt B;Deckel;M-02;800;760;15;;;;OEE-Daten wurden nicht erfasst
2026-07-04;Projekt B;Deckel;M-02;800;810;8;;;;Nur Stückzahlen bewertet
```

CSV-Import funktioniert mit gefüllten OEE-Spalten, leeren OEE-Spalten und einzelnen Zeilen ohne OEE-Werte. Für Einträge ohne gültige OEE-Daten wird OEE als **nicht berechnet** behandelt.

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
