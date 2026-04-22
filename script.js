const progressBar = document.getElementById('progressBar');
const heroWrap = document.getElementById('heroWrap');
const phoneCard = document.getElementById('phoneCard');

function updateScrollEffects() {
  const scrollTop = window.scrollY || window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;

  progressBar.style.width = `${progress * 100}%`;

  const heroProgress = Math.min(scrollTop / (window.innerHeight * 0.9), 1);
  const heroScale = 1 - heroProgress * 0.08;
  const heroTranslateY = heroProgress * 120;
  const heroOpacity = 1 - heroProgress * 0.65;
  const phoneTranslateY = heroProgress * -40;

  if (heroWrap) {
    heroWrap.style.transform = `translateY(${heroTranslateY}px) scale(${heroScale})`;
    heroWrap.style.opacity = `${heroOpacity}`;
  }

  if (phoneCard) {
    phoneCard.style.transform = `translateY(${phoneTranslateY}px)`;
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18
});

document.querySelectorAll('.reveal-on-scroll').forEach((element) => {
  observer.observe(element);
});

window.addEventListener('scroll', updateScrollEffects, { passive: true });
window.addEventListener('load', updateScrollEffects);
window.addEventListener('resize', updateScrollEffects);
