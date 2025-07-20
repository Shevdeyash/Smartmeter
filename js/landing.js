document.addEventListener("DOMContentLoaded", function() {
    // Slideshow setup
    const slides = document.querySelectorAll(".slide");
    let index = 0;
    function changeSlide() {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }
    setInterval(changeSlide, 4000);
    gsap.from(".hero-text", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power2.out"
    });
    gsap.from(".features-dropdown", {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: "power2.out"
    });
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownContent = document.querySelector(".dropdown-content");
    
    dropdownToggle.addEventListener("click", function() {
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  });  