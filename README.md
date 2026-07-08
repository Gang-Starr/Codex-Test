# Lokale Web-App für Produktionsstückzahlen und optionale OEE

Diese Web-App ist eine einfache lokale Test-App zur täglichen Produktionsauswertung. Sie erfasst Stückzahlen im Browser, berechnet Gutmenge, Ausschuss, Abweichung, Zielerreichung, optionale OEE-Kennzahlen, KPI-Karten, Tabellen, Diagramme und eine Management-Zusammenfassung. Nutzer sollen Produktionsdaten eintragen, die Einträge prüfen, die Daten als CSV exportieren und die CSV-Datei per E-Mail zurücksenden.

Die App läuft vollständig lokal im Browser. Es gibt keine Datenbank, kein Login und keine Server-Komponente. Daten werden im `localStorage` des jeweiligen Browsers gespeichert und bleiben nur auf diesem Gerät bzw. in diesem Browserprofil erhalten. Der Link selbst enthält keine Benutzerdaten und transportiert keine Produktions- oder Stammdaten.

> Wichtig: Die App zeigt im oberen Header-Bereich einen dezenten, gut lesbaren Hinweis: **„Offene Test-App – nur freigegebene Produktionsdaten eingeben. Keine personenbezogenen Daten.“** Auf Englisch lautet der Hinweis: **“Open test app – only enter approved production data. No personal data.”** Der Hinweis wechselt mit der Sprachauswahl Deutsch / English.

## Dateien

- `index.html` – Struktur der Eingabemaske, Auswertungen, Dashboard, Tabelle und Bedienelemente
- `style.css` – modernes, responsives Layout für Desktop, Tablet und Smartphone
- `script.js` – Speicherung, Projektverwaltung, Validierung, Berechnungen, CSV-Import/-Export, TXT-Export und Canvas-Diagramme
- `README.md` – Beschreibung und Bedienhinweise


## Sprache Deutsch / Englisch

Die App unterstützt eine lokale Sprachauswahl für **Deutsch** und **Englisch**. Die Auswahl befindet sich oben rechts im blauen Header. Deutsch ist die Standardsprache. Wenn auf Englisch gewechselt wird, werden sichtbare Oberflächentexte, der Header-Hinweis zur offenen Test-App, der Footer-Autorenhinweis, Hinweise, Fehlermeldungen, Tabellenbeschriftungen, Diagrammtexte und die Management-Zusammenfassung auf Englisch angezeigt. Beim Wechsel zurück werden die Texte wieder auf Deutsch dargestellt.

Die gewählte Sprache wird im `localStorage` des Browsers gespeichert. Nach einem Neuladen wird automatisch die zuletzt gewählte Sprache geladen. Der `change`-Listener des Sprach-Dropdowns speichert die neue Auswahl, ruft die Übersetzungsfunktion auf und rendert die dynamischen Bereiche neu. Dadurch werden Header, Eingabemaske, KPI-Karten, Management-Zusammenfassung, Tagesübersicht, Stammdatenlisten, Filter, Diagramme, Tabelle und Footer sofort in der gewählten Sprache aktualisiert.

Es wird keine externe Übersetzungsbibliothek verwendet; die Übersetzungen liegen lokal in `script.js`. Auch das Zahlenformat folgt der gewählten Sprache: Deutsch nutzt Komma als Dezimaltrennzeichen, Englisch nutzt Punkt als Dezimaltrennzeichen.

Die App funktioniert weiterhin vollständig lokal ohne Server, Login oder Datenbank. Produktionsdaten, Stammdaten und die Sprachwahl bleiben im jeweiligen Browserprofil gespeichert.

## Info-Button in der App

Direkt im Header der App befindet sich oberhalb der Sprachauswahl ein Info-Button. Auf Deutsch lautet er **„ⓘ Info / Anleitung“**, auf Englisch **“ⓘ Info / Guide”**. Er öffnet ein kompaktes Info-Fenster mit den wichtigsten Nutzungshinweisen, damit Nutzer auch dann ohne zusätzliche Dokumente starten können, wenn sie nur den App-Link erhalten haben.

