const STORAGE_KEY = 'productionEntries.v2';
const LEGACY_STORAGE_KEY = 'productionEntries.v1';
const CSV_HEADER = ['Datum','Projekt','Bauteil','Maschine','Zielmenge pro Tag','Produzierte Stückzahl','Ausschuss','Geplante Produktionszeit in Minuten','Maschinenstillstand in Minuten','Ideale Taktzeit je Stück in Sekunden','Kommentar'];
const requiredNumberFields = ['target','produced','scrap'];
const oeeNumberFields = ['plannedTime','downtime','cycleTime'];
const charts = {
  good: document.querySelector('#good-chart'), target: document.querySelector('#target-chart'), scrap: document.querySelector('#scrap-chart'),
  oee: document.querySelector('#oee-chart'), oeeParts: document.querySelector('#oee-parts-chart'), cumulative: document.querySelector('#cumulative-deviation-chart')
};
const form = document.querySelector('#production-form');
const formError = document.querySelector('#form-error');
const entriesBody = document.querySelector('#entries-body');
const importInput = document.querySelector('#import-csv');
let entries = loadEntries();
let activeGroup = 'project';

document.querySelector('#date').valueAsDate = new Date();
form.addEventListener('submit', saveEntry);
document.querySelector('#clear-all').addEventListener('click', clearAllEntries);
document.querySelector('#export-csv').addEventListener('click', exportCsv);
document.querySelector('#export-summary').addEventListener('click', exportManagementSummary);
importInput.addEventListener('change', importCsv);
document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => switchTab(tab)));
entriesBody.addEventListener('click', (event) => {
  const button = event.target.closest('[data-delete-id]');
  if (button) deleteEntry(button.dataset.deleteId);
});
window.addEventListener('resize', () => renderCharts(enrichedRows()));
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
  entries.push(entry);
  persistEntries();
  form.reset();
  document.querySelector('#date').valueAsDate = new Date();
  document.querySelector('#scrap').value = 0;
  render();
}

function validateEntry(entry) {
  if (!entry.date) return 'Bitte geben Sie ein Datum ein.';
  if (!entry.project || !entry.part || !entry.machine) return 'Bitte füllen Sie Projekt, Bauteil und Maschine aus.';
  if (!entry.comment) return 'Bitte ergänzen Sie einen Kommentar zum Eintrag.';
  if (requiredNumberFields.some((field) => !Number.isFinite(entry[field]))) return 'Bitte füllen Sie Zielmenge, produzierte Stückzahl und Ausschuss mit gültigen Zahlen aus.';
  if (requiredNumberFields.some((field) => entry[field] < 0) || oeeNumberFields.some((field) => entry[field] !== null && entry[field] < 0)) return 'Negative Werte sind nicht erlaubt. Bitte korrigieren Sie die Eingabe.';
  if (entry.target <= 0) return 'Die Zielmenge pro Tag muss größer als 0 sein.';
  if (entry.produced < 0) return 'Die produzierte Stückzahl muss größer oder gleich 0 sein.';
  if (entry.scrap > entry.produced) return 'Ausschuss darf nicht größer als die produzierte Stückzahl sein.';

  const filledOeeFields = oeeNumberFields.filter((field) => entry[field] !== null);
  if (entry.plannedTime !== null && entry.downtime !== null && entry.downtime > entry.plannedTime) return 'Maschinenstillstand darf nicht größer als die geplante Produktionszeit sein.';
  if (filledOeeFields.length === oeeNumberFields.length) {
    if (entry.plannedTime <= 0) return 'Für die OEE-Berechnung muss die geplante Produktionszeit größer als 0 Minuten sein.';
    if (entry.downtime < 0) return 'Für die OEE-Berechnung muss der Maschinenstillstand größer oder gleich 0 Minuten sein.';
    if (entry.cycleTime <= 0) return 'Für die OEE-Berechnung muss die ideale Taktzeit größer als 0 Sekunden sein.';
  }
  return '';
}

