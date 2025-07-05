document.addEventListener('DOMContentLoaded', function() {
  function updateScale() {
    const docEl = document.documentElement;
    const screenWidth = docEl.clientWidth;

    // Отключаем JS-контроль на экранах > 767px
    if (screenWidth > 767) {
      docEl.style.removeProperty('--k'); // Удаляем inline-стиль, чтобы работали CSS-правила
      return;
    }

    // Для экранов ≤ 767px вычисляем --k
    let k = Math.min(screenWidth / 1024, 1);

    // Дополнительная проверка на прокрутку
    if (docEl.scrollWidth > screenWidth) {
      k = Math.min(screenWidth / 1024, k);
    }

    docEl.style.setProperty('--k', k);
  }

  // Инициализация и отслеживание изменений
  updateScale();
  window.addEventListener('resize', updateScale);

  // Точный контроль через ResizeObserver (если поддерживается)
  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(document.documentElement);
  }
});


// пароль
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, не находимся ли мы на index.html
    if (window.location.pathname.endsWith('index.html') || 
        window.location.pathname === '/' || 
        window.location.pathname === '/index.html') {
        return; // Прекращаем выполнение скрипта для index.html
    }

    // Список разрешенных паролей
    const validPasswords = ["secret123", "admin2024", "мойпароль"];
    
    const overlay = document.getElementById('passwordOverlay');
    const passwordInput = document.getElementById('passwordInput');
    const submitBtn = document.getElementById('submitPassword');
    const errorText = document.getElementById('errorText');
    const body = document.body;
    
    // Проверка сохраненного пароля
    if (sessionStorage.getItem('unlocked') === 'true') {
        unlockContent();
        return;
    }
    
    // Обработчик отправки
    function checkPassword() {
        const password = passwordInput.value.trim();
        
        if (validPasswords.includes(password)) {
            sessionStorage.setItem('unlocked', 'true');
            unlockContent();
        } else {
            errorText.style.display = 'block';
            passwordInput.value = '';
            setTimeout(() => errorText.style.display = 'none', 2000);
        }
    }
    
    submitBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkPassword();
    });
    
    function unlockContent() {
        if (overlay) overlay.style.display = 'none';
        if (body) body.classList.remove('password-locked');
        const main = document.querySelector('.main');
        if (main) {
            main.style.filter = 'none';
            main.style.pointerEvents = 'auto';
        }
    }
    
    // Фокус на поле ввода
    if (passwordInput) passwordInput.focus();
});