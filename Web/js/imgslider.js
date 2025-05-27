
  document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("slideTrack");
    const dots = document.querySelectorAll(".dot");
    const slideCount = dots.length;
    let current = 0;

    function goToSlide(index) {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
      current = index;
    }

    function startAutoSlide() {
      setInterval(() => {
        const next = (current + 1) % slideCount;
        goToSlide(next);
      }, 3000);
    }

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        goToSlide(parseInt(dot.dataset.index));
      });
    });

    goToSlide(0);
    startAutoSlide();
  });

