// ── Nav scroll state ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Active nav link ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
function setActive() {
  const y = window.scrollY + 80;
  sections.forEach(s => {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + s.id);
      });
    }
  });
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

// ── Mobile nav ──
const toggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
toggle.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
reveals.forEach(el => ro.observe(el));

// ── Magazine modal ──
const modal = document.getElementById('magModal');
document.getElementById('openMag').addEventListener('click', () => modal.classList.add('open'));
document.getElementById('closeMag').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });

// ── Coffee App modal ──
const coffeeModal = document.getElementById('coffeeModal');
document.getElementById('openCoffee').addEventListener('click', () => coffeeModal.classList.add('open'));
document.getElementById('closeCoffee').addEventListener('click', () => coffeeModal.classList.remove('open'));
coffeeModal.addEventListener('click', e => { if (e.target === coffeeModal) coffeeModal.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') coffeeModal.classList.remove('open'); });

// ── Fashion App modal ──
const fashionModal = document.getElementById('fashionModal');
document.getElementById('openFashion').addEventListener('click', () => fashionModal.classList.add('open'));
document.getElementById('closeFashion').addEventListener('click', () => fashionModal.classList.remove('open'));
fashionModal.addEventListener('click', e => { if (e.target === fashionModal) fashionModal.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fashionModal.classList.remove('open'); });

// ── Lightbox ──
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');
const lightboxCount = document.getElementById('lightboxCounter');

let lbImages = [];  // array of {src, alt} from the active modal
let lbIndex  = 0;

function openLightbox(images, startIndex) {
  lbImages = images;
  lbIndex  = startIndex;
  showLightboxImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxImage() {
  const img = lbImages[lbIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCount.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
  // hide arrows if only one image
  lightboxPrev.style.display = lbImages.length > 1 ? '' : 'none';
  lightboxNext.style.display = lbImages.length > 1 ? '' : 'none';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

lightboxPrev.addEventListener('click', e => {
  e.stopPropagation();
  lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
  showLightboxImage();
});
lightboxNext.addEventListener('click', e => {
  e.stopPropagation();
  lbIndex = (lbIndex + 1) % lbImages.length;
  showLightboxImage();
});

// Arrow key navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; showLightboxImage(); }
  if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; showLightboxImage(); }
  if (e.key === 'Escape')     { closeLightbox(); }
});

// Attach click listeners to every modal-img inside every modal
document.querySelectorAll('.modal-overlay').forEach(modal => {
  const imgs = modal.querySelectorAll('.modal-img img');
  imgs.forEach((img, i) => {
    img.addEventListener('click', e => {
      e.stopPropagation();
      const imageList = Array.from(imgs).map(el => ({ src: el.src, alt: el.alt }));
      openLightbox(imageList, i);
    });
  });
});
// ── Portfolio modal ──
const portfolioModal = document.getElementById('portfolioModal');
document.getElementById('openPortfolio').addEventListener('click', () => portfolioModal.classList.add('open'));
document.getElementById('closePortfolio').addEventListener('click', () => portfolioModal.classList.remove('open'));
portfolioModal.addEventListener('click', e => { if (e.target === portfolioModal) portfolioModal.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') portfolioModal.classList.remove('open'); });