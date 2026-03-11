/* ── YEAR ─────────────────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── NAVBAR SCROLL ────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── MOBILE MENU ──────────────────────────────────────────────────── */
const mobileMenu = document.getElementById('mobile-menu');
document.getElementById('navToggle').addEventListener('click', () => mobileMenu.classList.add('open'));
document.getElementById('mobClose').addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ── PARTICLES ────────────────────────────────────────────────────── */
function createParticles(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const colors = ['#FCCD13','rgba(255,255,255,.2)','#003366'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      background:${colors[i%3]};
      animation-duration:${3+Math.random()*4}s;
      animation-delay:${Math.random()*3}s;
    `;
    container.appendChild(p);
  }
}
createParticles('heroParticles', 20);
createParticles('mobileParticles', 15);
createParticles('formParticles', 12);

/* ── WORD CYCLING ─────────────────────────────────────────────────── */
const words = ['Wealth.', 'Future.', 'Legacy.', 'Family.'];
let wi = 0;
const slot = document.getElementById('wordSlot');
function cycleWord() {
  slot.style.animation = 'none';
  slot.offsetHeight; // reflow
  slot.textContent = words[wi];
  slot.style.animation = 'wordFlip 2.5s ease forwards';
  wi = (wi + 1) % words.length;
}
cycleWord();
setInterval(cycleWord, 2500);

/* ── SCROLL REVEAL ────────────────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => observer.observe(el));

/* ── ANIMATED COUNTERS ────────────────────────────────────────────── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      if (!target) return;
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── GALLERY DRAG ─────────────────────────────────────────────────── */
const track = document.getElementById('galleryTrack');
let isDragging = false, startX = 0, scrollLeft = 0;
track.addEventListener('mousedown', e => { isDragging=true; startX=e.pageX-track.offsetLeft; scrollLeft=track.scrollLeft; track.style.overflowX='auto'; });
track.addEventListener('mouseleave', () => isDragging=false);
track.addEventListener('mouseup', () => isDragging=false);
track.addEventListener('mousemove', e => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  track.scrollLeft = scrollLeft - (x - startX);
});
// Make gallery scrollable
track.style.overflowX = 'auto';
track.style.scrollbarWidth = 'none';
track.style.msOverflowStyle = 'none';
const style = document.createElement('style');
style.textContent = '#galleryTrack::-webkit-scrollbar{display:none;}';
document.head.appendChild(style);

// Touch support
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, {passive:true});
track.addEventListener('touchmove', e => {
  const dx = touchStartX - e.touches[0].clientX;
  track.scrollLeft += dx * 0.8;
  touchStartX = e.touches[0].clientX;
}, {passive:true});

/* ── FORM SUBMIT ──────────────────────────────────────────────────── */
function submitForm() {
  const name = document.getElementById('cfName').value.trim();
  const phone = document.getElementById('cfPhone').value.trim();
  if (!name || !phone) {
    alert('Please fill in your name and phone number.');
    return;
  }
  const success = document.getElementById('cfSuccess');
  success.classList.add('show');
  document.getElementById('cfName').value = '';
  document.getElementById('cfPhone').value = '';
  document.getElementById('cfMsg').value = '';
  setTimeout(() => success.classList.remove('show'), 4000);
}

/* ── SMOOTH NAV LINK ACTIVE STATE ────────────────────────────────── */
const sections = document.querySelectorAll('section[id], div[id="trust"]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) a.style.color = '#FCCD13';
  });
});

/* ── PLAN ACCORDION TOGGLE ────────────────────────────────────────── */
function togglePlan(headerElement) {
  const item = headerElement.parentElement;
  const content = item.querySelector('.plan-acc-content');
  const isActive = item.classList.contains('active');
  
  //Optional: Close all other open plans first
  document.querySelectorAll('.plan-acc-item').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.plan-acc-content').style.maxHeight = null;
  });

  if (!isActive) {
    item.classList.add('active');
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

/* ── LANGUAGE TOGGLE LOGIC ────────────────────────────────────────── */
function toggleLanguage() {
  const isGujarati = document.getElementById('langToggle').checked;
  const plansSection = document.getElementById('plans');
  const lblEn = document.getElementById('lblEn');
  const lblGu = document.getElementById('lblGu');

  if (isGujarati) {
    // Switch to Gujarati by adding class to parent
    plansSection.classList.add('show-gu');
    lblEn.classList.remove('active');
    lblGu.classList.add('active');
  } else {
    // Switch to English by removing class from parent
    plansSection.classList.remove('show-gu');
    lblEn.classList.add('active');
    lblGu.classList.remove('active');
  }

  // Close any open accordion to avoid height glitches when text changes
  document.querySelectorAll('.plan-acc-item').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.plan-acc-content').style.maxHeight = null;
  });
}


/* ── DOWNLOAD IMAGE FUNCTION (DIRECT DOWNLOAD) ────────────────────────── */
async function downloadPlanImage(buttonElement, imageUrl, fileName) {
  const btnTextSpanEn = buttonElement.querySelector('.en');
  const btnTextSpanGu = buttonElement.querySelector('.gu');
  
  // Save original text to restore later
  const originalTextEn = btnTextSpanEn.innerHTML;
  const originalTextGu = btnTextSpanGu.innerHTML;
  
  // Show loading state
  btnTextSpanEn.innerHTML = 'Downloading...'; 
  btnTextSpanGu.innerHTML = 'ડાઉનલોડ થઈ રહ્યું છે...';
  buttonElement.disabled = true;

  try {
    // Fetch the image as a blob to force the browser to download it (instead of opening it in a new tab)
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Image not found');
    
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    // Create an invisible link, click it, and remove it
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up memory
    URL.revokeObjectURL(blobUrl);

  } catch (error) {
    console.error('Error downloading image:', error);
    alert('Error downloading image. Make sure the image file exists in the correct folder.');
  } finally {
    // Restore button text and state
    btnTextSpanEn.innerHTML = originalTextEn;
    btnTextSpanGu.innerHTML = originalTextGu;
    buttonElement.disabled = false;
  }
}
