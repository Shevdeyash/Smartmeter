const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  // Handle signup form submission.
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create the user with email and password.
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Update the user profile with the full name.
        return userCredential.user.updateProfile({
          displayName: fullName
        }).then(() => {
          // Store the email in localStorage so the login page can auto-populate it.
          localStorage.setItem("userEmail", email);
          alert("Account created successfully! Redirecting to login page...");
          window.location.href = "login.html"; // Adjust path if necessary.
        });
      })
      .catch((error) => {
        console.error("Signup Error:", error);
        alert("Error during signup: " + error.message);
      });
  });

  // (Optional) Toggle password visibility for signup form.
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const togglePasswordBtn = document.getElementById("togglePassword"); // Make sure this element exists in your HTML.
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        confirmPasswordInput.type = "text";
        togglePasswordBtn.textContent = "Hide Password";
      } else {
        passwordInput.type = "password";
        confirmPasswordInput.type = "password";
        togglePasswordBtn.textContent = "Show Password";
      }
    });
  }

  // GSAP animation for the signup container.
  gsap.from(".signup-container", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power2.out"
  });
});