Das Info-Fenster erklärt kurz:

- den Ablauf vom Eingeben der Produktionsdaten über Speichern, Prüfen und CSV-Export bis zur manuellen Rücksendung per E-Mail,
- wichtige Hinweise zur offenen Test-App, zu freigegebenen Produktionsdaten und zum Verzicht auf personenbezogene Daten,
- dass die App Daten lokal im Browser dieses Geräts speichert,
- dass die App keine Daten automatisch versendet,
- dass OEE-Daten optional sind und fehlende OEE-Kennzahlen als `n/a` erscheinen,
- wie CSV-Export und CSV-Import verwendet werden,
- dass **„App zurücksetzen“** alle lokal gespeicherten Daten dieses Browsers löscht und nicht rückgängig gemacht werden kann.

CSV-Dateien müssen weiterhin manuell über **„CSV exportieren“** heruntergeladen und anschließend per E-Mail zurückgesendet werden. Über **„CSV importieren“** können vorhandene CSV-Daten wieder geladen werden. Der Info-Button und der gesamte Info-Text wechseln mit der bestehenden Sprachauswahl Deutsch / English.

## Pflichtfelder für die normale Stückzahlauswertung

Diese Felder werden für jeden Eintrag benötigt. Die normale Stückzahlauswertung funktioniert immer, auch wenn keine OEE-Daten erfasst werden:

- Datum
- Projekt (freie Eingabe oder Auswahl aus vorhandenen lokalen Stammdaten)
- Bauteil (freie Eingabe oder Auswahl aus vorhandenen lokalen Stammdaten)
- Maschine (freie Eingabe oder Auswahl aus vorhandenen lokalen Stammdaten)
- Zielmenge pro Tag (muss größer als 0 sein)
- Produzierte Stückzahl (muss größer oder gleich 0 sein)
- Ausschuss (darf nicht größer als die produzierte Stückzahl sein)
- Kommentar (grundsätzlich optional; bei Zielabweichung, Ausschuss oder Stillstand ist ein kurzer Kommentar erforderlich)

Berechnungen:

- **Gutmenge** = Produzierte Stückzahl − Ausschuss
- **Abweichung** = Gutmenge − Zielmenge
- **Zielerreichung in Prozent** = Gutmenge / Zielmenge × 100

Kommentarlogik:

- Das Kommentarfeld ist grundsätzlich optional.
- Ein kurzer Kommentar ist erforderlich, wenn ein Eintrag auffällig ist: Zielerreichung < 90 %, Abweichung < 0, Ausschuss > 0 oder Maschinenstillstand > 0.
- Beim Speichern und bei „Daten prüfen“ weist die App auf fehlende Kommentare zu solchen Auffälligkeiten hin.

Statuslogik Zielerreichung:

- Grün: Zielerreichung >= 100 %
- Gelb: Zielerreichung >= 90 % und < 100 %
- Rot: Zielerreichung < 90 %
- Grau: keine vollständigen oder gültigen Daten für eine Bewertung


## Stammdatenverwaltung für Projekt, Bauteil und Maschine

Die App startet ohne Beispiel-Stammdaten. Beim ersten Öffnen in einem neuen Browserprofil sind Produktionsdaten, Projektliste, Bauteilliste und Maschinenliste leer. Im Bereich **„Stammdaten verwalten“** erscheinen dann die Hinweise **„Keine Projekte vorhanden“**, **„Keine Bauteile vorhanden“** und **„Keine Maschinen vorhanden“**.

Stammdaten entstehen nur durch echte Nutzereingaben: beim Speichern eines Produktionseintrags, durch manuelles Hinzufügen im Bereich **„Stammdaten verwalten“** oder durch einen CSV-Import. Vorhandene Daten aus `localStorage` werden weiterhin geladen und nicht automatisch gelöscht.

