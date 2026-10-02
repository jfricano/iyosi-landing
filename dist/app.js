// Add public store URLs when the apps are released. Until then, the cards
// remain visible as availability information without acting as links.
const STORE_URLS = {
  android: '',
  ios: ''
};

const states = {
  designated: {
    name: 'Sample designated area',
    type: 'Public designated area',
    status: '✓  Evidence reviewed',
    date: 'Sample date',
    access: 'Check posted signs and the current entrance.',
    action: 'View place details',
    symbol: '✓'
  },
  community: {
    name: 'Sample outdoor report',
    type: 'Community outdoor spot',
    status: '◇  Unverified report',
    date: 'Not yet confirmed',
    access: 'A report does not establish permission.',
    action: 'Read report details',
    symbol: '◇'
  }
};
const buttons = [...document.querySelectorAll('[data-state]')];
buttons.forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.state;
  const state = states[key];
  buttons.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  document.getElementById('place-name').textContent = state.name;
  document.getElementById('place-type').textContent = state.type;
  const status = document.getElementById('place-status');
  status.textContent = state.status;
  status.className = 'status-chip ' + (key === 'designated' ? 'verified' : 'reported');
  document.getElementById('place-date').textContent = state.date;
  document.getElementById('place-access').textContent = state.access;
  document.getElementById('card-action').firstChild.textContent = state.action + ' ';
  const pin = document.getElementById('map-pin');
  pin.textContent = state.symbol;
  pin.classList.toggle('unverified', key === 'community');
}));

for (const [platform, url] of Object.entries(STORE_URLS)) {
  if (!url) continue;
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:') continue;
  const link = document.getElementById(`${platform}-link`);
  link.href = parsed.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.removeAttribute('aria-disabled');
  link.querySelector('strong').textContent = platform === 'android'
    ? 'Get it on Google Play ↗'
    : 'Download on the App Store ↗';
}
