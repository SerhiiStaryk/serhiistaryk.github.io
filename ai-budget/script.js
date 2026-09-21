'use strict';

const STORAGE_KEY = 'token-budget-state';

const monthlyEl = document.getElementById('monthly');
const usedEl = document.getElementById('used');
const unitEl = document.getElementById('unit');
const resultEl = document.getElementById('result');
const remainingEl = document.getElementById('remaining');
const daysLeftEl = document.getElementById('daysLeft');
const dailyLimitEl = document.getElementById('dailyLimit');
const expectedEl = document.getElementById('expected');
const diffValueEl = document.getElementById('diffValue');
const diffCardEl = document.getElementById('diffCard');
const statusBadgeEl = document.getElementById('statusBadge');
const gridEl = document.getElementById('grid');
const weekdayRowEl = document.getElementById('weekdayRow');
const monthLabelEl = document.getElementById('monthLabel');
const saveIndicatorEl = document.getElementById('saveIndicator');
const dailyLimitLabelEl = document.getElementById('dailyLimitLabel');
const expectedLabelEl = document.getElementById('expectedLabel');
const remainingLabelEl = document.getElementById('remainingLabel');
const resultLabelEl = document.getElementById('resultLabel');

const today = new Date();
today.setHours(0, 0, 0, 0);
let viewYear = today.getFullYear();
let viewMonth = today.getMonth();
let marked = {};
let saveTimeout = null;

function fmt(n) {
  const sign = n < 0 ? '-' : '';
  return sign + Math.round(Math.abs(n)).toLocaleString('en-US');
}

function updateUnitLabels() {
  const label = unitEl.value === 'usd' ? '$' : 'Tokens';
  dailyLimitLabelEl.textContent = label;
  expectedLabelEl.textContent = label;
  remainingLabelEl.textContent = label;
  resultLabelEl.textContent = label;
}

function keyFor(y, m, d) {
  return y + '-' + m + '-' + d;
}

function loadState() {
  try {
    const savedState = window.localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const state = JSON.parse(savedState);
      if (typeof state.monthly === 'number') monthlyEl.value = state.monthly;
      if (typeof state.used === 'number') usedEl.value = state.used;
      if (state.unit === 'tokens' || state.unit === 'usd') unitEl.value = state.unit;
      if (state.marked && typeof state.marked === 'object')
        marked = state.marked;
    }
  } catch (e) {
    // no saved state yet, use defaults
  }
}

function scheduleSave() {
  saveIndicatorEl.textContent = 'saving…';
  saveIndicatorEl.style.opacity = '1';
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      const state = {
        monthly: parseFloat(monthlyEl.value) || 0,
        used: parseFloat(usedEl.value) || 0,
        unit: unitEl.value,
        marked: marked,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      saveIndicatorEl.textContent = 'saved';
    } catch (e) {
      saveIndicatorEl.textContent = 'save failed';
    }
  }, 500);
}

function defaultMarkMonth(y, m) {
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(y, m, d).getDay();
    const k = keyFor(y, m, d);
    if (marked[k] === undefined) {
      marked[k] = dow !== 0 && dow !== 6;
    }
  }
}

function renderWeekdayRow() {
  const names = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  weekdayRowEl.innerHTML = names
    .map(
      (n) =>
        '<div style="text-align:center; font-size:11px; color:#999;">' +
        n +
        '</div>',
    )
    .join('');
}

function isToday(y, m, d) {
  return (
    y === today.getFullYear() && m === today.getMonth() && d === today.getDate()
  );
}

function isPastOrToday(y, m, d) {
  const cell = new Date(y, m, d);
  cell.setHours(0, 0, 0, 0);
  return cell.getTime() <= today.getTime();
}

function isViewingCurrentMonth() {
  return viewYear === today.getFullYear() && viewMonth === today.getMonth();
}