Die Felder **Projekt**, **Bauteil** und **Maschine** sind kombinierte Eingabefelder mit `datalist`-Vorschlägen. Sie können einen vorhandenen Wert auswählen oder frei einen neuen Wert eintippen. Die Felder bleiben Pflichtfelder. Bei fehlenden Angaben meldet die App verständlich:

- **„Bitte ein Projekt eingeben oder auswählen.“**
- **„Bitte ein Bauteil eingeben oder auswählen.“**
- **„Bitte eine Maschine eingeben oder auswählen.“**

Beim Speichern eines Produktionseintrags werden Projekt, Bauteil und Maschine bereinigt: Leerzeichen am Anfang und Ende werden entfernt, mehrere Leerzeichen werden zusammengefasst und doppelte Stammdaten werden unabhängig von Groß-/Kleinschreibung vermieden. Neue Werte werden automatisch in die jeweilige Stammdatenliste übernommen und stehen beim nächsten Eintrag wieder als Vorschlag bereit.

Im aufklappbaren Bereich **„Stammdaten verwalten“** werden drei kompakte Karten angezeigt: **Projektliste**, **Bauteilliste** und **Maschinenliste**. Dort können Werte zusätzlich manuell hinzugefügt, umbenannt oder gelöscht werden. Der Button **„Löschen“** ist als kritische Aktion hervorgehoben.

### Umbenennen

Zum Umbenennen wird der Name direkt in der jeweiligen Stammdatenzeile geändert und mit **„Umbenennen“** gespeichert. Die App verhindert doppelte Werte. Bestehende Produktionsdaten mit dem alten Namen werden automatisch auf den neuen Namen aktualisiert, damit Dashboard, Auswertungen, Filter, CSV-Export und historische Einträge konsistent bleiben.

### Löschen von Stammdaten

Mit **„Löschen“** kann ein Projekt, Bauteil oder eine Maschine wirklich aus der Stammdatenliste entfernt werden. Vor jedem Löschvorgang fragt die App zur Sicherheit: **„Diesen Stammdatenwert wirklich löschen?“**

Wenn der Wert noch nicht in Produktionsdaten verwendet wird, wird nur der Stammdatenwert gelöscht. Wenn bereits Produktionsdaten vorhanden sind, zeigt die App eine Auswahl:

- **Nur aus Stammdatenliste löschen, Produktionsdaten behalten**: Der Wert verschwindet aus der Vorschlags- und Stammdatenliste. Historische Produktionsdaten bleiben unverändert und erscheinen weiterhin in Auswertungen, Tabellen, Diagrammen und CSV-Exporten.
- **Stammdatenwert und zugehörige Produktionsdaten löschen**: Der Stammdatenwert und alle Produktionsdatensätze, die diesen Wert verwenden, werden gelöscht. Danach aktualisiert die App Dashboard, KPI-Karten, Tabelle, Tagesübersicht und Diagramme automatisch.
- **Abbrechen**: Es wird nichts gelöscht; Stammdaten und Produktionsdaten bleiben unverändert.

Gelöschte Stammdatenwerte werden separat in `localStorage` gemerkt. Dadurch werden sie beim Laden der App nicht automatisch wieder aus alten Produktionsdaten in die Stammdatenliste übernommen. Neue aktive Verwendungen bleiben möglich: Wenn ein gelöschter Wert später frei eingegeben und gespeichert oder über einen neuen CSV-Import eingebracht wird, wird er wieder bewusst in die jeweilige Stammdatenliste übernommen.

Projektliste, Bauteilliste, Maschinenliste, gelöschte Stammdatenwerte, Änderungsdatum und Produktionsdaten werden in `localStorage` gespeichert. Der Bereich **„Daten verwalten“** enthält nur noch Import- und Exportfunktionen; ein vollständiges Löschen aller lokalen App-Daten ist dort bewusst nicht möglich. Der vollständige App-Reset erfolgt ausschließlich unten im **„Gefahrenbereich“** über **„App zurücksetzen“**. Beim Laden prüft die App vorhandene Produktionsdaten automatisch und übernimmt darin enthaltene Projekt-, Bauteil- und Maschinenwerte in die passenden Stammdatenlisten, sofern sie dort noch nicht vorhanden und nicht zuvor bewusst gelöscht wurden. Alle Daten bleiben lokal im Browserprofil des genutzten Geräts.

