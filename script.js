const STORAGE_KEY = 'productionEntries.v2';
const LEGACY_STORAGE_KEY = 'productionEntries.v1';
const PROJECT_STORAGE_KEY = 'productionProjects.v1';
const PART_STORAGE_KEY = 'productionParts.v1';
const MACHINE_STORAGE_KEY = 'productionMachines.v1';
const DELETED_MASTER_STORAGE_KEY = 'productionDeletedMasterValues.v1';
const LANGUAGE_STORAGE_KEY = 'productionLanguage.v1';
const DEFAULT_PROJECTS = ['Projekt A', 'Projekt B', 'Testprojekt'];
const DEFAULT_PARTS = ['Bauteil A', 'Bauteil B', 'Gehäuse', 'Sleeve', 'Cartridge Holder'];
const DEFAULT_MACHINES = ['Maschine 1', 'Maschine 2', 'M-01', 'OP-711', 'OP-714'];

const translations = {
  de: {
    documentTitle: 'Produktionsstückzahlen & OEE lokal auswerten', languageAria: 'Sprache auswählen', headerEyebrow: 'Lokale Produktionsauswertung', headerTitle: 'Tägliche Produktionsstückzahlen & OEE', headerSubtitle: 'Erfassen, auswerten und exportieren – komplett lokal im Browser ohne Login, Server oder Datenbank.', languageLabel: 'Sprache:', formTitle: 'Eintrag erfassen', storageNote: 'Speicherung: localStorage', date: 'Datum', project: 'Projekt', part: 'Bauteil', machine: 'Maschine', targetPerDay: 'Zielmenge pro Tag', producedQty: 'Produzierte Stückzahl', scrap: 'Ausschuss', optionalOee: 'Optionale OEE-Daten', oeeHelp: 'Nur ausfüllen, wenn OEE berechnet werden soll.', optional: '(optional)', plannedTime: 'Geplante Produktionszeit in Minuten', downtime: 'Maschinenstillstand in Minuten', cycleTime: 'Ideale Taktzeit je Stück in Sekunden', comment: 'Kommentar', saveEntry: 'Eintrag speichern', manageMasterData: 'Stammdaten verwalten', masterNote: 'Neue Projekte, Bauteile und Maschinen werden lokal gespeichert und nach dem Neuladen wieder angeboten. Gelöschte Stammdatenwerte werden separat gemerkt und nicht automatisch aus alten Produktionsdaten wiederhergestellt.', newProject: 'Neues Projekt', newPart: 'Neues Bauteil', newMachine: 'Neue Maschine', addProject: 'Projekt hinzufügen', addPart: 'Bauteil hinzufügen', addMachine: 'Maschine hinzufügen', projectList: 'Projektliste', partList: 'Bauteilliste', machineList: 'Maschinenliste', managementSummary: 'Management-Zusammenfassung', totalGood: 'Gesamt-Gutmenge', totalScrap: 'Gesamt-Ausschuss', totalDeviation: 'Gesamt-Abweichung', avgAchievement: 'Ø Zielerreichung', avgAvailability: 'Ø Verfügbarkeit', avgPerformance: 'Ø Leistung', avgQuality: 'Ø Qualität', avgOee: 'Ø OEE aus gültigen OEE-Einträgen', oeeCount: 'Einträge mit OEE-Berechnung', noOeeCount: 'Einträge ohne OEE-Berechnung', manageData: 'Daten verwalten', exportCsv: 'CSV exportieren', exportSummary: 'Management-TXT exportieren', importCsv: 'CSV importieren', clearAll: 'Alle Daten löschen', dailyOverview: 'Tagesübersicht', categorySums: 'Summen nach Kategorien', dashboard: 'Dashboard', autoCharts: 'Automatisch aktualisierte Balkendiagramme', projectFilter: 'Projektfilter', partFilter: 'Bauteilfilter', machineFilter: 'Maschinenfilter', goodPerDay: 'Gutmenge pro Tag', targetVsGood: 'Zielmenge vs. Gutmenge pro Tag', scrapPerDay: 'Ausschuss pro Tag', oeePerDay: 'OEE pro Tag', oeePartsPerDay: 'OEE-Bestandteile pro Tag', cumulativeDeviation: 'Kumulierte Abweichung', allEntries: 'Alle Eingaben', entries: 'Einträge', noData: 'Noch keine Daten vorhanden.', noDataSummary: 'Noch keine Daten vorhanden. Erfassen oder importieren Sie Produktionsdaten, um eine Zusammenfassung zu erhalten.', allProjects: 'Alle Projekte', allParts: 'Alle Bauteile', allMachines: 'Alle Maschinen', target: 'Ziel', targetQty: 'Zielmenge', produced: 'Produziert', good: 'Gutmenge', deviation: 'Abweichung', targetPct: 'Ziel %', planTime: 'Planzeit', downtimeShort: 'Stillstand', cycleTimeShort: 'Taktzeit', availabilityShort: 'Verfüg.', action: 'Aktion', delete: 'Löschen', rename: 'Umbenennen', active: 'Aktiv', archived: 'Archiviert', changedOn: 'geändert am', goodShort: 'Gut', deviationShort: 'Abw.', noOeeData: 'Keine OEE-Daten vorhanden', invalidInput: 'Ungültige Eingabe.', noValue: 'Ohne Angabe', confirmDeleteEntry: 'Diesen Eintrag wirklich löschen?', confirmClearAll: 'Wirklich alle Daten löschen?', importSuccess: 'CSV erfolgreich importiert.', validationDate: 'Bitte geben Sie ein Datum ein.', validationProject: 'Bitte ein Projekt eingeben oder auswählen.', validationPart: 'Bitte ein Bauteil eingeben oder auswählen.', validationMachine: 'Bitte eine Maschine eingeben oder auswählen.', validationComment: 'Bitte ergänzen Sie einen Kommentar zum Eintrag.', validationRequiredNumbers: 'Bitte füllen Sie Zielmenge, produzierte Stückzahl und Ausschuss mit gültigen Zahlen aus.', validationNegative: 'Negative Werte sind nicht erlaubt. Bitte korrigieren Sie die Eingabe.', validationTargetPositive: 'Die Zielmenge pro Tag muss größer als 0 sein.', validationProducedPositive: 'Die produzierte Stückzahl muss größer oder gleich 0 sein.', validationScrapTooHigh: 'Ausschuss darf nicht größer sein als produzierte Stückzahl.', validationPlannedPositive: 'Für die OEE-Berechnung muss die geplante Produktionszeit größer als 0 Minuten sein.', validationDowntimePositive: 'Für die OEE-Berechnung muss der Maschinenstillstand größer oder gleich 0 Minuten sein.', validationCyclePositive: 'Für die OEE-Berechnung muss die ideale Taktzeit größer als 0 Sekunden sein.', validationDowntimeTooHigh: 'Maschinenstillstand darf nicht größer sein als geplante Produktionszeit.', placeholderProject: 'Projekt eingeben oder auswählen', placeholderPart: 'Bauteil eingeben oder auswählen', placeholderMachine: 'Maschine eingeben oder auswählen', placeholderPlanned: 'z. B. 480', placeholderDowntime: 'z. B. 15', placeholderCycle: 'z. B. 1,2', placeholderComment: 'Pflichtfeld: kurzer Hinweis zum Produktionstag', placeholderNewProject: 'z. B. Kundenprojekt 2026', placeholderNewPart: 'z. B. Deckel', placeholderNewMachine: 'z. B. M-02'
  },
  en: {
    documentTitle: 'Production quantities & OEE local analysis', languageAria: 'Select language', headerEyebrow: 'Local production analysis', headerTitle: 'Daily production quantities & OEE', headerSubtitle: 'Enter, analyze and export data – fully local in the browser without login, server or database.', languageLabel: 'Language:', formTitle: 'Add entry', storageNote: 'Storage: localStorage', date: 'Date', project: 'Project', part: 'Part', machine: 'Machine', targetPerDay: 'Target quantity per day', producedQty: 'Produced quantity', scrap: 'Rejected parts', optionalOee: 'Optional OEE data', oeeHelp: 'Only fill in if OEE should be calculated.', optional: '(optional)', plannedTime: 'Planned production time in minutes', downtime: 'Machine downtime in minutes', cycleTime: 'Ideal cycle time per part in seconds', comment: 'Comment', saveEntry: 'Save entry', manageMasterData: 'Manage master data', masterNote: 'New projects, parts and machines are saved locally and offered again after reload. Deleted master data values are remembered separately and not restored automatically from old production data.', newProject: 'New project', newPart: 'New part', newMachine: 'New machine', addProject: 'Add project', addPart: 'Add part', addMachine: 'Add machine', projectList: 'Project list', partList: 'Part list', machineList: 'Machine list', managementSummary: 'Management summary', totalGood: 'Total good parts', totalScrap: 'Total rejected parts', totalDeviation: 'Total deviation', avgAchievement: 'Ø target achievement', avgAvailability: 'Ø availability', avgPerformance: 'Ø performance', avgQuality: 'Ø quality', avgOee: 'Ø OEE from valid OEE entries', oeeCount: 'Entries with OEE calculation', noOeeCount: 'Entries without OEE calculation', manageData: 'Manage data', exportCsv: 'Export CSV', exportSummary: 'Export management TXT', importCsv: 'Import CSV', clearAll: 'Delete all data', dailyOverview: 'Daily overview', categorySums: 'Sums by category', dashboard: 'Dashboard', autoCharts: 'Automatically updated bar charts', projectFilter: 'Project filter', partFilter: 'Part filter', machineFilter: 'Machine filter', goodPerDay: 'Good parts per day', targetVsGood: 'Target vs. good parts per day', scrapPerDay: 'Rejected parts per day', oeePerDay: 'OEE per day', oeePartsPerDay: 'OEE parts per day', cumulativeDeviation: 'Cumulative deviation', allEntries: 'All entries', entries: 'entries', noData: 'No data available yet.', noDataSummary: 'No data available yet. Enter or import production data to get a summary.', allProjects: 'All projects', allParts: 'All parts', allMachines: 'All machines', target: 'Target', targetQty: 'Target quantity', produced: 'Produced', good: 'Good parts', deviation: 'Deviation', targetPct: 'Target %', planTime: 'Plan time', downtimeShort: 'Downtime', cycleTimeShort: 'Cycle time', availabilityShort: 'Avail.', action: 'Action', delete: 'Delete', rename: 'Rename', active: 'Active', archived: 'Archived', changedOn: 'changed on', goodShort: 'Good', deviationShort: 'Dev.', noOeeData: 'No OEE data available', invalidInput: 'Invalid input.', noValue: 'No value', confirmDeleteEntry: 'Really delete this entry?', confirmClearAll: 'Really delete all data?', importSuccess: 'CSV imported successfully.', validationDate: 'Please enter a date.', validationProject: 'Please enter or select a project.', validationPart: 'Please enter or select a part.', validationMachine: 'Please enter or select a machine.', validationComment: 'Please add a comment for the entry.', validationRequiredNumbers: 'Please enter valid numbers for target quantity, produced quantity and rejected parts.', validationNegative: 'Negative values are not allowed. Please correct the input.', validationTargetPositive: 'The target quantity per day must be greater than 0.', validationProducedPositive: 'The produced quantity must be 0 or higher.', validationScrapTooHigh: 'Rejected parts must not be greater than produced quantity.', validationPlannedPositive: 'For OEE calculation, planned production time must be greater than 0 minutes.', validationDowntimePositive: 'For OEE calculation, machine downtime must be 0 or higher.', validationCyclePositive: 'For OEE calculation, ideal cycle time must be greater than 0 seconds.', validationDowntimeTooHigh: 'Machine downtime must not be greater than planned production time.', placeholderProject: 'Enter or select project', placeholderPart: 'Enter or select part', placeholderMachine: 'Enter or select machine', placeholderPlanned: 'e.g. 480', placeholderDowntime: 'e.g. 15', placeholderCycle: 'e.g. 1.2', placeholderComment: 'Required field: short note for the production day', placeholderNewProject: 'e.g. customer project 2026', placeholderNewPart: 'e.g. cover', placeholderNewMachine: 'e.g. M-02'
  }
};
let currentLanguage = loadLanguage();
function t(key) { return translations[currentLanguage]?.[key] || translations.de[key] || key; }

