const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentIndex = 0;

function updateSlider() {
  slides.forEach((slide, index) => {
    let offset = index - currentIndex;
    
    if (offset < 0) {
      offset = offset + slides.length;
    }

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

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

updateSlider();