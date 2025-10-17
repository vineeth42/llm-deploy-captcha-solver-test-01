document.addEventListener('DOMContentLoaded', function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const imageUrl = urlParams.get('url') || 'https://via.placeholder.com/300x200?text=Captcha';
    document.getElementById('captchaImage').src = imageUrl;
});