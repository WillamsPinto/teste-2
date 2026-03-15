
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleButton = document.querySelector('.menu-toggle');
  const backdrop = document.querySelector('.sidebar-backdrop');

  function closeMenu() {
    body.classList.remove('menu-open');
    if (toggleButton) toggleButton.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    body.classList.add('menu-open');
    if (toggleButton) toggleButton.setAttribute('aria-expanded', 'true');
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      if (body.classList.contains('menu-open')) closeMenu();
      else openMenu();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1080) closeMenu();
    });
  });

  document.querySelectorAll('.sidebar summary[data-href]').forEach(summary => {
    summary.addEventListener('click', (event) => {
      const details = summary.parentElement;
      const targetHref = summary.getAttribute('data-href');
      if (!targetHref) return;

      event.preventDefault();

      if (details && details.tagName === 'DETAILS') {
        details.open = true;
      }

      window.location.href = targetHref;
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) closeMenu();
  });
});
