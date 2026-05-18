/* ============================================
   BREAK & BRUNCH – Complete JavaScript
   Rüsselsheim am Main
   ============================================ */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animRing);
}
animRing();

// ── NAVIGATION SCROLL EFFECT ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MENU TABS ──
function showTab(id) {
  document.querySelectorAll('.menu-tab').forEach((tab, i) => {
    const tabMap = { 'waffeln': 0, 'snacks': 1, 'kaffee': 2 };
    tab.classList.toggle('active', tabMap[id] === i);
  });
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
}

// ── HIGHLIGHT TODAY IN HOURS ──
const days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
const today = days[new Date().getDay()];
document.querySelectorAll('.hour-day').forEach(el => {
  if (el.textContent.trim() === today) {
    el.closest('.hour-row').classList.add('today');
    el.textContent = today + ' ✦';
  }
});

// ── SCROLL FADE-IN ANIMATION ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.menu-item, .drinks-category, .gallery-cell, .stat-block, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ── RESERVATION MODAL ──
function openReservation() {
  const modal = document.getElementById('reservationModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Set minimum date to today
  const todayStr = new Date().toISOString().split('T')[0];
  document.getElementById('resDate').min = todayStr;
  if (!document.getElementById('resDate').value) {
    document.getElementById('resDate').value = todayStr;
  }
}

function closeReservation() {
  document.getElementById('reservationModal').classList.remove('open');
  document.body.style.overflow = '';
  // Reset form after animation
  setTimeout(() => {
    document.getElementById('reservationForm').style.display = '';
    document.getElementById('reservationSuccess').classList.remove('show');
    // Clear error highlights
    document.querySelectorAll('#reservationForm input, #reservationForm select').forEach(f => {
      f.style.borderColor = '';
    });
  }, 350);
}

function submitReservation() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const date  = document.getElementById('resDate').value;
  const time  = document.getElementById('resTime').value;
  const phone = document.getElementById('resPhone').value.trim();

  // Highlight missing fields in red
  const fields = document.querySelectorAll('#reservationForm input, #reservationForm select');
  fields.forEach(f => {
    f.style.borderColor = (!f.value.trim()) ? 'var(--rust-light)' : '';
  });

  if (!fname || !lname || !date || !time || !phone) return;

  // Show success screen
  document.getElementById('reservationForm').style.display = 'none';
  document.getElementById('reservationSuccess').classList.add('show');
}

// Close modal when clicking the backdrop
document.getElementById('reservationModal').addEventListener('click', function(e) {
  if (e.target === this) closeReservation();
});

// ── FLOATING BUTTON – HIDE NEAR FOOTER ──
window.addEventListener('scroll', () => {
  const fab = document.getElementById('fabBtn');
  if (!fab) return;
  const scrolled = window.scrollY + window.innerHeight;
  const total = document.body.scrollHeight;
  const nearBottom = scrolled > total - 200;
  fab.style.opacity = nearBottom ? '0' : '1';
  fab.style.pointerEvents = nearBottom ? 'none' : 'auto';
});