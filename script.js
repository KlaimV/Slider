const sections = document.querySelectorAll('.page-section');
let currentSectionIndex = 0;
let isScrolling = false;
sections[currentSectionIndex].classList.add('active-section');

window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  if (Math.abs(e.deltaY) < 25) return;

  if (e.deltaY > 0) {
    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
      changeSection();
    }
  } else {
    if (currentSectionIndex > 0) {
      currentSectionIndex--;
      changeSection();
    }
  }
}, { passive: true });

function changeSection() {
  isScrolling = true;
  sections.forEach((section, index) => {
    if (index === currentSectionIndex) {
      section.classList.add('active-section');
    } else {
      section.classList.remove('active-section');
    }
  });
  
  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

const slides3d = document.querySelectorAll('#slider3d .slide');
const nextBtn3d = document.getElementById('nextBtn3d');
const prevBtn3d = document.getElementById('prevBtn3d');
let index3d = 0;
let timer3d;

function updateSlider3d() {
  slides3d.forEach((slide, index) => {
    let offset = index - index3d;
    if (offset < 0) offset += slides3d.length;

    if (offset === 0) {
      slide.style.transform = "translate3d(0, 0, 0) scale(1)";
      slide.style.opacity = "1";
      slide.style.zIndex = "3";
      slide.style.filter = "blur(0px)";
    } else if (offset === 1) {
      slide.style.transform = "translate3d(40px, -20px, -50px) scale(0.9)";
      slide.style.opacity = "0.7";
      slide.style.zIndex = "2";
      slide.style.filter = "blur(2px)";
    } else if (offset === 2) {
      slide.style.transform = "translate3d(80px, -40px, -100px) scale(0.8)";
      slide.style.opacity = "0.4";
      slide.style.zIndex = "1";
      slide.style.filter = "blur(4px)";
    } else {
      slide.style.transform = "translate3d(120px, -60px, -150px) scale(0.7)";
      slide.style.opacity = "0";
      slide.style.zIndex = "0";
    }
  });
}

function startTimer3d() {
  clearInterval(timer3d);
  timer3d = setInterval(() => {
    index3d = (index3d + 1) % slides3d.length;
    updateSlider3d();
  }, 3000);
}

nextBtn3d.addEventListener('click', () => {
  index3d = (index3d + 1) % slides3d.length;
  updateSlider3d();
  startTimer3d();
});

prevBtn3d.addEventListener('click', () => {
  index3d = (index3d - 1 + slides3d.length) % slides3d.length;
  updateSlider3d();
  startTimer3d();
});

const wideSlides = document.querySelectorAll('.wide-slide');
const wideNext = document.getElementById('wideNext');
const widePrev = document.getElementById('widePrev');
const wideDotsContainer = document.getElementById('wideDots');
let wideIndex = 0;
let timerWide;

wideSlides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('wide-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToWideSlide(i));
  wideDotsContainer.appendChild(dot);
});

const wideDots = document.querySelectorAll('.wide-dot');

function updateWideSlider() {
  wideSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === wideIndex);
    wideDots[i].classList.toggle('active', i === wideIndex);
  });
}

function startTimerWide() {
  clearInterval(timerWide);
  timerWide = setInterval(() => {
    wideIndex = (wideIndex + 1) % wideSlides.length;
    updateWideSlider();
  }, 3000);
}

function goToWideSlide(index) {
  wideIndex = index;
  updateWideSlider();
  startTimerWide();
}

wideNext.addEventListener('click', () => {
  wideIndex = (wideIndex + 1) % wideSlides.length;
  updateWideSlider();
  startTimerWide();
});

widePrev.addEventListener('click', () => {
  wideIndex = (wideIndex - 1 + wideSlides.length) % wideSlides.length;
  updateWideSlider();
  startTimerWide();
});

updateSlider3d();
updateWideSlider();
startTimer3d();
startTimerWide();