function enrich(entry) {
  const normalized = normalizeEntry(entry);
  const good = normalized.produced - normalized.scrap;
  const deviation = good - normalized.target;
  const achievement = normalized.target > 0 ? (good / normalized.target) * 100 : null;
  const hasValidOeeData = normalized.plannedTime > 0 && normalized.downtime >= 0 && normalized.cycleTime > 0 && normalized.downtime <= normalized.plannedTime;
  const runtime = hasValidOeeData ? normalized.plannedTime - normalized.downtime : null;
  const availability = hasValidOeeData ? (runtime / normalized.plannedTime) * 100 : null;
  const theoretical = hasValidOeeData ? (runtime * 60) / normalized.cycleTime : null;
  const performance = hasValidOeeData && theoretical > 0 ? (normalized.produced / theoretical) * 100 : null;
  const quality = hasValidOeeData && normalized.produced > 0 ? (good / normalized.produced) * 100 : null;
  const oee = [availability, performance, quality].every(isCalculable) ? (availability * performance * quality) / 10000 : null;
  return { ...normalized, good, deviation, achievement, hasValidOeeData, runtime, theoretical, availability, performance, quality, oee, targetStatus: targetStatus(achievement), oeeStatus: oeeStatus(oee), oeeWarning: isCalculable(oee) && oee > 100 };
}

function normalizeEntry(entry) {
  return { ...entry, target: toNumber(entry.target), produced: toNumber(entry.produced), scrap: toNumber(entry.scrap), plannedTime: toOptionalNumber(entry.plannedTime), downtime: toOptionalNumber(entry.downtime), cycleTime: toOptionalNumber(entry.cycleTime) };
}

function render() {
  const rows = enrichedRows();
  renderTable(rows); renderTotals(rows); renderDailyOverview(rows); renderGroupSummary(rows); renderManagementSummary(rows); renderCharts(rows);
  document.querySelector('#entry-count').textContent = `${rows.length} Einträge`;
}
function enrichedRows() { return entries.map(enrich).sort((a, b) => a.date.localeCompare(b.date)); }

function renderTable(rows) {
  entriesBody.innerHTML = rows.map((e) => `
    <tr class="${e.oeeWarning ? 'warning-row' : ''}">
      <td>${statusDot(e.targetStatus, targetStatusLabel(e.targetStatus))}</td><td>${statusDot(e.oeeStatus, oeeStatusLabel(e.oeeStatus))}${e.oeeWarning ? '<span class="hint">&gt;100%</span>' : ''}</td>
      <td>${escapeHtml(formatDate(e.date))}</td><td>${escapeHtml(e.project)}</td><td>${escapeHtml(e.part)}</td><td>${escapeHtml(e.machine)}</td>
      <td>${formatNumber(e.target)}</td><td>${formatNumber(e.produced)}</td><td>${formatNumber(e.scrap)}</td><td>${formatNumber(e.good)}</td><td>${formatNumber(e.deviation)}</td><td>${formatPercent(e.achievement)}</td>
      <td>${formatOptionalNumber(e.plannedTime)}</td><td>${formatOptionalNumber(e.downtime)}</td><td>${formatOptionalNumber(e.cycleTime)}</td><td>${formatOeePercent(e.availability)}</td><td>${formatOeePercent(e.performance)}</td><td>${formatOeePercent(e.quality)}</td><td>${formatOeePercent(e.oee)}</td>
      <td>${escapeHtml(e.comment || '-')}</td><td><button class="delete-row" data-delete-id="${e.id}" type="button">Löschen</button></td>
    </tr>`).join('') || '<tr><td colspan="21">Noch keine Daten vorhanden.</td></tr>';
}

function renderTotals(rows) {
  const totals = sumRows(rows);
  setText('#total-good', formatNumber(totals.good)); setText('#total-scrap', formatNumber(totals.scrap)); setText('#total-deviation', formatNumber(totals.deviation));
  setText('#avg-achievement', formatPercent(avg(rows, 'achievement'))); setText('#avg-availability', formatPercent(avg(rows, 'availability')));
  setText('#avg-performance', formatPercent(avg(rows, 'performance'))); setText('#avg-quality', formatPercent(avg(rows, 'quality'))); setText('#avg-oee', formatPercent(avg(rows, 'oee')));
  setText('#oee-count', formatNumber(rows.filter((r) => r.hasValidOeeData).length)); setText('#no-oee-count', formatNumber(rows.filter((r) => !r.hasValidOeeData).length));
}

