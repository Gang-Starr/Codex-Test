const STORAGE_KEY = 'productionEntries.v1';
const form = document.querySelector('#production-form');
const entriesBody = document.querySelector('#entries-body');
const dailyOverview = document.querySelector('#daily-overview');
const groupSummary = document.querySelector('#group-summary');
const managementSummary = document.querySelector('#management-summary');
const totalGoodEl = document.querySelector('#total-good');
const totalScrapEl = document.querySelector('#total-scrap');
const totalDeviationEl = document.querySelector('#total-deviation');
const entryCountEl = document.querySelector('#entry-count');
const goodChart = document.querySelector('#good-chart');
const targetChart = document.querySelector('#target-chart');
const importInput = document.querySelector('#import-csv');

let entries = loadEntries();
let activeGroup = 'project';

document.querySelector('#date').valueAsDate = new Date();
form.addEventListener('submit', saveEntry);
document.querySelector('#clear-all').addEventListener('click', clearAllEntries);
document.querySelector('#export-csv').addEventListener('click', exportCsv);
importInput.addEventListener('change', importCsv);
document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => switchTab(tab)));
entriesBody.addEventListener('click', (event) => {
  const button = event.target.closest('[data-delete-id]');
  if (button) deleteEntry(button.dataset.deleteId);
});

render();

function saveEntry(event) {
  event.preventDefault();
  const entry = {
    id: createId(),
    date: getValue('date'),
    project: getValue('project'),
    part: getValue('part'),
    machine: getValue('machine'),
    target: getNumber('target'),
    produced: getNumber('produced'),
    scrap: getNumber('scrap'),
    comment: getValue('comment')
  };

  if (entry.scrap > entry.produced) {
    alert('Ausschuss darf nicht größer als die produzierte Stückzahl sein.');
    return;
  }

  entries.push(entry);
  persistEntries();
  form.reset();
  document.querySelector('#date').valueAsDate = new Date();
  document.querySelector('#scrap').value = 0;
  render();
}

function getValue(id) {
  return document.querySelector(`#${id}`).value.trim();
}

function getNumber(id) {
  return Number(document.querySelector(`#${id}`).value || 0);
}

function enrich(entry) {
  const good = Math.max(0, entry.produced - entry.scrap);
  const deviation = good - entry.target;
  const achievement = entry.target === 0 ? (good > 0 ? 100 : 0) : (good / entry.target) * 100;
  const status = achievement >= 100 ? 'green' : achievement >= 90 ? 'yellow' : 'red';
  return { ...entry, good, deviation, achievement, status };
}

function render() {
  const rows = entries.map(enrich).sort((a, b) => a.date.localeCompare(b.date));
  renderTable(rows);
  renderTotals(rows);
  renderDailyOverview(rows);
  renderGroupSummary(rows);
  renderManagementSummary(rows);
  renderCharts(rows);
  entryCountEl.textContent = `${rows.length} Einträge`;
}

function renderTable(rows) {
  entriesBody.innerHTML = rows.map((entry) => `
    <tr>
      <td><span class="status-dot status-${entry.status}" title="${statusLabel(entry.status)}"></span></td>
      <td>${escapeHtml(formatDate(entry.date))}</td>
      <td>${escapeHtml(entry.project)}</td>
      <td>${escapeHtml(entry.part)}</td>
      <td>${escapeHtml(entry.machine)}</td>
      <td>${formatNumber(entry.target)}</td>
      <td>${formatNumber(entry.produced)}</td>
      <td>${formatNumber(entry.scrap)}</td>
      <td>${formatNumber(entry.good)}</td>
      <td>${formatNumber(entry.deviation)}</td>
      <td>${entry.achievement.toFixed(1)} %</td>
      <td>${escapeHtml(entry.comment || '-')}</td>
      <td><button class="delete-row" data-delete-id="${entry.id}" type="button">Löschen</button></td>
    </tr>
  `).join('') || '<tr><td colspan="13">Noch keine Einträge vorhanden.</td></tr>';
}

