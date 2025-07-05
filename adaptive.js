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


