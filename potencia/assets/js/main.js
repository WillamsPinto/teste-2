
const body = document.body;
const toggleButton = document.querySelector('.menu-toggle');
const backdrop = document.querySelector('.sidebar-backdrop');
const sidebarLinks = document.querySelectorAll('.sidebar a');

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
if (backdrop) backdrop.addEventListener('click', closeMenu);
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 1080) closeMenu();
  });
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 1080) closeMenu();
});