function renderTotals(rows) {
  const totals = sumRows(rows);
  totalGoodEl.textContent = formatNumber(totals.good);
  totalScrapEl.textContent = formatNumber(totals.scrap);
  totalDeviationEl.textContent = formatNumber(totals.deviation);
}

function renderDailyOverview(rows) {
  const grouped = groupBy(rows, 'date');
  dailyOverview.innerHTML = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([date, items]) => {
    const totals = sumRows(items);
    return summaryItem(formatDate(date), totals, `${items.length} Einträge`);
  }).join('') || emptyState('Noch keine Tagesdaten vorhanden.');
}

function renderGroupSummary(rows) {
  const grouped = groupBy(rows, activeGroup);
  groupSummary.innerHTML = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([name, items]) => {
    const totals = sumRows(items);
    return summaryItem(name, totals, `${items.length} Einträge`);
  }).join('') || emptyState('Noch keine Gruppendaten vorhanden.');
}

function summaryItem(title, totals, subtitle) {
  const achievement = totals.target === 0 ? 0 : (totals.good / totals.target) * 100;
  return `
    <div class="summary-item">
      <div><strong>${escapeHtml(title)}</strong><br><small>${subtitle} · Zielerreichung ${achievement.toFixed(1)} %</small></div>
      <div>Gut: <strong>${formatNumber(totals.good)}</strong><br><small>Ausschuss ${formatNumber(totals.scrap)}, Abw. ${formatNumber(totals.deviation)}</small></div>
    </div>
  `;
}

function renderManagementSummary(rows) {
  if (!rows.length) {
    managementSummary.textContent = 'Noch keine Daten vorhanden. Erfassen Sie den ersten Produktionstag, um eine Zusammenfassung zu erhalten.';
    return;
  }
  const totals = sumRows(rows);
  const achievement = totals.target === 0 ? 0 : (totals.good / totals.target) * 100;
  const redCount = rows.filter((row) => row.status === 'red').length;
  const bestDay = Object.entries(groupBy(rows, 'date')).map(([date, items]) => [date, sumRows(items)]).sort((a, b) => b[1].good - a[1].good)[0];
  managementSummary.textContent = `Insgesamt wurden ${formatNumber(totals.good)} Gutteile erreicht. Die Zielerreichung liegt bei ${achievement.toFixed(1)} %. ${redCount} Einträge liegen unter 90 %. Stärkster Tag ist ${formatDate(bestDay[0])} mit ${formatNumber(bestDay[1].good)} Gutteilen.`;
}

function renderCharts(rows) {
  const daily = Object.entries(groupBy(rows, 'date')).sort(([a], [b]) => a.localeCompare(b)).map(([date, items]) => ({ date, ...sumRows(items) }));
  drawBarChart(goodChart, daily.map((day) => formatDate(day.date)), [{ label: 'Gutmenge', values: daily.map((day) => day.good), color: '#1f6feb' }]);
  drawBarChart(targetChart, daily.map((day) => formatDate(day.date)), [
    { label: 'Zielmenge', values: daily.map((day) => day.target), color: '#7a869a' },
    { label: 'Gutmenge', values: daily.map((day) => day.good), color: '#1f9d55' }
  ]);
}

