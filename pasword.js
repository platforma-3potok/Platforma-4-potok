document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, нужно ли запускать защиту (только для modul_6.html и modul_7.html)
    const isProtectedPage = window.location.pathname.endsWith('modul_6.html') || 
                          window.location.pathname.endsWith('modul_7.html');
    
    if (!isProtectedPage) {
        // Если это не защищенная страница - сразу показываем контент
        const main = document.querySelector('.main');
        if (main) {
            main.style.filter = 'none';
            main.style.pointerEvents = 'auto';
        }
        const overlay = document.getElementById('passwordOverlay');
        if (overlay) overlay.style.display = 'none';
        document.body.classList.remove('password-locked');
        return;
    }

    // Защита паролем только для указанных страниц
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
        if (errorText) {
            errorText.style.display = 'block';
            setTimeout(() => errorText.style.display = 'none', 2000);
        }
        if (passwordInput) passwordInput.value = '';
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