function loadLanguage() {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === 'en' ? 'en' : 'de';
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = t('documentTitle');
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  languageSelect.setAttribute('aria-label', t('languageAria'));
  setPlaceholder('#project', 'placeholderProject'); setPlaceholder('#part', 'placeholderPart'); setPlaceholder('#machine', 'placeholderMachine');
  setPlaceholder('#plannedTime', 'placeholderPlanned'); setPlaceholder('#downtime', 'placeholderDowntime'); setPlaceholder('#cycleTime', 'placeholderCycle'); setPlaceholder('#comment', 'placeholderComment');
  setPlaceholder('#new-project-name', 'placeholderNewProject'); setPlaceholder('#new-part-name', 'placeholderNewPart'); setPlaceholder('#new-machine-name', 'placeholderNewMachine');
  setText('.project-panel-note', 'masterNote'); setText('.master-data-add-grid label:nth-child(1)', 'newProject'); document.querySelector('.master-data-add-grid label:nth-child(1)').append(document.querySelector('#new-project-name'));
  setText('#add-project', 'addProject'); setText('.master-data-add-grid label:nth-child(3)', 'newPart'); document.querySelector('.master-data-add-grid label:nth-child(3)').append(document.querySelector('#new-part-name'));
  setText('#add-part', 'addPart'); setText('.master-data-add-grid label:nth-child(5)', 'newMachine'); document.querySelector('.master-data-add-grid label:nth-child(5)').append(document.querySelector('#new-machine-name'));
  setText('#add-machine', 'addMachine');
  setText('#projects-master-title', 'projectList'); setText('#parts-master-title', 'partList'); setText('#machines-master-title', 'machineList');
  setText('#export-csv', 'exportCsv'); setText('#export-summary', 'exportSummary'); setText('.file-button', 'importCsv'); setText('#clear-all', 'clearAll');
  setText('.tab[data-tab="project"]', 'project'); setText('.tab[data-tab="part"]', 'part'); setText('.tab[data-tab="machine"]', 'machine');
  setText('.dashboard-filter-card label:nth-child(1)', 'projectFilter'); setText('.dashboard-filter-card label:nth-child(2)', 'partFilter'); setText('.dashboard-filter-card label:nth-child(3)', 'machineFilter');
  document.querySelector('.dashboard-filter-card label:nth-child(1)').append(projectFilter);
  document.querySelector('.dashboard-filter-card label:nth-child(2)').append(partFilter);
  document.querySelector('.dashboard-filter-card label:nth-child(3)').append(machineFilter);
  ['goodPerDay','targetVsGood','scrapPerDay','oeePerDay','oeePartsPerDay','cumulativeDeviation'].forEach((key, index) => setText(`.chart-card:nth-child(${index + 1}) h3`, key));
  document.querySelectorAll('.kpi span').forEach((element, index) => { const keys = ['totalGood','totalScrap','totalDeviation','avgAchievement','avgAvailability','avgPerformance','avgQuality','avgOee','oeeCount','noOeeCount']; element.textContent = t(keys[index]); });
  const headers = ['target','OEE','date','project','part','machine','targetQty','produced','scrap','good','deviation','targetPct','planTime','downtimeShort','cycleTimeShort','availabilityShort','avgPerformance','avgQuality','OEE %','comment','action'];
  document.querySelectorAll('th').forEach((th, index) => { th.textContent = t(headers[index]); });
}
function setText(selector, key) { const element = document.querySelector(selector); if (element) element.childNodes[0].nodeValue = t(key); }
function setPlaceholder(selector, key) { const element = document.querySelector(selector); if (element) element.placeholder = t(key); }

