document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Load Dark Mode Preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    // Toggle Dark Mode
    darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });

    // Profile Picture Upload
    document.getElementById("uploadProfilePic").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("profilePic").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Logout Button
    document.querySelector(".logout-btn").addEventListener("click", () => {
        alert("Logging out...");
        window.location.href = "../index.html";
    });

    // Delete Account
    document.querySelector(".danger-btn").addEventListener("click", () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone!")) {
            alert("Account Deleted.");
            window.location.href = "../index.html";
        }
    });
});