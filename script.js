const cookieName = 'themeMode';
const themeButtons = document.querySelectorAll('[data-theme]');
const currentThemeLabel = document.getElementById('currentTheme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = prefersDark ? 'dark' : 'light';

function setCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name) {
  return document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split('=')[1];
}

function markActiveButton(theme) {
  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === theme;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
  currentThemeLabel.textContent = theme === 'dark' ? 'Escuro' : 'Claro';
  markActiveButton(theme);
}

function saveTheme(theme) {
  setCookie(cookieName, theme, 30);
  applyTheme(theme);
}

function initTheme() {
  const savedValue = getCookie(cookieName);
  const theme = savedValue === 'dark' || savedValue === 'light' ? savedValue : defaultTheme;
  applyTheme(theme);
}

themeButtons.forEach((button) => {
  button.addEventListener('click', () => saveTheme(button.dataset.theme));
});

initTheme();