function drawBarChart(canvas, labels, series) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (!labels.length) {
    ctx.fillStyle = '#68768a';
    ctx.font = '16px Arial';
    ctx.fillText('Noch keine Daten vorhanden', 24, 48);
    return;
  }

  const padding = 48;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;
  const max = Math.max(1, ...series.flatMap((item) => item.values));
  const groupWidth = chartWidth / labels.length;
  const barWidth = Math.max(8, (groupWidth - 14) / series.length);

  ctx.strokeStyle = '#dce3ed';
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, padding + chartHeight);
  ctx.lineTo(padding + chartWidth, padding + chartHeight);
  ctx.stroke();

  labels.forEach((label, index) => {
    series.forEach((item, seriesIndex) => {
      const value = item.values[index];
      const height = (value / max) * (chartHeight - 12);
      const x = padding + index * groupWidth + 7 + seriesIndex * barWidth;
      const y = padding + chartHeight - height;
      ctx.fillStyle = item.color;
      ctx.fillRect(x, y, barWidth - 2, height);
    });
    ctx.save();
    ctx.translate(padding + index * groupWidth + groupWidth / 2, canvas.height - 15);
    ctx.rotate(-0.45);
    ctx.fillStyle = '#68768a';
    ctx.font = '11px Arial';
    ctx.fillText(label, -24, 0);
    ctx.restore();
  });

  series.forEach((item, index) => {
    ctx.fillStyle = item.color;
    ctx.fillRect(padding + index * 130, 16, 14, 14);
    ctx.fillStyle = '#1d2733';
    ctx.font = '13px Arial';
    ctx.fillText(item.label, padding + 20 + index * 130, 28);
  });
}

function switchTab(tab) {
  activeGroup = tab.dataset.tab;
  document.querySelectorAll('.tab').forEach((item) => item.classList.toggle('active', item === tab));
  renderGroupSummary(entries.map(enrich));
}

function deleteEntry(id) {
  if (!confirm('Diesen Eintrag wirklich löschen?')) return;
  entries = entries.filter((entry) => entry.id !== id);
  persistEntries();
  render();
}

function clearAllEntries() {
  if (!entries.length || !confirm('Alle lokal gespeicherten Daten löschen?')) return;
  entries = [];
  persistEntries();
  render();
}

function exportCsv() {
  const header = ['Datum','Projekt','Bauteil','Maschine','Zielmenge','Produziert','Ausschuss','Kommentar'];
  const csvRows = [header, ...entries.map((entry) => [entry.date, entry.project, entry.part, entry.machine, entry.target, entry.produced, entry.scrap, entry.comment])];
  const csv = csvRows.map((row) => row.map(csvEscape).join(';')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `produktionsdaten-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function importCsv(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const imported = parseCsv(String(reader.result)).slice(1).filter((row) => row.length >= 7).map((row) => ({
      id: createId(),
      date: row[0],
      project: row[1],
      part: row[2],
      machine: row[3],
      target: Number(row[4] || 0),
      produced: Number(row[5] || 0),
      scrap: Number(row[6] || 0),
      comment: row[7] || ''
    }));
    entries = [...entries, ...imported];
    persistEntries();
    render();
    importInput.value = '';
  };
  reader.readAsText(file, 'utf-8');
}

function parseCsv(text) {
  return text.trim().split(/\r?\n/).map((line) => {
    const cells = [];
    let current = '';
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      const next = line[index + 1];
      if (char === '"' && quoted && next === '"') { current += '"'; index += 1; }
      else if (char === '"') quoted = !quoted;
      else if (char === ';' && !quoted) { cells.push(current); current = ''; }
      else current += char;
    }
    cells.push(current);
    return cells;
  });
}

function groupBy(rows, key) {
  return rows.reduce((groups, row) => {
    const groupKey = row[key] || 'Ohne Angabe';
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(row);
    return groups;
  }, {});
}

function sumRows(rows) {
  return rows.reduce((sum, row) => {
    const enriched = row.good === undefined ? enrich(row) : row;
    sum.target += enriched.target;
    sum.good += enriched.good;
    sum.scrap += enriched.scrap;
    sum.deviation += enriched.deviation;
    return sum;
  }, { target: 0, good: 0, scrap: 0, deviation: 0 });
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function persistEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function statusLabel(status) {
  return { green: 'Grün: Ziel erreicht', yellow: 'Gelb: nahe am Ziel', red: 'Rot: unter Ziel' }[status];
}

function formatDate(date) {
  return new Intl.DateTimeFormat('de-DE').format(new Date(`${date}T00:00:00`));
}

function formatNumber(number) {
  return new Intl.NumberFormat('de-DE').format(number);
}

function csvEscape(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function emptyState(text) {
  return `<div class="summary-item"><span>${text}</span></div>`;
}