const CSV_HEADER = ['Datum','Projekt','Bauteil','Maschine','Zielmenge pro Tag','Produzierte Stückzahl','Ausschuss','Geplante Produktionszeit in Minuten','Maschinenstillstand in Minuten','Ideale Taktzeit je Stück in Sekunden','Kommentar'];
const requiredNumberFields = ['target','produced','scrap'];
const oeeNumberFields = ['plannedTime','downtime','cycleTime'];
const NA_LABEL = 'n/a';
const charts = {
  good: document.querySelector('#good-chart'), target: document.querySelector('#target-chart'), scrap: document.querySelector('#scrap-chart'),
  oee: document.querySelector('#oee-chart'), oeeParts: document.querySelector('#oee-parts-chart'), cumulative: document.querySelector('#cumulative-deviation-chart')
};
const form = document.querySelector('#production-form');
const formError = document.querySelector('#form-error');
const entriesBody = document.querySelector('#entries-body');
const importInput = document.querySelector('#import-csv');
const projectInput = document.querySelector('#project');
const partInput = document.querySelector('#part');
const machineInput = document.querySelector('#machine');
const projectOptions = document.querySelector('#project-options');
const partOptions = document.querySelector('#part-options');
const machineOptions = document.querySelector('#machine-options');
const projectFilter = document.querySelector('#project-filter');
const partFilter = document.querySelector('#part-filter');
const machineFilter = document.querySelector('#machine-filter');
const languageSelect = document.querySelector('#language-select');
let entries = loadEntries();
let deletedMasterValues = loadDeletedMasterValues();
let projects = loadProjects();
let parts = loadMasterValues('part', PART_STORAGE_KEY, DEFAULT_PARTS);
let machines = loadMasterValues('machine', MACHINE_STORAGE_KEY, DEFAULT_MACHINES);
let selectedProjectFilter = 'ALL';
let selectedPartFilter = 'ALL';
let selectedMachineFilter = 'ALL';
let activeGroup = 'project';
syncMasterDataFromEntries();
languageSelect.value = currentLanguage;

document.querySelector('#date').valueAsDate = new Date();
form.addEventListener('submit', saveEntry);
document.querySelector('#clear-all').addEventListener('click', clearAllEntries);
document.querySelector('#export-csv').addEventListener('click', exportCsv);
document.querySelector('#export-summary').addEventListener('click', exportManagementSummary);
importInput.addEventListener('change', importCsv);
languageSelect.addEventListener('change', () => { currentLanguage = languageSelect.value; localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage); applyTranslations(); renderMasterData(); render(); });
projectFilter.addEventListener('change', () => { selectedProjectFilter = projectFilter.value; render(); });
partFilter.addEventListener('change', () => { selectedPartFilter = partFilter.value; render(); });
machineFilter.addEventListener('change', () => { selectedMachineFilter = machineFilter.value; render(); });
document.querySelector('#add-project').addEventListener('click', addProjectFromInput);
document.querySelector('#add-part').addEventListener('click', () => addMasterValueFromInput('part'));
document.querySelector('#add-machine').addEventListener('click', () => addMasterValueFromInput('machine'));
document.querySelector('#project-list').addEventListener('click', (event) => handleMasterAction(event, 'project'));
document.querySelector('#part-list').addEventListener('click', (event) => handleMasterAction(event, 'part'));
document.querySelector('#machine-list').addEventListener('click', (event) => handleMasterAction(event, 'machine'));
document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => switchTab(tab)));
entriesBody.addEventListener('click', (event) => {
  const button = event.target.closest('[data-delete-id]');
  if (button) deleteEntry(button.dataset.deleteId);
});
window.addEventListener('resize', () => renderCharts(filteredRows()));
applyTranslations();
renderMasterData();
render();

function saveEntry(event) {
  event.preventDefault();
  formError.textContent = '';
  const entry = {
    id: createId(), date: getValue('date'), project: getValue('project'), part: getValue('part'), machine: getValue('machine'),
    target: getNumber('target'), produced: getNumber('produced'), scrap: getNumber('scrap'), plannedTime: getOptionalNumber('plannedTime'),
    downtime: getOptionalNumber('downtime'), cycleTime: getOptionalNumber('cycleTime'), comment: getValue('comment')
  };
  const validationError = validateEntry(entry);
  if (validationError) { formError.textContent = validationError; return; }
  entry.project = ensureMasterValue('project', entry.project, true);
  entry.part = ensureMasterValue('part', entry.part, true);
  entry.machine = ensureMasterValue('machine', entry.machine, true);
  persistMasterData();
  persistDeletedMasterValues();
  entries.push(entry);
  persistEntries();
  form.reset();
  document.querySelector('#date').valueAsDate = new Date();
  document.querySelector('#scrap').value = 0;
  renderMasterData();
  render();
}

