localStorage.setItem("data", JSON.stringify([])); 

document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const togglePasswordIcon = document.getElementById("togglePassword");

    togglePasswordIcon.addEventListener("click", function() {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePasswordIcon.classList.toggle("fa-eye-slash", type === "text");
  });
    const consentBox = document.querySelector(".wrapper");
    const understandBtn = consentBox.querySelector(".item");

    understandBtn.addEventListener("click", function() {
    consentBox.style.display = "none";
  });
});