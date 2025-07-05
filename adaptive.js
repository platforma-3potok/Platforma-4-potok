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
ddocument.addEventListener('DOMContentLoaded', function() {
    // Проверяем, нужно ли запускать защиту (исключаем главную страницу)
    const isProtectedPage = !window.location.pathname.endsWith('index.html') && 
                          window.location.pathname !== '/' &&
                          !window.location.pathname.includes('index.');
    
    if (!isProtectedPage) {
        // Если это главная страница - сразу показываем контент
        document.querySelector('.main').style.filter = 'none';
        document.querySelector('.main').style.pointerEvents = 'auto';
        return;
    }

    // Защита паролем только для НЕглавных страниц
    const validPasswords = ["secret123", "admin2024", "мойпароль"];
    const overlay = document.getElementById('passwordOverlay');
    const passwordInput = document.getElementById('passwordInput');
    const submitBtn = document.getElementById('submitPassword');
    const errorText = document.getElementById('errorText');
    const body = document.body;
    const mainContent = document.querySelector('.main');

    // Проверка сохраненного пароля
    if (sessionStorage.getItem('unlocked')) {
        unlockContent();
        return;
    }

    // Обработчик проверки пароля
    function checkPassword() {
        const password = passwordInput.value.trim();
        
        if (validPasswords.includes(password)) {
            sessionStorage.setItem('unlocked', 'true');
            unlockContent();
        } else {
            showError();
        }
    }

    function showError() {
        errorText.style.display = 'block';
        passwordInput.value = '';
        setTimeout(() => errorText.style.display = 'none', 2000);
    }

    function unlockContent() {
        if (overlay) overlay.style.display = 'none';
        if (body) body.classList.remove('password-locked');
        if (mainContent) {
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
        }
    }

    // Назначаем обработчики
    if (submitBtn) submitBtn.addEventListener('click', checkPassword);
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkPassword();
        });
        passwordInput.focus();
    }
});