function renderDailyOverview(rows) {
  document.querySelector('#daily-overview').innerHTML = dailyRows(rows).map((day) => summaryItem(formatDate(day.date), day, `${day.count} Einträge`)).join('') || emptyState('Noch keine Daten vorhanden.');
}
function renderGroupSummary(rows) {
  const grouped = groupBy(rows, activeGroup);
  document.querySelector('#group-summary').innerHTML = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([name, items]) => summaryItem(name, aggregate(items), `${items.length} Einträge`)).join('') || emptyState('Noch keine Daten vorhanden.');
}
function summaryItem(title, totals, subtitle) {
  return `<div class="summary-item"><div><strong>${escapeHtml(title)}</strong><br><small>${subtitle} · Ziel ${formatPercent(totals.achievement)} · OEE ${formatPercent(totals.oee)}</small></div><div>Gut: <strong>${formatNumber(totals.good)}</strong><br><small>Ausschuss ${formatNumber(totals.scrap)}, Abw. ${formatNumber(totals.deviation)}</small></div></div>`;
}
function renderManagementSummary(rows) { document.querySelector('#management-summary').textContent = buildManagementSummary(rows); }
function buildManagementSummary(rows) {
  if (!rows.length) return 'Noch keine Daten vorhanden. Erfassen oder importieren Sie Produktionsdaten, um eine Zusammenfassung zu erhalten.';
  const totals = aggregate(rows), redTargets = rows.filter((r) => r.targetStatus === 'red').length, warnings = rows.filter((r) => r.oeeWarning).length;
  const withOee = rows.filter((r) => r.hasValidOeeData).length, withoutOee = rows.length - withOee;
  const bestDay = dailyRows(rows).sort((a, b) => b.good - a.good)[0];
  const oeeText = withOee ? `Die durchschnittliche OEE aus ${withOee} gültigen OEE-Einträgen liegt bei ${formatPercent(totals.oee)}.` : 'Es liegen keine gültigen OEE-Daten vor; die OEE wurde nicht berechnet.';
  return `Insgesamt wurden ${formatNumber(totals.good)} Gutteile bei ${formatNumber(totals.scrap)} Ausschussteilen erreicht. Die durchschnittliche Zielerreichung liegt bei ${formatPercent(totals.achievement)}. ${redTargets} Einträge liegen unter 90 % Zielerreichung. ${withOee} Einträge enthalten gültige OEE-Daten, ${withoutOee} Einträge liegen ohne OEE-Daten vor. ${oeeText} Stärkster Tag ist ${formatDate(bestDay.date)} mit ${formatNumber(bestDay.good)} Gutteilen.${warnings ? ` Hinweis: ${warnings} OEE-Wert(e) liegen über 100 % und sollten geprüft werden.` : ' Es wurden keine OEE-Werte über 100 % erkannt.'}`;
}

function renderCharts(rows) {
  const days = dailyRows(rows), labels = days.map((d) => formatDate(d.date));
  const oeeDays = dailyRows(rows.filter((r) => r.hasValidOeeData)), oeeLabels = oeeDays.map((d) => formatDate(d.date));
  drawBarChart(charts.good, labels, [{ label: 'Gutmenge', values: days.map((d) => d.good), color: '#1f6feb' }]);
  drawBarChart(charts.target, labels, [{ label: 'Zielmenge', values: days.map((d) => d.target), color: '#7a869a' }, { label: 'Gutmenge', values: days.map((d) => d.good), color: '#1f9d55' }]);
  drawBarChart(charts.scrap, labels, [{ label: 'Ausschuss', values: days.map((d) => d.scrap), color: '#d93025' }]);
  drawBarChart(charts.oee, oeeLabels, [{ label: 'OEE %', values: oeeDays.map((d) => d.oee ?? 0), color: '#6f42c1' }], { percent: true, max: 100, emptyMessage: 'Keine OEE-Daten vorhanden' });
  drawBarChart(charts.oeeParts, oeeLabels, [{ label: 'Verfügbarkeit', values: oeeDays.map((d) => d.availability ?? 0), color: '#1f6feb' }, { label: 'Leistung', values: oeeDays.map((d) => d.performance ?? 0), color: '#f2b705' }, { label: 'Qualität', values: oeeDays.map((d) => d.quality ?? 0), color: '#1f9d55' }], { percent: true, max: 100, emptyMessage: 'Keine OEE-Daten vorhanden' });
  let cumulative = 0; drawBarChart(charts.cumulative, labels, [{ label: 'Kum. Abweichung', values: days.map((d) => { cumulative += d.deviation; return cumulative; }), color: '#0f766e' }], { allowNegative: true });
}