function validateEntry(entry) {
  if (!entry.date) return t('validationDate');
  if (!entry.project) return t('validationProject');
  if (!entry.part) return t('validationPart');
  if (!entry.machine) return t('validationMachine');
  if (!entry.comment) return t('validationComment');
  if (requiredNumberFields.some((field) => !Number.isFinite(entry[field]))) return t('validationRequiredNumbers');
  if (requiredNumberFields.some((field) => entry[field] < 0) || oeeNumberFields.some((field) => entry[field] !== null && entry[field] < 0)) return t('validationNegative');
  if (entry.target <= 0) return t('validationTargetPositive');
  if (entry.produced < 0) return t('validationProducedPositive');
  if (entry.scrap > entry.produced) return t('validationScrapTooHigh');

  const filledOeeFields = oeeNumberFields.filter((field) => entry[field] !== null);
  if (filledOeeFields.length === oeeNumberFields.length) {
    if (entry.plannedTime <= 0) return t('validationPlannedPositive');
    if (entry.downtime < 0) return t('validationDowntimePositive');
    if (entry.cycleTime <= 0) return t('validationCyclePositive');
    if (entry.downtime > entry.plannedTime) return t('validationDowntimeTooHigh');
  }
  return '';
}

function enrich(entry) {
  const normalized = normalizeEntry(entry);
  const good = normalized.produced - normalized.scrap;
  const deviation = good - normalized.target;
  const achievement = normalized.target > 0 ? (good / normalized.target) * 100 : null;
  const hasCompleteOeeData = oeeNumberFields.every((field) => normalized[field] !== null);
  const hasValidOeeData = hasCompleteOeeData && normalized.plannedTime > 0 && normalized.downtime >= 0 && normalized.cycleTime > 0 && normalized.downtime <= normalized.plannedTime;
  const runtime = hasValidOeeData ? normalized.plannedTime - normalized.downtime : null;
  const availability = hasValidOeeData ? (runtime / normalized.plannedTime) * 100 : null;
  const theoretical = hasValidOeeData ? (runtime * 60) / normalized.cycleTime : null;
  const performance = hasValidOeeData && theoretical > 0 ? (normalized.produced / theoretical) * 100 : null;
  const quality = hasValidOeeData && normalized.produced > 0 ? (good / normalized.produced) * 100 : null;
  const oee = [availability, performance, quality].every(isCalculable) ? (availability * performance * quality) / 10000 : null;
  return { ...normalized, good, deviation, achievement, hasValidOeeData, runtime, theoretical, availability, performance, quality, oee, targetStatus: targetStatus(achievement), oeeStatus: oeeStatus(oee), oeeWarning: isCalculable(oee) && oee > 100 };
}

function normalizeEntry(entry) {
  return { ...entry, project: normalizeText(entry.project), part: normalizeText(entry.part), machine: normalizeText(entry.machine), target: toNumber(entry.target), produced: toNumber(entry.produced), scrap: toNumber(entry.scrap), plannedTime: toOptionalNumber(entry.plannedTime), downtime: toOptionalNumber(entry.downtime), cycleTime: toOptionalNumber(entry.cycleTime) };
}

function render() {
  renderMasterOptions();
  const rows = filteredRows();
  renderTable(rows); renderTotals(rows); renderDailyOverview(rows); renderGroupSummary(rows); renderManagementSummary(rows); renderCharts(rows);
  document.querySelector('#entry-count').textContent = `${rows.length} ${t('entries')}`;
}
function enrichedRows() { return entries.map(enrich).sort((a, b) => a.date.localeCompare(b.date)); }
function filteredRows() {
  return enrichedRows().filter((row) =>
    (selectedProjectFilter === 'ALL' || row.project === selectedProjectFilter) &&
    (selectedPartFilter === 'ALL' || row.part === selectedPartFilter) &&
    (selectedMachineFilter === 'ALL' || row.machine === selectedMachineFilter)
  );
}

function renderTable(rows) {
  entriesBody.innerHTML = rows.map((e) => `
    <tr class="${e.oeeWarning ? 'warning-row' : ''}">
      <td>${statusDot(e.targetStatus, targetStatusLabel(e.targetStatus))}</td><td>${statusDot(e.oeeStatus, oeeStatusLabel(e.oeeStatus))}${e.oeeWarning ? '<span class="hint">&gt;100%</span>' : ''}</td>
      <td>${escapeHtml(formatDate(e.date))}</td><td>${escapeHtml(e.project)}</td><td>${escapeHtml(e.part)}</td><td>${escapeHtml(e.machine)}</td>
      <td>${formatNumber(e.target)}</td><td>${formatNumber(e.produced)}</td><td>${formatNumber(e.scrap)}</td><td>${formatNumber(e.good)}</td><td>${formatNumber(e.deviation)}</td><td>${formatPercent(e.achievement)}</td>
      <td>${formatOptionalNumber(e.plannedTime)}</td><td>${formatOptionalNumber(e.downtime)}</td><td>${formatOptionalNumber(e.cycleTime)}</td><td>${formatOeePercent(e.availability)}</td><td>${formatOeePercent(e.performance)}</td><td>${formatOeePercent(e.quality)}</td><td>${formatOeePercent(e.oee)}</td>
      <td>${escapeHtml(e.comment || '-')}</td><td><button class="delete-row" data-delete-id="${e.id}" type="button">${t('delete')}</button></td>
    </tr>`).join('') || `<tr><td colspan="21">${t('noData')}</td></tr>`;
}

function renderTotals(rows) {
  const totals = sumRows(rows);
  setKpiText('#total-good', formatNumber(totals.good)); setKpiText('#total-scrap', formatNumber(totals.scrap)); setKpiText('#total-deviation', formatNumber(totals.deviation));
  setKpiPercent('#avg-achievement', avg(rows, 'achievement')); setKpiPercent('#avg-availability', avg(rows, 'availability'));
  setKpiPercent('#avg-performance', avg(rows, 'performance')); setKpiPercent('#avg-quality', avg(rows, 'quality')); setKpiPercent('#avg-oee', avg(rows, 'oee'));
  setKpiText('#oee-count', formatNumber(rows.filter((r) => r.hasValidOeeData).length)); setKpiText('#no-oee-count', formatNumber(rows.filter((r) => !r.hasValidOeeData).length));
}

