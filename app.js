const siteView = document.querySelector('#site-view');
const appView = document.querySelector('#app-view');
const toast = document.querySelector('.toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3200);
}

function setView(view) {
  const showApp = view === 'app';
  siteView.classList.toggle('hidden', showApp);
  appView.classList.toggle('hidden', !showApp);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (showApp) history.replaceState(null, '', '#app');
  else history.replaceState(null, '', '#topo');
}

document.querySelectorAll('[data-view]').forEach((button) => {
  button.addEventListener('click', () => setView(button.dataset.view));
});

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' }));
});

document.querySelector('.menu-btn')?.addEventListener('click', () => {
  document.querySelector('.desktop-nav').classList.toggle('open');
});

document.querySelector('#search-map')?.addEventListener('click', () => {
  const location = document.querySelector('#location-search').value.trim();
  showToast(location ? `Buscando pontos próximos de ${location}...` : 'Digite uma cidade ou CEP para buscar.');
});

document.querySelector('#discard-btn')?.addEventListener('click', () => {
  showToast('Cadastro iniciado. Vamos descobrir o valor do seu eletrônico.');
});

document.querySelectorAll('.app-nav button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.app-nav button.active')?.classList.remove('active');
    button.classList.add('active');
    showToast(`${button.textContent.trim()} em breve.`);
  });
});

document.querySelectorAll('.location-item, .app-map-preview .outline-btn').forEach((element) => {
  element.addEventListener('click', () => showToast('Ponto selecionado. Abrindo detalhes da rota...'));
});

document.querySelectorAll('[data-community]').forEach((button) => {
  button.addEventListener('click', () => showToast(`Vamos criar uma campanha para ${button.dataset.community}.`));
});

if (window.location.hash === '#app') setView('app');
