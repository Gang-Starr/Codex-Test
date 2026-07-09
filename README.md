# Lokale Web-App für Produktionsstückzahlen und optionale OEE

**[Deutsch](#deutsch)** | **[English](#english)** | **[Italiano](#italiano)**

---

## Deutsch

Diese Web-App ist eine einfache lokale Test-App zur täglichen Produktionsauswertung. Sie hilft dabei, Produktionsdaten zu erfassen, Einträge zu prüfen, Kennzahlen anzuzeigen und Daten als CSV-Datei weiterzugeben.

Die App unterstützt **Deutsch**, **English** und **Italiano**. Die Sprache kann oben rechts in der App umgeschaltet werden. Auch der Info-Button, Hinweise, Tabellen, Diagramme und der Footer passen sich an die gewählte Sprache an.

### Wichtige Hinweise

- Dies ist eine **offene Test-App**.
- Bitte nur **freigegebene Produktionsdaten** eingeben.
- Bitte **keine personenbezogenen Daten** eingeben.
- Daten werden in der **lokalen Browser-Speicherung** dieses Geräts gespeichert.
- Daten werden **nicht automatisch versendet**.
- Der Link zur App enthält keine Produktionsdaten und keine Stammdaten.

### Zweck der App

Die App dient zur einfachen Erfassung und Auswertung von Produktionsstückzahlen. Sie berechnet unter anderem:

- Gutmenge
- Ausschuss
- Abweichung zur Zielmenge
- Zielerreichung
- optionale OEE-Kennzahlen
- Tagesübersichten, Tabellen, Diagramme und eine kurze Management-Zusammenfassung
- Kopieren der Management-Zusammenfassung per Button für E-Mail oder Teams

### Empfohlener Ablauf

1. Produktionsdaten eingeben.
2. Eintrag speichern.
3. Einträge prüfen.
4. CSV exportieren.
5. CSV-Datei per E-Mail zurücksenden.

### Eingabe von Produktionsdaten

Für einen normalen Produktionseintrag werden diese Angaben benötigt:

- Datum
- Projekt
- Bauteil
- Maschine
- Zielmenge pro Tag
- Produzierte Stückzahl
- Ausschuss
- Kommentar, falls nötig

Ein Kommentar ist vor allem sinnvoll oder erforderlich, wenn es eine Zielabweichung, Ausschuss oder Stillstand gibt.

### Optionale OEE-Daten

OEE-Daten sind optional. Ein Eintrag kann auch ohne OEE-Daten gespeichert werden.

Für OEE können zusätzlich diese Werte eingetragen werden:

- Geplante Produktionszeit in Minuten
- Maschinenstillstand in Minuten
- Ideale Taktzeit je Stück in Sekunden

Wenn OEE-Daten fehlen, zeigt die App für OEE **n/a** an. Das bedeutet, dass keine vollständigen OEE-Daten für diesen Eintrag vorhanden sind.

### CSV-Export und CSV-Import

Über **CSV exportieren** können die gespeicherten Einträge als CSV-Datei heruntergeladen werden. Diese Datei kann anschließend manuell per E-Mail zurückgesendet werden.

Über **CSV importieren** können vorhandene CSV-Daten wieder geladen werden. Neue Projekte, Bauteile und Maschinen aus der CSV werden automatisch in die lokalen Stammdaten übernommen.

Die CSV enthält diese Kopfzeile:

```csv
Datum;Projekt;Bauteil;Maschine;Zielmenge pro Tag;Produzierte Stückzahl;Ausschuss;Geplante Produktionszeit in Minuten;Maschinenstillstand in Minuten;Ideale Taktzeit je Stück in Sekunden;Kommentar
```

### Stammdatenverwaltung

Die App verwaltet lokale Stammdaten für:

- Projekte
- Bauteile
- Maschinen

Neue Werte entstehen durch gespeicherte Produktionseinträge, manuelle Eingabe in der Stammdatenverwaltung oder durch einen CSV-Import.

In der Stammdatenverwaltung können Werte hinzugefügt, umbenannt oder gelöscht werden. Änderungen bleiben lokal im Browser gespeichert.

### Daten im Browser

Die App läuft lokal im Browser. Es gibt keine Datenbank, kein Login und keine automatische Übertragung an einen Server.

Gespeichert werden zum Beispiel:

- Produktionsdaten
- Projektliste
- Bauteilliste
- Maschinenliste
- Filter und App-Zustände
- gewählte Sprache

Die Daten bleiben nur in diesem Browserprofil auf diesem Gerät erhalten.

### App zurücksetzen

Im Gefahrenbereich gibt es die Funktion **App zurücksetzen**. Damit werden die lokal gespeicherten App-Daten dieses Browsers gelöscht.

Der Reset kann nicht rückgängig gemacht werden. Vor dem Löschen zeigt die App einen Sicherheitsdialog an.

### Info-Button in der App

Im Header der App gibt es den Button **ⓘ Info / Anleitung**. Er öffnet ein kurzes Info-Fenster mit den wichtigsten Nutzungshinweisen.

Das Info-Fenster erklärt unter anderem:

- den Ablauf von Eingabe bis CSV-Rücksendung
- die offene Test-App
- den Umgang mit freigegebenen Produktionsdaten
- dass keine personenbezogenen Daten eingegeben werden sollen
- die lokale Speicherung im Browser
- CSV-Export und CSV-Import
- optionale OEE-Daten
- das Zurücksetzen der App

### Sprache

Die App unterstützt die Sprachen:

- Deutsch
- English
- Italiano

Die Sprachwahl befindet sich oben rechts im Header. Die gewählte Sprache wird lokal im Browser gespeichert.

### Footer

Im Footer steht der Hinweis:

**Production Tracking App · Concept & Prototype by JSE · 2026 · Dokumentation**

Der Dokumentationslink öffnet diese README-Datei.

### Lokal starten

1. Ordner lokal öffnen.
2. `index.html` per Doppelklick im Browser öffnen.
3. Produktionsdaten erfassen, prüfen, importieren oder exportieren.

Optional kann ein lokaler Webserver verwendet werden:

```bash
python3 -m http.server 8000
```

Danach im Browser `http://localhost:8000` öffnen.

---

## English

This web app is a simple local test app for daily production analysis. It helps users enter production data, check entries, view key figures, and share data as a CSV file.

The app supports **Deutsch**, **English**, and **Italiano**. The language can be changed in the top-right area of the app. The info button, messages, tables, charts, and footer follow the selected language.

### Important notes

- This is an **open test app**.
- Only enter **approved production data**.
- Do **not** enter personal data.
- Data is stored in the **Local browser storage** of this device.
- Data is **not sent automatically**.
- The app link does not contain production data or master data.

### Purpose of the app

The app is used to enter and review production quantities in a simple way. It calculates, for example:

- good quantity
- scrap
- deviation from the target quantity
- target achievement
- optional OEE key figures
- daily overviews, tables, charts, and a short management summary
- copying the management summary via button for email or Teams

### Recommended process

1. Enter production data.
2. Save the entry.
3. Check the entries.
4. Export CSV.
5. Send the CSV file back by e-mail.

### Entering production data

For a normal production entry, these fields are needed:

- date
- project
- part
- machine
- target quantity per day
- produced quantity
- scrap
- comment, if needed

A comment is especially useful or required when there is a target deviation, scrap, or downtime.

### Optional OEE data

OEE data is optional. An entry can also be saved without OEE data.

For OEE, these values can be added:

- planned production time in minutes
- machine downtime in minutes
- ideal cycle time per piece in seconds

If OEE data is missing, the app shows **n/a** for OEE. This means that no complete OEE data is available for this entry.

### CSV export and CSV import

Use **CSV export** to download the saved entries as a CSV file. This file can then be sent back manually by e-mail.

Use **CSV import** to load existing CSV data again. New projects, parts, and machines from the CSV are added automatically to the local master data.

The CSV contains this header:

```csv
Date;Project;Part;Machine;Target quantity per day;Produced quantity;Scrap;Planned production time in minutes;Machine downtime in minutes;Ideal cycle time per piece in seconds;Comment
```

### Master data management

The app manages local master data for:

- projects
- parts
- machines

New values are created through saved production entries, manual input in master data management, or CSV import.

In master data management, values can be added, renamed, or deleted. Changes remain stored locally in the browser.

### Data in the browser

The app runs locally in the browser. There is no database, no login, and no automatic transfer to a server.

For example, the app stores:

- production data
- project list
- part list
- machine list
- filters and app states
- selected language

The data remains only in this browser profile on this device.

### Reset app

In the danger zone, there is the **Reset app** function. It deletes the locally stored app data in this browser.

The reset cannot be undone. Before deleting data, the app shows a safety dialog.

### Info button in the app

In the app header, there is the **ⓘ Info / Guide** button. It opens a short info window with the most important usage notes.

The info window explains, for example:

- the process from entry to CSV return
- the open test app
- how to handle approved production data
- that no personal data should be entered
- local storage in the browser
- CSV export and CSV import
- optional OEE data
- how to reset the app

### Language

The app supports these languages:

- Deutsch
- English
- Italiano

The language selector is in the top-right area of the header. The selected language is stored locally in the browser.

### Footer

The footer shows this note:

**Production Tracking App · Concept & Prototype by JSE · 2026 · Documentation**

The documentation link opens this README file.

### Start locally

1. Open the folder locally.
2. Open `index.html` in the browser by double-clicking it.
3. Enter, check, import, or export production data.

Optionally, a local web server can be used:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in the browser.

---

## Italiano

Questa web app è una semplice app di test locale per l'analisi giornaliera della produzione. Aiuta gli utenti a inserire dati di produzione, controllare le voci, vedere gli indicatori e condividere i dati come file CSV.

L'app supporta **Deutsch**, **English** e **Italiano**. La lingua può essere cambiata in alto a destra nell'app. Il pulsante info, i messaggi, le tabelle, i grafici e il footer seguono la lingua selezionata.

### Note importanti

- Questa è una **app di test aperta**.
- Inserire solo **dati di produzione approvati**.
- Non inserire **dati personali**.
- I dati sono salvati nella **Memoria locale del browser** di questo dispositivo.
- I dati **non vengono inviati automaticamente**.
- Il link dell'app non contiene dati di produzione o dati anagrafici.

### Scopo dell'app

L'app serve per inserire e controllare in modo semplice le quantità di produzione. Calcola, per esempio:

- quantità buona
- scarto
- differenza rispetto alla quantità target
- raggiungimento del target
- indicatori OEE opzionali
- riepiloghi giornalieri, tabelle, grafici e un breve riepilogo per il management
- copia del riepilogo per il management tramite pulsante per e-mail o Teams

### Procedura consigliata

1. Inserire i dati di produzione.
2. Salvare la voce.
3. Controllare le voci.
4. Esporta CSV.
5. Inviare il file CSV via e-mail.

### Inserimento dei dati di produzione

Per una normale voce di produzione sono necessari questi campi:

- data
- progetto
- componente
- macchina
- quantità target al giorno
- quantità prodotta
- scarto
- commento, se necessario

Un commento è particolarmente utile o richiesto quando ci sono una differenza dal target, scarto o fermo macchina.

### Dati OEE opzionali

I dati OEE sono opzionali. Una voce può essere salvata anche senza dati OEE.

Per l'OEE si possono inserire anche questi valori:

- tempo di produzione pianificato in minuti
- fermo macchina in minuti
- tempo ciclo ideale per pezzo in secondi

Se mancano dati OEE, l'app mostra **n/a** per OEE. Questo significa che per questa voce non sono disponibili dati OEE completi.

### Esporta CSV e Importa CSV

Usare **Esporta CSV** per scaricare le voci salvate come file CSV. Questo file può poi essere inviato manualmente via e-mail.

Usare **Importa CSV** per caricare di nuovo dati CSV esistenti. Nuovi progetti, componenti e macchine dal CSV vengono aggiunti automaticamente ai dati anagrafici locali.

Il CSV contiene questa intestazione:

```csv
Data;Progetto;Componente;Macchina;Quantità target al giorno;Quantità prodotta;Scarto;Tempo di produzione pianificato in minuti;Fermo macchina in minuti;Tempo ciclo ideale per pezzo in secondi;Commento
```

### Gestione dei dati anagrafici

L'app gestisce dati anagrafici locali per:

- progetti
- componenti
- macchine

Nuovi valori vengono creati tramite voci di produzione salvate, inserimento manuale nella gestione dei dati anagrafici o Importa CSV.

Nella gestione dei dati anagrafici, i valori possono essere aggiunti, rinominati o eliminati. Le modifiche restano salvate localmente nel browser.

### Dati nel browser

L'app funziona localmente nel browser. Non ci sono database, login o trasferimento automatico a un server.

Per esempio, l'app salva:

- dati di produzione
- lista progetti
- lista componenti
- lista macchine
- filtri e stati dell'app
- lingua selezionata

I dati restano solo in questo profilo del browser su questo dispositivo.

### Ripristina app

Nell'area di pericolo è disponibile la funzione **Ripristina app**. Questa funzione elimina i dati dell'app salvati localmente in questo browser.

Il ripristino non può essere annullato. Prima di eliminare i dati, l'app mostra una finestra di sicurezza.

### Pulsante info nell'app

Nell'header dell'app c'è il pulsante **ⓘ Info / Guida**. Apre una breve finestra info con le indicazioni più importanti per l'uso.

La finestra info spiega, per esempio:

- la procedura dall'inserimento al ritorno del CSV
- l'app di test aperta
- come gestire i dati di produzione approvati
- che non devono essere inseriti dati personali
- la memoria locale nel browser
- Esporta CSV e Importa CSV
- dati OEE opzionali
- come ripristinare l'app

### Lingua

L'app supporta queste lingue:

- Deutsch
- English
- Italiano

Il selettore della lingua si trova in alto a destra nell'header. La lingua selezionata viene salvata localmente nel browser.

### Footer

Nel footer appare questa nota:

**Production Tracking App · Concept & Prototype by JSE · 2026 · Documentazione**

Il link alla documentazione apre questo file README.

### Avvio locale

1. Aprire la cartella localmente.
2. Aprire `index.html` nel browser con un doppio clic.
3. Inserire, controllare, importare o esportare dati di produzione.

In alternativa si può usare un web server locale:

```bash
python3 -m http.server 8000
```

Poi aprire `http://localhost:8000` nel browser.