function renderDailyOverview(rows) {
  document.querySelector('#daily-overview').innerHTML = dailyRows(rows).map((day) => summaryItem(formatDate(day.date), day, `${day.count} ${t('entries')}`)).join('') || emptyState(t('noData'));
}
function renderGroupSummary(rows) {
  const grouped = groupBy(rows, activeGroup);
  document.querySelector('#group-summary').innerHTML = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([name, items]) => summaryItem(name, aggregate(items), `${items.length} ${t('entries')}`)).join('') || emptyState(t('noData'));
}
function summaryItem(title, totals, subtitle) {
  return `<div class="summary-item"><div><strong>${escapeHtml(title)}</strong><br><small>${subtitle} · ${t('target')} ${formatPercent(totals.achievement)} · OEE ${formatPercent(totals.oee)}</small></div><div>${t('goodShort')}: <strong>${formatNumber(totals.good)}</strong><br><small>${t('scrap')} ${formatNumber(totals.scrap)}, ${t('deviationShort')} ${formatNumber(totals.deviation)}</small></div></div>`;
}
function renderManagementSummary(rows) { document.querySelector('#management-summary').textContent = buildManagementSummary(rows); }
function buildManagementSummary(rows) {
  if (!rows.length) return t('noDataSummary');
  const totals = aggregate(rows), redTargets = rows.filter((r) => r.targetStatus === 'red').length, warnings = rows.filter((r) => r.oeeWarning).length;
  const withOee = rows.filter((r) => r.hasValidOeeData).length, withoutOee = rows.length - withOee;
  const bestDay = dailyRows(rows).sort((a, b) => b.good - a.good)[0];
  if (currentLanguage === 'en') {
    const oeeText = withOee ? `OEE could be calculated for ${withOee} of ${rows.length} entries. The average OEE is ${formatPercent(totals.oee)}.` : 'There is no complete OEE data for OEE calculation yet.';
    return `A total of ${formatNumber(totals.good)} good parts were achieved with ${formatNumber(totals.scrap)} rejected parts. The average target achievement is ${formatPercent(totals.achievement)}. ${redTargets} entries are below 90 % target achievement. ${withOee} entries have valid OEE data, ${withoutOee} entries have no OEE data. ${oeeText} The strongest day is ${formatDate(bestDay.date)} with ${formatNumber(bestDay.good)} good parts.${warnings ? ` Note: ${warnings} OEE value(s) are above 100 % and should be checked.` : ' No OEE values above 100 % were found.'}`;
  }
  const oeeText = withOee ? `Für ${withOee} von ${rows.length} Einträgen konnte eine OEE berechnet werden. Die durchschnittliche OEE liegt bei ${formatPercent(totals.oee)}.` : 'Für die OEE-Berechnung liegen noch keine vollständigen OEE-Daten vor.';
  return `Insgesamt wurden ${formatNumber(totals.good)} Gutteile bei ${formatNumber(totals.scrap)} Ausschussteilen erreicht. Die durchschnittliche Zielerreichung liegt bei ${formatPercent(totals.achievement)}. ${redTargets} Einträge liegen unter 90 % Zielerreichung. ${withOee} Einträge enthalten gültige OEE-Daten, ${withoutOee} Einträge liegen ohne OEE-Daten vor. ${oeeText} Stärkster Tag ist ${formatDate(bestDay.date)} mit ${formatNumber(bestDay.good)} Gutteilen.${warnings ? ` Hinweis: ${warnings} OEE-Wert(e) liegen über 100 % und sollten geprüft werden.` : ' Es wurden keine OEE-Werte über 100 % erkannt.'}`;
}

function renderCharts(rows) {
  const days = dailyRows(rows), labels = days.map((d) => formatDate(d.date));
  const oeeDays = dailyRows(rows.filter((r) => r.hasValidOeeData)), oeeLabels = oeeDays.map((d) => formatDate(d.date));
  drawBarChart(charts.good, labels, [{ label: t('good'), values: days.map((d) => d.good), color: '#1f6feb' }]);
  drawBarChart(charts.target, labels, [{ label: t('targetQty'), values: days.map((d) => d.target), color: '#7a869a' }, { label: t('good'), values: days.map((d) => d.good), color: '#1f9d55' }]);
  drawBarChart(charts.scrap, labels, [{ label: t('scrap'), values: days.map((d) => d.scrap), color: '#d93025' }]);
  drawBarChart(charts.oee, oeeLabels, [{ label: 'OEE %', values: oeeDays.map((d) => d.oee ?? 0), color: '#6f42c1' }], { percent: true, max: 100, emptyMessage: t('noOeeData') });
  drawBarChart(charts.oeeParts, oeeLabels, [{ label: t('avgAvailability').replace('Ø ', ''), values: oeeDays.map((d) => d.availability ?? 0), color: '#1f6feb' }, { label: t('avgPerformance').replace('Ø ', ''), values: oeeDays.map((d) => d.performance ?? 0), color: '#f2b705' }, { label: t('avgQuality').replace('Ø ', ''), values: oeeDays.map((d) => d.quality ?? 0), color: '#1f9d55' }], { percent: true, max: 100, emptyMessage: t('noOeeData') });
  let cumulative = 0; drawBarChart(charts.cumulative, labels, [{ label: t('cumulativeDeviation'), values: days.map((d) => { cumulative += d.deviation; return cumulative; }), color: '#0f766e' }], { allowNegative: true });
}

function drawBarChart(canvas, labels, series, options = {}) {
  const rect = canvas.getBoundingClientRect(); canvas.width = Math.max(360, Math.floor(rect.width || canvas.width)); canvas.height = 300;
  const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (!labels.length) { ctx.fillStyle = '#68768a'; ctx.font = '14px Arial'; ctx.fillText(options.emptyMessage || t('noData'), 24, 52); return; }
  const p = { l: 54, r: 18, t: 48, b: 58 }, w = canvas.width - p.l - p.r, h = canvas.height - p.t - p.b;
  const values = series.flatMap((s) => s.values.map((v) => Number(v) || 0)); const min = options.allowNegative ? Math.min(0, ...values) : 0; const max = Math.max(options.max || 1, ...values, 1); const span = max - min || 1; const zeroY = p.t + h - ((0 - min) / span) * h;
  ctx.strokeStyle = '#dce3ed'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.l, p.t); ctx.lineTo(p.l, p.t + h); ctx.lineTo(p.l + w, p.t + h); ctx.stroke();
  for (let i = 0; i <= 4; i++) { const y = p.t + (h / 4) * i; const val = max - (span / 4) * i; ctx.fillStyle = '#68768a'; ctx.font = '11px Arial'; ctx.fillText(options.percent ? `${val.toFixed(0)}%` : Math.round(val), 8, y + 4); ctx.strokeStyle = '#eef2f7'; ctx.beginPath(); ctx.moveTo(p.l, y); ctx.lineTo(p.l + w, y); ctx.stroke(); }
  const groupW = w / labels.length, barW = Math.max(6, Math.min(34, (groupW - 12) / series.length));
  labels.forEach((label, i) => { series.forEach((s, si) => { const value = Number(s.values[i]) || 0; const barH = Math.abs(value / span) * h; const x = p.l + i * groupW + (groupW - barW * series.length) / 2 + si * barW; const y = value >= 0 ? zeroY - barH : zeroY; ctx.fillStyle = s.color; ctx.fillRect(x, y, barW - 2, Math.max(1, barH)); }); ctx.save(); ctx.translate(p.l + i * groupW + groupW / 2, canvas.height - 17); ctx.rotate(-0.45); ctx.fillStyle = '#68768a'; ctx.font = '11px Arial'; ctx.fillText(label, -26, 0); ctx.restore(); });
  series.forEach((s, i) => { ctx.fillStyle = s.color; ctx.fillRect(p.l + i * 145, 16, 13, 13); ctx.fillStyle = '#1d2733'; ctx.font = '12px Arial'; ctx.fillText(s.label, p.l + 18 + i * 145, 27); });
}

