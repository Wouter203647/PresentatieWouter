/* ============================================================
   WOUTER MALGO — ACI PRESENTATIE
   script.js
   ============================================================ */

/* ── Scroll-reveal via IntersectionObserver ───────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── Zijnavigatie: actieve dot bijhouden ─────────────────── */
const sections = document.querySelectorAll('section[id]');
const navDots  = document.querySelectorAll('.side-dot');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navDots.forEach(d => d.classList.remove('active'));
      const activeDot = document.querySelector(`.side-dot[href="#${entry.target.id}"]`);
      if (activeDot) activeDot.classList.add('active');
    }
  });
}, { threshold: 0.4 });

// Hero-sectie apart observeren (heeft id 'hero' op de section zelf)
const heroSection = document.getElementById('hero');
if (heroSection) navObserver.observe(heroSection);
sections.forEach(s => navObserver.observe(s));


/* ── KMar-knop interactie ────────────────────────────────── */
const kmarBtn  = document.getElementById('kmar-btn');
const kmarHint = document.getElementById('kmar-hint');

if (kmarBtn) {
  kmarBtn.addEventListener('click', () => {
    // Voorkom dubbele activatie
    if (kmarBtn.classList.contains('activated')) return;

    // 1. Voeg kmar-active toe aan <body> → CSS toont de overlays
    document.body.classList.add('kmar-active');

    // 2. Knopstijl updaten
    kmarBtn.classList.add('activated');
    kmarBtn.querySelector('span').textContent = 'Koninklijke Marechaussee — ✓';

    // 3. Hint-tekst updaten
    if (kmarHint) {
      kmarHint.textContent = 'Scroll omhoog om de rode draad te zien — scroll omlaag voor het volgende hoofdstuk.';
    }

    // 4. Scroll terug naar het schoolgedeelte zodat de overlays zichtbaar worden
    //    (kleine vertraging zodat de CSS-transitie al begint)
    setTimeout(() => {
      const schoolNode = document.getElementById('node-school');
      if (schoolNode) {
        schoolNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 220);
  });
}


/* ── Smooth anchor-navigatie voor de side-dots ───────────── */
navDots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = dot.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
