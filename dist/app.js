// Add the public store URLs here when the apps are released.
const STORE_URLS = {
  android: "",
  ios: ""
};

const places = [
  { id: "public", name: "Sample public area", area: "Central district · sample", kind: "Public designated area", group: "designated", status: "Evidence reviewed", statusClass: "verified", symbol: "✓", note: "Look for posted signs and check the current access route before visiting.", confirmed: "Sample confirmation: recent", explanation: "Designation is shown only after evidence has been reviewed." },
  { id: "venue", name: "Sample venue area", area: "Business district · sample", kind: "Establishment designated area", group: "designated", status: "Evidence reviewed", statusClass: "verified", symbol: "✓", note: "The designated area may be inside or outside a venue. Check the access note.", confirmed: "Sample confirmation: recent", explanation: "A reviewed designation is separate from user ratings and confirmations." },
  { id: "outdoor", name: "Sample outdoor report", area: "Neighborhood · sample", kind: "Community outdoor spot", group: "community", status: "Community reported · unverified", statusClass: "reported", symbol: "○", note: "A community observation is not proof that smoking is allowed here.", confirmed: "Sample confirmation: unknown", explanation: "Informal reports stay clearly labeled until their status is reviewed." },
  { id: "claim", name: "Sample venue claim", area: "Commercial area · sample", kind: "Establishment claim", group: "claim", status: "Unverified claim", statusClass: "claim", symbol: "?", note: "The venue claim has not established a designated smoking area.", confirmed: "Sample confirmation: unknown", explanation: "Venue claims need evidence review before they can be shown as verified." }
];

const list = document.querySelector("#place-list");
const detail = document.querySelector("#place-detail");
const count = document.querySelector("#result-count");
const search = document.querySelector("#place-search");
const filters = [...document.querySelectorAll(".filter")];
let activeFilter = "all";
let selectedId = places[0].id;

function visiblePlaces() {
  const query = search.value.trim().toLocaleLowerCase();
  return places.filter(place => (activeFilter === "all" || place.group === activeFilter) && `${place.name} ${place.kind} ${place.area}`.toLocaleLowerCase().includes(query));
}

function renderDetail(place) {
  if (!place) {
    detail.innerHTML = '<div class="detail-empty"><span aria-hidden="true">⌕</span><h3>No sample places found</h3><p>Try another search or choose a different filter.</p></div>';
    return;
  }
  detail.innerHTML = `<div class="detail-topline"><span>PLACE PREVIEW</span><span class="sample-tag">SAMPLE DATA</span></div>
    <div class="detail-main"><span class="detail-symbol ${place.statusClass}" aria-hidden="true">${place.symbol}</span><p class="detail-kicker">${place.area}</p><h3>${place.name}</h3><p class="detail-kind">${place.kind}</p><span class="status-pill status-${place.statusClass}">${place.symbol} ${place.status}</span></div>
    <div class="detail-info"><div><small>ACCESS NOTE</small><p>${place.note}</p></div><div><small>LAST CONFIRMATION</small><p>${place.confirmed}</p></div></div>
    <div class="detail-callout"><span aria-hidden="true">ⓘ</span><p>${place.explanation}</p></div>`;
}

function render() {
  const shown = visiblePlaces();
  if (!shown.some(place => place.id === selectedId)) selectedId = shown[0]?.id;
  count.textContent = `${shown.length} ${shown.length === 1 ? "place" : "places"}`;
  list.innerHTML = shown.map(place => `<button class="place-item ${place.id === selectedId ? "selected" : ""}" type="button" data-id="${place.id}" aria-pressed="${place.id === selectedId}"><span class="item-symbol ${place.statusClass}" aria-hidden="true">${place.symbol}</span><span class="item-copy"><strong>${place.name}</strong><small>${place.kind}</small><span class="item-status ${place.statusClass}">${place.status}</span></span><span class="item-arrow" aria-hidden="true">↗</span></button>`).join("");
  renderDetail(shown.find(place => place.id === selectedId));
}

filters.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filters.forEach(filter => { const active = filter === button; filter.classList.toggle("active", active); filter.setAttribute("aria-pressed", String(active)); });
  render();
}));
search.addEventListener("input", render);
list.addEventListener("click", event => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  selectedId = button.dataset.id;
  render();
});

for (const platform of ["android", "ios"]) {
  const link = document.querySelector(`#${platform}-link`);
  const url = STORE_URLS[platform];
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.removeAttribute("aria-disabled");
    link.querySelector("strong").textContent = platform === "android" ? "Get it on Google Play" : "Download on the App Store";
  }
}

render();