function dailyRows(rows) { return Object.entries(groupBy(rows, 'date')).sort(([a], [b]) => a.localeCompare(b)).map(([date, items]) => ({ date, ...aggregate(items), count: items.length })); }
function aggregate(rows) { const sums = sumRows(rows); return { ...sums, achievement: sums.target > 0 ? (sums.good / sums.target) * 100 : null, availability: avg(rows, 'availability'), performance: avg(rows, 'performance'), quality: avg(rows, 'quality'), oee: avg(rows, 'oee') }; }
function sumRows(rows) { return rows.reduce((s, r) => ({ target: s.target + r.target, good: s.good + r.good, scrap: s.scrap + r.scrap, deviation: s.deviation + r.deviation }), { target: 0, good: 0, scrap: 0, deviation: 0 }); }
function avg(rows, key) { const vals = rows.map((r) => r[key]).filter(isCalculable); return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null; }
function isCalculable(value) { return Number.isFinite(value); }
function targetStatus(value) { if (!isCalculable(value)) return 'gray'; return value >= 100 ? 'green' : value >= 90 ? 'yellow' : 'red'; }
function oeeStatus(value) { if (!isCalculable(value)) return 'gray'; return value >= 85 ? 'green' : value >= 70 ? 'yellow' : 'red'; }
function statusDot(status, title) { return `<span class="status-dot status-${status}" title="${title}"></span>`; }
function targetStatusLabel(s) { return currentLanguage === 'en' ? ({ green:'Green: target achievement ≥ 100 %', yellow:'Yellow: target achievement 90–99.9 %', red:'Red: target achievement < 90 %', gray:'Gray: no complete data' })[s] : ({ green:'Grün: Zielerreichung ≥ 100 %', yellow:'Gelb: Zielerreichung 90–99,9 %', red:'Rot: Zielerreichung < 90 %', gray:'Grau: keine vollständigen Daten' })[s]; }
function oeeStatusLabel(s) { return currentLanguage === 'en' ? ({ green:'Green: OEE ≥ 85 %', yellow:'Yellow: OEE 70–84.9 %', red:'Red: OEE < 70 %', gray:'Gray: no complete OEE data' })[s] : ({ green:'Grün: OEE ≥ 85 %', yellow:'Gelb: OEE 70–84,9 %', red:'Rot: OEE < 70 %', gray:'Grau: keine vollständigen OEE-Daten' })[s]; }

function switchTab(tab) { activeGroup = tab.dataset.tab; document.querySelectorAll('.tab').forEach((item) => item.classList.toggle('active', item === tab)); renderGroupSummary(filteredRows()); }
function deleteEntry(id) { if (!confirm(t('confirmDeleteEntry'))) return; entries = entries.filter((entry) => entry.id !== id); persistEntries(); render(); }
function clearAllEntries() { if (!entries.length || !confirm(t('confirmClearAll'))) return; entries = []; persistEntries(); render(); }
function exportCsv() { const csvHeader = currentLanguage === 'en' ? ['Date','Project','Part','Machine','Target quantity per day','Produced quantity','Rejected parts','Planned production time in minutes','Machine downtime in minutes','Ideal cycle time per part in seconds','Comment'] : CSV_HEADER; const exportRows = entries.filter((e) => (selectedProjectFilter === 'ALL' || e.project === selectedProjectFilter) && (selectedPartFilter === 'ALL' || e.part === selectedPartFilter) && (selectedMachineFilter === 'ALL' || e.machine === selectedMachineFilter)); downloadFile(`produktionsdaten-${today()}.csv`, [csvHeader, ...exportRows.map((e) => [e.date,e.project,e.part,e.machine,e.target,e.produced,e.scrap,e.plannedTime,e.downtime,e.cycleTime,e.comment])].map((r) => r.map(csvEscape).join(';')).join('\n'), 'text/csv;charset=utf-8'); }
function exportManagementSummary() { downloadFile(`management-zusammenfassung-${today()}.txt`, buildManagementSummary(filteredRows()), 'text/plain;charset=utf-8'); }
function importCsv(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { const rows = parseCsv(String(reader.result)); const imported = rows.slice(1).filter((r) => r.length >= 7).map((r) => ({ id:createId(), date:r[0] || today(), project:normalizeText(r[1]), part:normalizeText(r[2]), machine:normalizeText(r[3]), target:toNumber(r[4]), produced:toNumber(r[5]), scrap:toNumber(r[6]), plannedTime:toOptionalNumber(r[7]), downtime:toOptionalNumber(r[8]), cycleTime:toOptionalNumber(r[9]), comment:r[10] || 'CSV-Import' })).filter((e) => !validateEntry(e)); imported.forEach((entry) => { entry.project = ensureMasterValue('project', entry.project, true); entry.part = ensureMasterValue('part', entry.part, true); entry.machine = ensureMasterValue('machine', entry.machine, true); }); entries = [...entries, ...imported]; persistEntries(); persistMasterData(); persistDeletedMasterValues(); renderMasterData(); render(); importInput.value = ''; formError.textContent = `${t('importSuccess')} (${imported.length})`; }; reader.readAsText(file, 'utf-8'); }
function parseCsv(text) { return text.trim().split(/\r?\n/).filter(Boolean).map((line) => { const cells = []; let current = '', quoted = false; for (let i = 0; i < line.length; i++) { const c = line[i], n = line[i + 1]; if (c === '"' && quoted && n === '"') { current += '"'; i++; } else if (c === '"') quoted = !quoted; else if (c === ';' && !quoted) { cells.push(current); current = ''; } else current += c; } cells.push(current); return cells; }); }
function downloadFile(filename, content, type) { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url); }
function persistEntries() { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); }
function loadMasterValues(type, key, defaults) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    const base = [...stored.map(normalizeMasterItem), ...defaults.map((name) => createMasterItem(name))];
    return dedupeMasterItems(base).filter((item) => !isDeletedMasterValue(type, item.name));
  } catch {
    return defaults.map((name) => createMasterItem(name)).filter((item) => !isDeletedMasterValue(type, item.name));
  }
}
function normalizeText(value) { return String(value || '').trim().replace(/\s+/g, ' '); }
function normalizeKey(value) { return normalizeText(value).toLocaleLowerCase('de-DE'); }
function createMasterItem(name, status = 'active', createdAt = new Date().toISOString(), updatedAt = new Date().toISOString()) { return { id: createId(), name: normalizeText(name), status, createdAt, updatedAt }; }
function normalizeMasterItem(item) {
  if (typeof item === 'string') return createMasterItem(item);
  return { id: item.id || createId(), name: normalizeText(item.name), status: item.status === 'archived' ? 'archived' : 'active', createdAt: item.createdAt || new Date().toISOString(), updatedAt: item.updatedAt || item.createdAt || new Date().toISOString() };
}
function dedupeMasterItems(list) {
  const seen = new Set();
  return list.map(normalizeMasterItem).filter((item) => { const key = normalizeKey(item.name); if (!key || seen.has(key)) return false; seen.add(key); return true; }).sort((a, b) => a.name.localeCompare(b.name));
}
function dedupeNames(values) { const seen = new Set(); return values.map(normalizeText).filter((value) => { const key = normalizeKey(value); if (!value || seen.has(key)) return false; seen.add(key); return true; }).sort((a, b) => a.localeCompare(b)); }
function masterConfig(type) {
  return {
    project: { list: projects, storage: persistProjects, input: projectInput, options: projectOptions, listElement: '#project-list', label: t('project'), entryKey: 'project' },
    part: { list: parts, storage: persistParts, input: partInput, options: partOptions, listElement: '#part-list', label: t('part'), entryKey: 'part' },
    machine: { list: machines, storage: persistMachines, input: machineInput, options: machineOptions, listElement: '#machine-list', label: t('machine'), entryKey: 'machine' }
  }[type];
}
function ensureMasterValue(type, value, reactivateDeleted = false) {
  const clean = normalizeText(value); if (!clean) return '';
  const cfg = masterConfig(type);
  const existing = cfg.list.find((item) => normalizeKey(item.name) === normalizeKey(clean));
  if (existing) return existing.name;
  if (isDeletedMasterValue(type, clean) && !reactivateDeleted) return clean;
  removeDeletedMasterValue(type, clean);
  cfg.list.push(createMasterItem(clean)); cfg.list.sort((a, b) => a.name.localeCompare(b.name));
  return clean;
}
function addMasterValueFromInput(type) {
  const input = document.querySelector(type === 'project' ? '#new-project-name' : type === 'part' ? '#new-part-name' : '#new-machine-name');
  const cfg = masterConfig(type); const clean = normalizeText(input.value);
  if (!clean) return showProjectMessage(currentLanguage === 'en' ? `Please enter a ${cfg.label}.` : `Bitte ${type === 'machine' ? 'eine' : 'ein'} ${cfg.label} eingeben.`);
  if (cfg.list.some((item) => normalizeKey(item.name) === normalizeKey(clean))) return showProjectMessage(currentLanguage === 'en' ? `${cfg.label} already exists.` : `${cfg.label} existiert bereits.`);
  const canonical = ensureMasterValue(type, clean, true); persistDeletedMasterValues(); cfg.storage(); input.value = ''; cfg.input.value = canonical; showProjectMessage(currentLanguage === 'en' ? `${cfg.label} added.` : `${cfg.label} hinzugefügt.`); renderMasterData(); render();
}
function renderFilterOptions(select, allLabel, selectedValue, values) { const names = dedupeNames(values); select.innerHTML = `<option value="ALL">${allLabel}</option>` + names.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join(''); select.value = names.includes(selectedValue) ? selectedValue : 'ALL'; }

