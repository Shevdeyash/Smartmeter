import { googleSignIn } from "./googleAuth.js";
import { handleLogin } from "./loginBtn.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  } else {
    console.warn("Login form not found.");
  }
});

// Eye toggle remains the same
function togglePassword() {
  const passwordInput = document.getElementById("passwordInput");
  const eyeIcon = document.getElementById("eyeIcon");
  if (!passwordInput || !eyeIcon) return;

  const isPasswordHidden = passwordInput.type === "password";
  passwordInput.type = isPasswordHidden ? "text" : "password";
  eyeIcon.classList.toggle("fa-eye");
  eyeIcon.classList.toggle("fa-eye-slash");
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleLogin(); // Call the logic from loginBtn.js
    });
  }

  const eyeIcon = document.getElementById("eyeIcon");
  if (eyeIcon) {
    eyeIcon.addEventListener("click", togglePassword);
  }

  const loginImg = document.getElementById("loginImg");
  const loginImageContainer = document.querySelector(".login-image");
  if (loginImg && loginImageContainer) {
    loginImageContainer.addEventListener("mousemove", (e) => {
      const { offsetWidth: w, offsetHeight: h } = loginImageContainer;
      const { offsetX: x, offsetY: y } = e;
      const moveX = ((x - w / 2) / (w / 3)) * 3;
      const moveY = ((y - h / 2) / (h / 3)) * 3;

      gsap.to(loginImg, {
        duration: 0.3,
        rotationY: moveX,
        rotationX: -moveY,
        x: moveX * 2,
        y: -moveY * 2,
        scale: 1.05,
        ease: "power2.out"
      });
    });

    loginImageContainer.addEventListener("mouseleave", () => {
      gsap.to(loginImg, {
        duration: 0.3,
        rotationY: 0,
        rotationX: 0,
        x: 0,
        y: 0,
        scale: 1,
        ease: "power2.out"
      });
    });
  }

  gsap.from(".login-form", {
    opacity: 0,
    x: 50,
    duration: 1,
    ease: "power2.out"
  });

  const googleSignInBtn = document.getElementById("googleSignIn");
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener("click", googleSignIn);
  }
});

export { togglePassword };
