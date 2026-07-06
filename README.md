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

Die Felder **Projekt**, **Bauteil** und **Maschine** sind kombinierte Eingabefelder mit `datalist`-Vorschlägen. Sie können einen vorhandenen Wert auswählen oder frei einen neuen Wert eintippen. Die Felder bleiben Pflichtfelder. Bei fehlenden Angaben meldet die App verständlich:

- **„Bitte ein Projekt eingeben oder auswählen.“**
- **„Bitte ein Bauteil eingeben oder auswählen.“**
- **„Bitte eine Maschine eingeben oder auswählen.“**

Beim Speichern eines Produktionseintrags werden Projekt, Bauteil und Maschine bereinigt: Leerzeichen am Anfang und Ende werden entfernt, mehrere Leerzeichen werden zusammengefasst und doppelte Stammdaten werden unabhängig von Groß-/Kleinschreibung vermieden. Neue Werte werden automatisch in die jeweilige Stammdatenliste übernommen und stehen beim nächsten Eintrag wieder als Vorschlag bereit.

Beim ersten Start legt die App diese Beispielwerte lokal an:

**Projekte**

- Projekt A
- Projekt B
- Testprojekt

**Bauteile**

- Bauteil A
- Bauteil B
- Gehäuse
- Sleeve
- Cartridge Holder

**Maschinen**

- Maschine 1
- Maschine 2
- M-01
- OP-711
- OP-714

Im aufklappbaren Bereich **„Stammdaten verwalten“** werden drei kompakte Karten angezeigt: **Projekte**, **Bauteile** und **Maschinen**. Dort können Werte zusätzlich manuell hinzugefügt, umbenannt, archiviert und wieder aktiviert werden.

### Umbenennen

Zum Umbenennen wird der Name direkt in der jeweiligen Stammdatenzeile geändert und mit **„Umbenennen“** gespeichert. Die App verhindert doppelte Werte. Bestehende Produktionsdaten mit dem alten Namen werden automatisch auf den neuen Namen aktualisiert, damit Auswertungen, Filter, CSV-Export und historische Einträge konsistent bleiben.

### Archivieren und wieder aktivieren

Mit **„Archivieren“** wird ein Stammdatenwert ausgeblendet, ohne Produktionsdaten zu löschen. Archivierte Werte erscheinen nicht mehr als Vorschlag in der Eingabemaske, bleiben aber in alten Produktionsdaten, Tabellen, Filtern und Auswertungen erhalten. Über **„Aktivieren“** kann ein archivierter Wert wieder als Vorschlag verfügbar gemacht werden.

Projektliste, Bauteilliste, Maschinenliste, Archivstatus, Änderungsdatum und Produktionsdaten werden in `localStorage` gespeichert. Beim Laden prüft die App vorhandene Produktionsdaten automatisch und übernimmt darin enthaltene Projekt-, Bauteil- und Maschinenwerte in die passenden Stammdatenlisten, sofern sie dort noch nicht vorhanden sind. Alle Daten bleiben lokal im Browserprofil des genutzten Geräts.

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
