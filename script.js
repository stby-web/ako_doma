const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const galleryItems = [
  { title: 'Raňajky & káva', note: 'Ukážkové foto – finálne sa nahradí reálnou fotkou.' },
  { title: 'Domáce dobroty', note: 'Dezerty, koláče alebo sezónna ponuka.' },
  { title: 'Interiér podniku', note: 'Atmosféra miesta, posedenie a detaily.' },
  { title: 'Káva', note: 'Detail kávy alebo nápoja.' },
  { title: 'Terasa', note: 'Exteriér alebo posedenie vonku.' },
  { title: 'Detail', note: 'Malé detaily, ktoré robia podnik zapamätateľný.' }
];

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxTitle = document.querySelector('.lightbox-caption strong');
const lightboxNote = document.querySelector('.lightbox-caption span');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-nav.prev');
const nextBtn = document.querySelector('.lightbox-nav.next');
let currentIndex = 0;

function showImage(index) {
  currentIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentIndex];
  lightboxImage.className = `lightbox-image is-${currentIndex}`;
  lightboxTitle.textContent = item.title;
  lightboxNote.textContent = item.note;
}

function openLightbox(index) {
  showImage(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-gallery-open]').forEach((button) => {
  button.addEventListener('click', () => openLightbox(Number(button.dataset.galleryOpen || 0)));
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (event.key === 'ArrowRight') showImage(currentIndex + 1);
});