function loadProjects() { return loadMasterValues('project', PROJECT_STORAGE_KEY, DEFAULT_PROJECTS); }
function persistProjects() { localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects)); }
function persistParts() { localStorage.setItem(PART_STORAGE_KEY, JSON.stringify(parts)); }
function persistMachines() { localStorage.setItem(MACHINE_STORAGE_KEY, JSON.stringify(machines)); }
function persistMasterData() { persistProjects(); persistParts(); persistMachines(); }
function syncMasterDataFromEntries() { entries.forEach((entry) => { entry.project = ensureMasterValue('project', entry.project); entry.part = ensureMasterValue('part', entry.part); entry.machine = ensureMasterValue('machine', entry.machine); }); persistEntries(); persistMasterData(); persistDeletedMasterValues(); }
function activeMasterItems(type) { return masterConfig(type).list.filter((item) => item.status === 'active').sort((a, b) => a.name.localeCompare(b.name)); }
function renderMasterData() { renderMasterOptions(); renderMasterList('project'); renderMasterList('part'); renderMasterList('machine'); }
function renderMasterOptions() {
  [['project', projectOptions], ['part', partOptions], ['machine', machineOptions]].forEach(([type, datalist]) => {
    datalist.innerHTML = activeMasterItems(type).map((item) => `<option value="${escapeHtml(item.name)}"></option>`).join('');
  });
  renderFilterOptions(projectFilter, t('allProjects'), selectedProjectFilter, [...projects.map((p) => p.name), ...entries.map((e) => e.project)]);
  renderFilterOptions(partFilter, t('allParts'), selectedPartFilter, [...parts.map((p) => p.name), ...entries.map((e) => e.part)]);
  renderFilterOptions(machineFilter, t('allMachines'), selectedMachineFilter, [...machines.map((m) => m.name), ...entries.map((e) => e.machine)]);
  selectedProjectFilter = projectFilter.value; selectedPartFilter = partFilter.value; selectedMachineFilter = machineFilter.value;
}
function renderMasterList(type) {
  const cfg = masterConfig(type);
  document.querySelector(cfg.listElement).innerHTML = cfg.list.slice().sort((a, b) => a.name.localeCompare(b.name)).map((item) => `
    <div class="project-row ${item.status === 'archived' ? 'archived' : ''}" data-master-id="${item.id}">
      <div><input value="${escapeHtml(item.name)}" aria-label="${cfg.label} ${t('rename')}" /><div class="project-meta">${t(item.status === 'archived' ? 'archived' : 'active')} · ${t('changedOn')} ${formatDate((item.updatedAt || item.createdAt).slice(0, 10))}</div></div>
      <button type="button" data-action="rename">${t('rename')}</button>
      <button type="button" class="master-delete-button" data-action="delete">${t('delete')}</button>
    </div>`).join('') || emptyState(currentLanguage === 'en' ? `No ${cfg.label} master data available yet.` : `Noch keine ${cfg.label}-Stammdaten vorhanden.`);
}
function addProjectFromInput() { addMasterValueFromInput('project'); }
function handleMasterAction(event, type) { const button = event.target.closest('button[data-action]'); if (!button) return; const cfg = masterConfig(type); const row = button.closest('[data-master-id]'); const item = cfg.list.find((master) => master.id === row.dataset.masterId); if (!item) return; if (button.dataset.action === 'rename') renameMasterValue(type, item, row.querySelector('input').value); if (button.dataset.action === 'delete') deleteMasterValue(type, item); }
function renameMasterValue(type, item, newName) {
  const cfg = masterConfig(type); const clean = normalizeText(newName);
  if (!clean) return showProjectMessage(currentLanguage === 'en' ? `Please enter a ${cfg.label}.` : `Bitte ${type === 'machine' ? 'eine' : 'ein'} ${cfg.label} eingeben.`);
  if (cfg.list.some((other) => other.id !== item.id && normalizeKey(other.name) === normalizeKey(clean))) return showProjectMessage(currentLanguage === 'en' ? `${cfg.label} already exists.` : `${cfg.label} existiert bereits.`);
  const oldName = item.name; item.name = clean; item.updatedAt = new Date().toISOString();
  entries = entries.map((entry) => normalizeKey(entry[cfg.entryKey]) === normalizeKey(oldName) ? { ...entry, [cfg.entryKey]: clean } : entry);
  if (selectedProjectFilter === oldName && type === 'project') selectedProjectFilter = clean;
  if (selectedPartFilter === oldName && type === 'part') selectedPartFilter = clean;
  if (selectedMachineFilter === oldName && type === 'machine') selectedMachineFilter = clean;
  persistEntries(); cfg.storage(); showProjectMessage(currentLanguage === 'en' ? `${cfg.label} renamed. Existing production data was updated.` : `${cfg.label} umbenannt. Bestehende Produktionsdaten wurden aktualisiert.`); renderMasterData(); render();
}
function deleteMasterValue(type, item) {
  const cfg = masterConfig(type);
  if (!confirm(currentLanguage === 'en' ? 'Really delete this master data value?' : 'Diesen Stammdatenwert wirklich löschen?')) return;
  const usedEntries = entries.filter((entry) => normalizeKey(entry[cfg.entryKey]) === normalizeKey(item.name));
  let deleteProductionData = false;
  if (usedEntries.length) {
    const promptText = currentLanguage === 'en' ? `${cfg.label} "${item.name}" is used in ${usedEntries.length} production data record(s).\n\nThis value is still used in production data. What do you want to do?\n\nA = Delete only from master data list, keep production data\nB = Delete master data value and related production data\nC = Cancel` : `${cfg.label} „${item.name}“ wird in ${usedEntries.length} Produktionsdatensatz/Produktionsdatensätzen verwendet.\n\nDieser Wert wird noch in Produktionsdaten verwendet. Was möchten Sie tun?\n\nA = Nur aus Stammdatenliste löschen, Produktionsdaten behalten\nB = Stammdatenwert und zugehörige Produktionsdaten löschen\nC = Abbrechen`;
    const choice = prompt(promptText, 'A');
    if (!choice || normalizeKey(choice) === 'c' || normalizeKey(choice).startsWith('abbrechen')) { showProjectMessage(currentLanguage === 'en' ? 'Delete canceled. All data stays unchanged.' : 'Löschen abgebrochen. Alle Daten bleiben unverändert.'); return; }
    if (normalizeKey(choice) === 'b') deleteProductionData = true;
    else if (!(normalizeKey(choice) === 'a')) { showProjectMessage(currentLanguage === 'en' ? 'Delete canceled. Please choose A, B or C.' : 'Löschen abgebrochen. Bitte wählen Sie A, B oder C.'); return; }
  }
  cfg.list.splice(cfg.list.indexOf(item), 1);
  rememberDeletedMasterValue(type, item.name);
  if (deleteProductionData) entries = entries.filter((entry) => normalizeKey(entry[cfg.entryKey]) !== normalizeKey(item.name));
  clearDeletedFilter(type, item.name);
  persistEntries(); cfg.storage(); persistDeletedMasterValues(); renderMasterData(); render();
  showProjectMessage(deleteProductionData ? (currentLanguage === 'en' ? `${cfg.label} and ${usedEntries.length} related production data records deleted.` : `${cfg.label} und ${usedEntries.length} zugehörige Produktionsdatensätze gelöscht.`) : (currentLanguage === 'en' ? `${cfg.label} deleted from master data list. Production data stays available.` : `${cfg.label} aus Stammdatenliste gelöscht. Produktionsdaten bleiben erhalten.`));
}
function clearDeletedFilter(type, name) {
  if (type === 'project' && selectedProjectFilter === name) selectedProjectFilter = 'ALL';
  if (type === 'part' && selectedPartFilter === name) selectedPartFilter = 'ALL';
  if (type === 'machine' && selectedMachineFilter === name) selectedMachineFilter = 'ALL';
}
function loadDeletedMasterValues() { try { const parsed = JSON.parse(localStorage.getItem(DELETED_MASTER_STORAGE_KEY) || '{}'); return { project: parsed.project || [], part: parsed.part || [], machine: parsed.machine || [] }; } catch { return { project: [], part: [], machine: [] }; } }
function persistDeletedMasterValues() { localStorage.setItem(DELETED_MASTER_STORAGE_KEY, JSON.stringify(deletedMasterValues)); }
function isDeletedMasterValue(type, name) { return deletedMasterValues[type]?.some((value) => normalizeKey(value) === normalizeKey(name)); }
function rememberDeletedMasterValue(type, name) { if (!deletedMasterValues[type]) deletedMasterValues[type] = []; if (!isDeletedMasterValue(type, name)) deletedMasterValues[type].push(normalizeText(name)); }
function removeDeletedMasterValue(type, name) { if (!deletedMasterValues[type]) deletedMasterValues[type] = []; deletedMasterValues[type] = deletedMasterValues[type].filter((value) => normalizeKey(value) !== normalizeKey(name)); }
function showProjectMessage(message) { document.querySelector('#master-data-message').textContent = message; }

