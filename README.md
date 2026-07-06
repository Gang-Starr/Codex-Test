# Lokale Web-App für Produktionsstückzahlen und optionale OEE

Diese Web-App ist eine einfache lokale Test-App zur täglichen Produktionsauswertung. Sie erfasst Stückzahlen im Browser, berechnet Gutmenge, Ausschuss, Abweichung, Zielerreichung, optionale OEE-Kennzahlen, KPI-Karten, Tabellen, Diagramme und eine Management-Zusammenfassung.

Die App läuft vollständig lokal im Browser. Es gibt keine Datenbank, kein Login und keine Server-Komponente. Daten werden im `localStorage` des jeweiligen Browsers gespeichert und bleiben nur auf diesem Gerät bzw. in diesem Browserprofil erhalten.

> Wichtig: Verwenden Sie keine echten Firmendaten, personenbezogenen Daten oder vertraulichen Produktionsdaten.

## Dateien

- `index.html` – Struktur der Eingabemaske, Auswertungen, Dashboard, Tabelle und Bedienelemente
- `style.css` – modernes, responsives Layout für Desktop, Tablet und Smartphone
- `script.js` – Speicherung, Projektverwaltung, Validierung, Berechnungen, CSV-Import/-Export, TXT-Export und Canvas-Diagramme
- `README.md` – Beschreibung und Bedienhinweise

## Pflichtfelder für die normale Stückzahlauswertung

Diese Felder werden für jeden Eintrag benötigt. Die normale Stückzahlauswertung funktioniert immer, auch wenn keine OEE-Daten erfasst werden:

- Datum
- Projekt (Auswahl aus dem Projekt-Dropdown)
- Bauteil (Auswahl aus dem Bauteil-Dropdown)
- Maschine (Auswahl aus dem Maschinen-Dropdown)
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
- Grau: keine vollständigen oder gültigen Daten für eine Bewertung


## Stammdatenverwaltung für Projekt, Bauteil und Maschine

Die Felder **Projekt**, **Bauteil** und **Maschine** sind keine Freitextfelder mehr. Produktionsdaten werden über Pflicht-Dropdowns zugeordnet. Wenn ein Wert fehlt, zeigt die App verständliche Meldungen an: **„Bitte ein Projekt auswählen.“**, **„Bitte ein Bauteil auswählen.“** oder **„Bitte eine Maschine auswählen.“**.

Beim ersten Start legt die App diese Projekte lokal an:

- Garten
- Z1
- Projekt A
- Projekt B
- Testprojekt

Zusätzlich werden beim ersten Start diese Bauteile angeboten:

- Bauteil A
- Bauteil B
- Gehäuse
- Sleeve
- Cartridge Holder

Diese Maschinen sind standardmäßig enthalten:

- Maschine 1
- Maschine 2
- M-01
- OP-711
- OP-714

Im aufklappbaren Bereich **„Stammdaten verwalten“** befinden sich platzsparende Eingabefelder für **Neues Projekt**, **Neues Bauteil** und **Neue Maschine**. Mit den Buttons **„Projekt hinzufügen“**, **„Bauteil hinzufügen“** und **„Maschine hinzufügen“** werden neue Werte sofort lokal gespeichert, im jeweiligen Dropdown angezeigt und stehen auch nach einem Neuladen weiter zur Verfügung.

Dort können Projekte lokal im Browser weiter verwaltet werden:
- Bestehenden Namen im Projektfeld ändern und mit **„Umbenennen“** speichern. Bereits gespeicherte Produktionsdaten werden dabei auf den neuen Projektnamen umgestellt und bleiben erhalten.
- Projekte mit **„Archivieren“** ausblenden. Archivierte Projekte erscheinen nicht mehr im Eingabe-Dropdown, bleiben aber in der Projektverwaltung und in bestehenden Produktionsdaten erhalten.
- Archivierte Projekte können über **„Aktivieren“** wieder im Dropdown sichtbar gemacht werden.

Projektliste, Bauteilliste, Maschinenliste und Produktionsdaten werden in `localStorage` gespeichert. Pro Projekt speichert die App den Projektnamen, den Status `active`/`archived` und das Erstellungsdatum. Beim Laden prüft die App zusätzlich vorhandene Produktionsdaten: Projekt-, Bauteil- und Maschinenwerte aus älteren Freitext-Einträgen werden automatisch in die passenden Listen übernommen. Leerzeichen am Anfang oder Ende werden entfernt, doppelte Werte werden unabhängig von Groß-/Kleinschreibung vermieden.

## Optionale OEE-Daten

Die OEE-Berechnung ist optional. In der Eingabemaske gibt es dafür den optisch abgesetzten Bereich **„Optionale OEE-Daten“** mit dem Hinweis:

