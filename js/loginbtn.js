function handleLogin(event) {
    event.preventDefault(); // Prevent actual form submission
  
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
  
    const email = usernameInput?.value.trim();
    const password = passwordInput?.value.trim();
  
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    window.location.href = "../pages/dashboard.html";
  }
  
  export { handleLogin };
  