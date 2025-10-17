document.addEventListener('DOMContentLoaded', function() {
    var defaultImageUrl = 'https://via.placeholder.com/300x100?text=Captcha';
    var imageUrl = new URLSearchParams(window.location.search).get('url');
    document.getElementById('captchaImage').src = imageUrl || defaultImageUrl;
});