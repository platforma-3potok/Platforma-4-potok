// пароль
document.addEventListener('DOMContentLoaded', function() {
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