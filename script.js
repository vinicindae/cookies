const cookieName = 'themeMode'; // define o nome do cookie usado para salvar o tema
const themeButtons = document.querySelectorAll('[data-theme]'); // seleciona todos os botões de tema
const currentThemeLabel = document.getElementById('currentTheme'); // pega o elemento que mostra o tema atual
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // detecta se o usuário prefere tema escuro no sistema
const defaultTheme = prefersDark ? 'dark' : 'light'; // define o tema padrão com base na preferência de sistema

function setCookie(name, value, days) { // inicia a função para gravar o cookie
  const maxAge = days * 24 * 60 * 60; // converte dias em segundos para expiração
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`; // salva o cookie com regras de caminho e expiração
}

function getCookie(name) { // inicia a função que lê o cookie pelo nome
  return document.cookie
    .split('; ') // separa a string de cookies em partes individuais
    .find((cookie) => cookie.startsWith(`${name}=`)) // encontra o cookie com o nome desejado
    ?.split('=')[1]; // retorna apenas o valor do cookie se existir
}

function markActiveButton(theme) { // inicia a função que destaca o botão atual
  themeButtons.forEach((button) => { // percorre cada botão de tema
    const isActive = button.dataset.theme === theme; // verifica se o botão corresponde ao tema atual
    button.classList.toggle('active', isActive); // ativa ou desativa a classe active
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false'); // ajusta a acessibilidade do botão
  });
}

function applyTheme(theme) { // inicia a função que aplica o tema selecionado
  document.body.classList.toggle('dark', theme === 'dark'); // adiciona a classe dark ao body se for tema escuro
  currentThemeLabel.textContent = theme === 'dark' ? 'Escuro' : 'Claro'; // atualiza o texto exibido do tema atual
  markActiveButton(theme); // atualiza o botão ativo
}

function saveTheme(theme) { // inicia a função que salva o tema escolhido
  setCookie(cookieName, theme, 30); // grava o cookie do tema por 30 dias
  applyTheme(theme); // aplica o tema imediatamente
}

function initTheme() { // inicia o tema ao carregar a página
  const savedValue = getCookie(cookieName); // lê o valor salvo no cookie
  const theme = savedValue === 'dark' || savedValue === 'light' ? savedValue : defaultTheme; // usa o tema salvo ou o tema padrão
  applyTheme(theme); // aplica o tema determinado
}

themeButtons.forEach((button) => { // adiciona evento de clique para cada botão
  button.addEventListener('click', () => saveTheme(button.dataset.theme)); // ao clicar, salva e aplica o tema selecionado
});

initTheme(); // executa a inicialização do tema quando o script carrega
