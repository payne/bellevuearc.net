// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  }

  // Toggle menu when hamburger is clicked
  hamburger.addEventListener('click', toggleMenu);

  // Close menu when overlay is clicked
  overlay.addEventListener('click', closeMenu);

  // Close menu when a nav link is clicked
  const navLinks = sidebar.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
});