> Nur ausfüllen, wenn OEE berechnet werden soll.

Die Felder dürfen leer bleiben. Ein Eintrag kann auch ohne OEE-Daten gespeichert werden. Für die OEE-Berechnung werden zusätzlich diese drei Werte benötigt:

- Geplante Produktionszeit in Minuten > 0
- Maschinenstillstand in Minuten >= 0
- Ideale Taktzeit je Stück in Sekunden > 0

Zusätzlich darf der Maschinenstillstand nicht größer sein als die geplante Produktionszeit.

Wenn eines dieser OEE-Felder fehlt oder technisch nicht auswertbar ist, behandelt die App OEE für diesen Eintrag als nicht vorhanden. Tabelle, KPI-Karten und Platzhalter zeigen dann konsequent **„n/a“**. „n/a“ bedeutet, dass keine vollständigen OEE-Daten für die Berechnung vorhanden sind. Der OEE-Status ist grau und die OEE-Diagramme ignorieren diesen Datensatz.

## OEE-Berechnung

Wenn alle optionalen OEE-Felder vollständig und gültig ausgefüllt sind, berechnet die App:

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
- Grau: keine vollständigen OEE-Daten vorhanden

## Auswertungen und Dashboard

Die App zeigt und aktualisiert passend zu den gewählten Projekt-, Bauteil- und Maschinenfiltern:

- Tabelle mit allen Eingaben und berechneten Kennzahlen
- Tagesübersicht
- Summen je Projekt, Bauteil und Maschine
- Gesamt-Gutmenge, Gesamt-Ausschuss und Gesamt-Abweichung
- Durchschnittliche Zielerreichung
- Durchschnittliche Verfügbarkeit, Leistung, Qualität und OEE nur aus Einträgen mit vollständigen OEE-Daten
- Anzahl Einträge mit OEE-Berechnung und ohne vollständige OEE-Daten
- Management-Zusammenfassung als Kurztext und TXT-Export
- Ampelstatus je Zeile für Zielerreichung und OEE

Das Dashboard enthält responsive Canvas-Diagramme ohne externe Bibliothek:

1. Gutmenge pro Tag
2. Zielmenge vs. Gutmenge pro Tag
3. Ausschuss pro Tag
4. Kumulierte Abweichung
5. OEE pro Tag (nur Einträge mit gültiger OEE-Berechnung)
6. OEE-Bestandteile Verfügbarkeit, Leistung und Qualität pro Tag (nur Einträge mit gültiger OEE-Berechnung)

Wenn keine OEE-Daten vorhanden sind, zeigen die OEE-Diagramme **„Keine OEE-Daten vorhanden“**.


### Dashboard-Filter

Im Dashboard gibt es Filter für **Projekt**, **Bauteil** und **Maschine**. Der Nutzer kann jeweils **„Alle Projekte“**, **„Alle Bauteile“** bzw. **„Alle Maschinen“** oder einen einzelnen Wert auswählen. Sobald ein Filter geändert wird, aktualisieren sich Management-Zusammenfassung, KPI-Karten, Tagesübersicht, Summen nach Kategorien, Tabelle, Diagramme sowie CSV-/TXT-Export auf die gefilterten Daten. Die Filter enthalten auch Werte aus alten Produktionsdaten, damit historische Einträge weiterhin auswertbar bleiben.

## CSV-Import und CSV-Export

Der CSV-Export erzeugt eine Semikolon-getrennte Datei mit allen Spalten und enthält weiterhin die Spalten **Projekt**, **Bauteil** und **Maschine**. Sind Filter gesetzt, exportiert die App die entsprechend gefilterten Einträge; bei allen Filtern auf „Alle“ werden alle Einträge exportiert. Der Import erkennt Projekt-, Bauteil- und Maschinenwerte aus der CSV automatisch. Wenn eine importierte CSV neue Werte enthält, ergänzt die App diese automatisch in Projektliste, Bauteilliste bzw. Maschinenliste. Der Import hängt gültige importierte Zeilen an die bestehenden lokalen Daten an und berechnet danach alle Kennzahlen automatisch neu: Gutmenge, Abweichung, Zielerreichung, Zielstatus sowie – bei vollständigen OEE-Daten – Verfügbarkeit, Leistung, Qualität, OEE und OEE-Status.

CSV-Import funktioniert:

- mit OEE-Spalten und gefüllten OEE-Werten
- mit OEE-Spalten, aber leeren OEE-Werten
- ohne OEE-Werte in einzelnen Zeilen

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

Beim CSV-Export werden immer alle Spalten ausgegeben. Leere optionale OEE-Felder bleiben in der CSV-Datei leer. Für Einträge ohne vollständige OEE-Daten wird OEE in der App als **„n/a“** dargestellt.

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
