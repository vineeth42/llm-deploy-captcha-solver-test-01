document.addEventListener('DOMContentLoaded', function() {
    var imageUrl = new URLSearchParams(window.location.search).get('url') || 'https://via.placeholder.com/300?text=Captcha';
    document.getElementById('captchaImage').src = imageUrl;
});