function renderGrid() {
  defaultMarkMonth(viewYear, viewMonth);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  monthLabelEl.textContent = monthNames[viewMonth] + ' ' + viewYear;

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  let firstDow = new Date(viewYear, viewMonth, 1).getDay();
  firstDow = firstDow === 0 ? 6 : firstDow - 1;

  let html = '';
  for (let i = 0; i < firstDow; i++) {
    html += '<div></div>';
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const k = keyFor(viewYear, viewMonth, d);
    const isMarked = !!marked[k];
    const past =
      isViewingCurrentMonth() &&
      isPastOrToday(viewYear, viewMonth, d) &&
      !isToday(viewYear, viewMonth, d);
    const bg = isMarked ? '#e8dfd4' : 'white';
    const color = isMarked ? '#7a5c2e' : '#1a1a1a';
    let border = isMarked ? '1px solid #c9a876' : '1px solid #e5e4de';
    if (isViewingCurrentMonth() && isToday(viewYear, viewMonth, d)) {
      border = '2px solid #c9a876';
    }
    const opacity = past ? '0.4' : '1';
    html +=
      '<button data-key="' +
      k +
      '" style="height:32px; padding:0; font-size:13px; border-radius:8px; background:' +
      bg +
      '; color:' +
      color +
      '; border:' +
      border +
      '; opacity:' +
      opacity +
      '; cursor:pointer;">' +
      d +
      '</button>';
  }
  gridEl.innerHTML = html;

  gridEl.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = btn.getAttribute('data-key');
      marked[k] = !marked[k];
      renderGrid();
      update();
      scheduleSave();
    });
  });
}

function getElapsedWorkDaysCount() {
  if (!isViewingCurrentMonth()) return 0;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  let count = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const k = keyFor(viewYear, viewMonth, d);
    if (marked[k] && isPastOrToday(viewYear, viewMonth, d)) count++;
  }
  return count;
}

function getFutureWorkDaysCount() {
  if (!isViewingCurrentMonth()) return 0;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  let count = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const k = keyFor(viewYear, viewMonth, d);
    if (marked[k] && !isPastOrToday(viewYear, viewMonth, d)) count++;
  }
  return count;
}

function getTotalWorkDaysInMonth() {
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  let count = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    if (marked[keyFor(viewYear, viewMonth, d)]) count++;
  }
  return count;
}

function update() {
  updateUnitLabels();
  const monthly = parseFloat(monthlyEl.value) || 0;
  const used = parseFloat(usedEl.value) || 0;

  const totalWorkDays = getTotalWorkDaysInMonth() || 1;
  const elapsedCount = getElapsedWorkDaysCount();
  const futureCount = getFutureWorkDaysCount();

  const dailyLimit = monthly / totalWorkDays;
  const expected = dailyLimit * elapsedCount;
  const diff = used - expected;

  const remaining = Math.max(monthly - used, 0);
  const daysLeftCount = futureCount || 1;

  dailyLimitEl.textContent = fmt(dailyLimit);
  expectedEl.textContent = fmt(expected);
  remainingEl.textContent = fmt(remaining);
  daysLeftEl.textContent = fmt(futureCount);
  resultEl.textContent = fmt(remaining / daysLeftCount);

  if (elapsedCount === 0 || monthly === 0) {
    diffCardEl.style.background = '#f5f4f0';
    statusBadgeEl.style.background = 'transparent';
    statusBadgeEl.style.color = '#999';
    statusBadgeEl.textContent = 'no data yet';
    diffValueEl.textContent = '0';
  } else if (diff > 0) {
    diffCardEl.style.background = '#fbeaea';
    statusBadgeEl.style.background = '#e24b4a';
    statusBadgeEl.style.color = 'white';
    statusBadgeEl.textContent = 'ahead of budget';
    diffValueEl.textContent = '+' + fmt(diff);
  } else if (diff < 0) {
    diffCardEl.style.background = '#eaf3de';
    statusBadgeEl.style.background = '#639922';
    statusBadgeEl.style.color = 'white';
    statusBadgeEl.textContent = 'under budget';
    diffValueEl.textContent = fmt(diff);
  } else {
    diffCardEl.style.background = '#f5f4f0';
    statusBadgeEl.style.background = 'transparent';
    statusBadgeEl.style.color = '#999';
    statusBadgeEl.textContent = 'on track';
    diffValueEl.textContent = '0';
  }
}

document.getElementById('prev').addEventListener('click', () => {
  viewMonth -= 1;
  if (viewMonth < 0) {
    viewMonth = 11;
    viewYear -= 1;
  }
  renderGrid();
  update();
});

document.getElementById('next').addEventListener('click', () => {
  viewMonth += 1;
  if (viewMonth > 11) {
    viewMonth = 0;
    viewYear += 1;
  }
  renderGrid();
  update();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(viewYear, viewMonth, d).getDay();
    marked[keyFor(viewYear, viewMonth, d)] = dow !== 0 && dow !== 6;
  }
  renderGrid();
  update();
  scheduleSave();
});

monthlyEl.addEventListener('input', () => {
  update();
  scheduleSave();
});
usedEl.addEventListener('input', () => {
  update();
  scheduleSave();
});
unitEl.addEventListener('change', () => {
  update();
  scheduleSave();
});

(async function init() {
  loadState();
  renderWeekdayRow();
  renderGrid();
  update();
})();