function loadEntries() { try { const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY); return (JSON.parse(raw) || []).map(normalizeEntry); } catch { return []; } }
function groupBy(rows, key) { return rows.reduce((g, r) => { const k = r[key] || t('noValue'); (g[k] ||= []).push(r); return g; }, {}); }
function getValue(id) { return document.querySelector(`#${id}`).value.trim(); }
function getNumber(id) { return toNumber(document.querySelector(`#${id}`).value); }
function getOptionalNumber(id) { return toOptionalNumber(document.querySelector(`#${id}`).value); }
function toNumber(value) { const number = Number(String(value ?? '').replace(',', '.')); return Number.isFinite(number) ? number : 0; }
function toOptionalNumber(value) { if (value === null || value === undefined || String(value).trim() === '') return null; const number = Number(String(value).replace(',', '.')); return Number.isFinite(number) ? number : null; }
function createId() { return window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function today() { return new Date().toISOString().slice(0, 10); }
function formatDate(date) { return date ? new Intl.DateTimeFormat(currentLanguage === 'en' ? 'en-US' : 'de-DE').format(new Date(`${date}T00:00:00`)) : '-'; }
function formatNumber(number) { return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : 'de-DE', { maximumFractionDigits: 1 }).format(number || 0); }
function formatOptionalNumber(number) { return isCalculable(number) ? formatNumber(number) : formatNa(); }
function formatPercent(value) { return isCalculable(value) ? `${value.toFixed(1)} %` : NA_LABEL; }
function formatOeePercent(value) { return isCalculable(value) ? `${value.toFixed(1)} %` : formatNa(); }
function formatNa() { return `<span class="na-value">${NA_LABEL}</span>`; }
function setKpiPercent(selector, value) { setKpiText(selector, formatPercent(value)); }
function setKpiText(selector, value) {
  const element = document.querySelector(selector);
  const displayValue = isMissingDisplayValue(value) ? NA_LABEL : String(value);
  element.textContent = displayValue;
  element.classList.toggle('na-value', displayValue === NA_LABEL);
}

function isMissingDisplayValue(value) { return value === null || value === undefined || value === '' || (typeof value === 'number' && !Number.isFinite(value)); }
function csvEscape(value) { return `"${String(value ?? '').replaceAll('"', '""')}"`; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c])); }
function emptyState(text) { return `<div class="summary-item"><span>${text}</span></div>`; }