## Gefahrenbereich und sicherer App-Reset

Am Ende der App befindet sich ein deutlich abgesetzter Bereich **„Gefahrenbereich“** / **“Danger zone”**. Nur dort können Nutzer über **„App zurücksetzen“** / **“Reset app”** alle lokalen Browserdaten der App löschen. Die Funktion ist bewusst nicht im normalen Bereich **„Daten verwalten“** platziert, sondern unten auf der Seite, damit Import-/Exportaktionen klar vom vollständigen App-Reset getrennt sind.

Direkt unterhalb des Gefahrenbereichs steht der dezente Footer mit Autorenhinweis. Auf Deutsch lautet er **„Production Tracking App · Concept & Prototype by JSE · 2026“**, auf Englisch **“Production Tracking App · Concept & Prototype by JSE · 2026”**. Der Footer nutzt dieselbe lokale Übersetzungslogik aus `script.js` wie die übrigen Oberflächentexte und wechselt mit der Sprachauswahl Deutsch / English.

Die App speichert Produktionsdaten, Projekt-Stammdaten, Bauteil-Stammdaten, Maschinen-Stammdaten, gelöschte oder archivierte Stammdatenwerte und weitere app-spezifische Zustände lokal im `localStorage` dieses Browsers. Der Reset löscht alle lokalen App-Daten dieses Browsers, darunter Produktionsdaten, Stammdaten, gelöschte Stammdatenwerte, Filterzustände, Formularwerte, gespeicherte CSV-Importzustände und alle app-spezifischen `localStorage`-Keys. Die gewählte Sprache kann erhalten bleiben, damit die Oberfläche nach dem Reset weiterhin in der zuletzt ausgewählten Sprache angezeigt wird.

Der Reset kann nicht rückgängig gemacht werden. Zur Sicherheit öffnet der Button zuerst einen Bestätigungsdialog mit Warnhinweis. Der endgültige Löschbutton bleibt deaktiviert, bis exakt **`RESET`** eingegeben wurde. **„Abbrechen“** / **“Cancel”** schließt den Dialog ohne Datenverlust. Nach erfolgreichem Reset rendert die App sofort neu: Produktionsdaten, Projektliste, Bauteilliste und Maschinenliste sind leer, KPI-Karten stehen auf `0` oder `n/a`, Diagramme zeigen keine Daten und es werden keine Demo- oder Beispielwerte neu erzeugt.

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

Das Dashboard enthält responsive Canvas-Diagramme ohne externe Bibliothek. Direkt sichtbar bleiben die Standarddiagramme:

1. Gutmenge pro Tag
2. Zielmenge vs. Gutmenge pro Tag
3. Ausschuss pro Tag
4. Kumulierte Abweichung

Die OEE-Diagramme sind optional sichtbar und liegen in einem eigenen einklappbaren Bereich im Dashboard:

- OEE pro Tag (nur Einträge mit gültiger OEE-Berechnung)
- OEE-Bestandteile Verfügbarkeit, Leistung und Qualität pro Tag (nur Einträge mit gültiger OEE-Berechnung)

Der Bereich ist beim ersten Öffnen standardmäßig eingeklappt. Über **„OEE-Diagramme anzeigen“** / **„Show OEE charts“** wird er geöffnet, über **„OEE-Diagramme ausblenden“** / **„Hide OEE charts“** wieder geschlossen. Der letzte Zustand wird lokal im `localStorage` des Browsers gespeichert und nach dem Neuladen wiederhergestellt.

Wenn keine OEE-Daten vorhanden sind und der Bereich geöffnet wird, zeigen die OEE-Diagramme **„Keine OEE-Daten vorhanden“** bzw. **“No OEE data available”**.


