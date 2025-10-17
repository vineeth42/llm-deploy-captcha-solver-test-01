document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get("url") || "https://via.placeholder.com/300x150?text=Placeholder";
    const captchaImage = document.getElementById("captcha-image");
    captchaImage.src = imageUrl;
});