function drawBarChart(canvas, labels, series, options = {}) {
  const rect = canvas.getBoundingClientRect(); canvas.width = Math.max(360, Math.floor(rect.width || canvas.width)); canvas.height = 300;
  const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (!labels.length) { ctx.fillStyle = '#68768a'; ctx.font = '16px Arial'; ctx.fillText(options.emptyMessage || 'Noch keine Daten vorhanden.', 24, 52); return; }
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
function targetStatusLabel(s) { return ({ green:'Grün: Zielerreichung ≥ 100 %', yellow:'Gelb: Zielerreichung 90–99,9 %', red:'Rot: Zielerreichung < 90 %', gray:'Grau: nicht berechenbar' })[s]; }
function oeeStatusLabel(s) { return ({ green:'Grün: OEE ≥ 85 %', yellow:'Gelb: OEE 70–84,9 %', red:'Rot: OEE < 70 %', gray:'Grau: nicht berechenbar' })[s]; }

function switchTab(tab) { activeGroup = tab.dataset.tab; document.querySelectorAll('.tab').forEach((item) => item.classList.toggle('active', item === tab)); renderGroupSummary(enrichedRows()); }
function deleteEntry(id) { if (!confirm('Diesen Eintrag wirklich löschen?')) return; entries = entries.filter((entry) => entry.id !== id); persistEntries(); render(); }
function clearAllEntries() { if (!entries.length || !confirm('Alle lokal gespeicherten Daten löschen?')) return; entries = []; persistEntries(); render(); }
function exportCsv() { downloadFile(`produktionsdaten-${today()}.csv`, [CSV_HEADER, ...entries.map((e) => [e.date,e.project,e.part,e.machine,e.target,e.produced,e.scrap,e.plannedTime,e.downtime,e.cycleTime,e.comment])].map((r) => r.map(csvEscape).join(';')).join('\n'), 'text/csv;charset=utf-8'); }
function exportManagementSummary() { downloadFile(`management-zusammenfassung-${today()}.txt`, buildManagementSummary(enrichedRows()), 'text/plain;charset=utf-8'); }
function importCsv(event) { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { const rows = parseCsv(String(reader.result)); const imported = rows.slice(1).filter((r) => r.length >= 7).map((r) => ({ id:createId(), date:r[0] || today(), project:r[1] || '', part:r[2] || '', machine:r[3] || '', target:toNumber(r[4]), produced:toNumber(r[5]), scrap:toNumber(r[6]), plannedTime:toOptionalNumber(r[7]), downtime:toOptionalNumber(r[8]), cycleTime:toOptionalNumber(r[9]), comment:r[10] || 'CSV-Import' })).filter((e) => !validateEntry(e)); entries = [...entries, ...imported]; persistEntries(); render(); importInput.value = ''; formError.textContent = `${imported.length} CSV-Eintrag/Einträge importiert.`; }; reader.readAsText(file, 'utf-8'); }
function parseCsv(text) { return text.trim().split(/\r?\n/).filter(Boolean).map((line) => { const cells = []; let current = '', quoted = false; for (let i = 0; i < line.length; i++) { const c = line[i], n = line[i + 1]; if (c === '"' && quoted && n === '"') { current += '"'; i++; } else if (c === '"') quoted = !quoted; else if (c === ';' && !quoted) { cells.push(current); current = ''; } else current += c; } cells.push(current); return cells; }); }
function downloadFile(filename, content, type) { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url); }
function persistEntries() { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); }
function loadEntries() { try { const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY); return (JSON.parse(raw) || []).map(normalizeEntry); } catch { return []; } }
function groupBy(rows, key) { return rows.reduce((g, r) => { const k = r[key] || 'Ohne Angabe'; (g[k] ||= []).push(r); return g; }, {}); }
function getValue(id) { return document.querySelector(`#${id}`).value.trim(); }
function getNumber(id) { return toNumber(document.querySelector(`#${id}`).value); }
function getOptionalNumber(id) { return toOptionalNumber(document.querySelector(`#${id}`).value); }
function toNumber(value) { const number = Number(String(value ?? '').replace(',', '.')); return Number.isFinite(number) ? number : 0; }
function toOptionalNumber(value) { if (value === null || value === undefined || String(value).trim() === '') return null; const number = Number(String(value).replace(',', '.')); return Number.isFinite(number) ? number : null; }
function setText(selector, value) { document.querySelector(selector).textContent = value; }
function createId() { return window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function today() { return new Date().toISOString().slice(0, 10); }
function formatDate(date) { return date ? new Intl.DateTimeFormat('de-DE').format(new Date(`${date}T00:00:00`)) : '-'; }
function formatNumber(number) { return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(number || 0); }
function formatOptionalNumber(number) { return isCalculable(number) ? formatNumber(number) : 'nicht berechnet'; }
function formatPercent(value) { return isCalculable(value) ? `${value.toFixed(1)} %` : 'nicht berechenbar'; }
function formatOeePercent(value) { return isCalculable(value) ? `${value.toFixed(1)} %` : 'nicht berechnet'; }
function csvEscape(value) { return `"${String(value ?? '').replaceAll('"', '""')}"`; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c])); }
function emptyState(text) { return `<div class="summary-item"><span>${text}</span></div>`; }