### Dashboard-Filter

Im Dashboard gibt es Filter für **Projekt**, **Bauteil** und **Maschine**. Der Nutzer kann jeweils **„Alle Projekte“**, **„Alle Bauteile“** bzw. **„Alle Maschinen“** oder einen einzelnen Wert auswählen. Zusätzlich gibt es einen Diagrammfilter **„Zeitraum“** mit **„Alle Daten“**, **„Letzte 7 Tage“**, **„Letzte 14 Tage“**, **„Letzte 30 Tage“**, **„Aktuelle Kalenderwoche“**, **„Letzte Kalenderwoche“** und **„Benutzerdefinierter Zeitraum von/bis“**.

Für die Diagramme kann außerdem die **Darstellung** zwischen **Tageswerten**, **Wochenwerten** und **Monatswerten** gewechselt werden. Tageswerte bleiben für kurze Zeiträume gut lesbar; bei vielen Tagen zeigt die App eine Empfehlung, Wochen- oder Monatswerte zu verwenden. Wochenwerte fassen je Kalenderwoche Gutmenge, Zielmenge, Ausschuss und Abweichung als Summe zusammen. OEE, Verfügbarkeit, Leistung und Qualität werden dabei als Durchschnitt nur aus gültigen OEE-Einträgen berechnet. Monatswerte fassen die Werte entsprechend je Monat zusammen.

Zeitraum, benutzerdefinierte Von-/Bis-Daten und Darstellungsmodus werden lokal im `localStorage` gespeichert und nach einem Neuladen wiederhergestellt. Sobald ein Filter geändert wird, aktualisieren sich Management-Zusammenfassung, KPI-Karten, Tagesübersicht, Summen nach Kategorien, Tabelle, Diagramme sowie CSV-/TXT-Export auf die gefilterten Daten. Die Filter enthalten auch Werte aus alten Produktionsdaten, damit historische Einträge weiterhin auswertbar bleiben.

## CSV-Import und CSV-Export

Der Button **„CSV-Vorlage herunterladen“** erzeugt eine leere, Semikolon-getrennte CSV-Datei mit der korrekten Kopfzeile und ohne Beispielwerte. Der CSV-Export erzeugt eine Semikolon-getrennte Datei mit allen Spalten und enthält weiterhin die Spalten **Projekt**, **Bauteil** und **Maschine**. Sind Filter gesetzt, exportiert die App die entsprechend gefilterten Einträge; bei allen Filtern auf „Alle“ werden alle Einträge exportiert. Der Import erkennt Projekt-, Bauteil- und Maschinenwerte aus der CSV automatisch. Wenn eine importierte CSV neue Werte enthält, ergänzt die App diese automatisch in Projektliste, Bauteilliste bzw. Maschinenliste. Der Import hängt gültige importierte Zeilen an die bestehenden lokalen Daten an und berechnet danach alle Kennzahlen automatisch neu: Gutmenge, Abweichung, Zielerreichung, Zielstatus sowie – bei vollständigen OEE-Daten – Verfügbarkeit, Leistung, Qualität, OEE und OEE-Status.

CSV-Import funktioniert:

- mit OEE-Spalten und gefüllten OEE-Werten
- mit OEE-Spalten, aber leeren OEE-Werten
- ohne OEE-Werte in einzelnen Zeilen

Kopfzeile:

```csv
Datum;Projekt;Bauteil;Maschine;Zielmenge pro Tag;Produzierte Stückzahl;Ausschuss;Geplante Produktionszeit in Minuten;Maschinenstillstand in Minuten;Ideale Taktzeit je Stück in Sekunden;Kommentar
```

Die README enthält bewusst keine CSV-Beispieldatensätze mit Projekt-, Bauteil- oder Maschinenwerten, damit keine Demo-Stammdaten als Startwerte missverstanden werden. Für einen Import kann eine eigene CSV-Datei mit der oben genannten Kopfzeile und eigenen Produktionswerten verwendet werden.

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
