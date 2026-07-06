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
- Grau: keine vollständigen oder gültigen Daten für eine Bewertung


## Projektverwaltung

Das Feld **Projekt** ist kein Freitextfeld mehr. Produktionsdaten werden über ein Pflicht-Dropdown einem Projekt zugeordnet. Wenn kein Projekt ausgewählt wurde, zeigt die App beim Speichern die Meldung **„Bitte ein Projekt auswählen.“** an.

Beim ersten Start legt die App diese Beispielprojekte lokal an:

- Projekt A
- Projekt B
- Testprojekt

Unter **„Projektverwaltung anzeigen“** befindet sich ein kompakter aufklappbarer Bereich. Dort können Projekte lokal im Browser verwaltet werden:

- Neuen Projektnamen eingeben und mit **„Projekt speichern“** anlegen.
- Bestehenden Namen im Projektfeld ändern und mit **„Umbenennen“** speichern. Bereits gespeicherte Produktionsdaten werden dabei auf den neuen Projektnamen umgestellt und bleiben erhalten.
- Projekte mit **„Archivieren“** ausblenden. Archivierte Projekte erscheinen nicht mehr im Eingabe-Dropdown, bleiben aber in der Projektverwaltung und in bestehenden Produktionsdaten erhalten.
- Archivierte Projekte können über **„Aktivieren“** wieder im Dropdown sichtbar gemacht werden.

Die Projektliste wird in `localStorage` gespeichert. Pro Projekt speichert die App den Projektnamen, den Status `active`/`archived` und das Erstellungsdatum. Beim Laden prüft die App zusätzlich vorhandene Produktionsdaten: Projektnamen aus älteren Freitext-Einträgen werden automatisch in die Projektliste übernommen, doppelte Projektnamen werden vermieden.

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

Die App zeigt und aktualisiert passend zum gewählten Projektfilter:

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


### Projektfilter

Im Dashboard gibt es einen **Projektfilter**. Der Nutzer kann **„Alle Projekte“** oder ein einzelnes Projekt auswählen. Sobald ein Projekt gewählt wird, aktualisieren sich Management-Zusammenfassung, KPI-Karten, Tagesübersicht, Summen, Tabelle, Diagramme und CSV-/TXT-Export auf die gefilterten Daten. Der Filter enthält auch Projektnamen aus alten Produktionsdaten, damit historische Einträge weiterhin auswertbar bleiben.

## CSV-Import und CSV-Export

Der CSV-Export erzeugt eine Semikolon-getrennte Datei mit allen Spalten und enthält weiterhin die Spalte **Projekt**. Ist ein einzelnes Projekt im Projektfilter ausgewählt, exportiert die App die gefilterten Einträge; bei **„Alle Projekte“** werden alle Einträge exportiert. Der Import erkennt Projektwerte aus der CSV automatisch. Wenn eine importierte CSV ein Projekt enthält, das noch nicht in der Projektliste existiert, legt die App dieses Projekt automatisch mit Status `active` an. Der Import hängt gültige importierte Zeilen an die bestehenden lokalen Daten an und berechnet danach alle Kennzahlen automatisch neu: Gutmenge, Abweichung, Zielerreichung, Zielstatus sowie – bei vollständigen OEE-Daten – Verfügbarkeit, Leistung, Qualität, OEE und OEE-Status.

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
