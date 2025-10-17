document.addEventListener('DOMContentLoaded', function () {
    var imageUrl = new URLSearchParams(window.location.search).get('url');
    var imageElement = document.getElementById('captchaImage');
    imageElement.src = imageUrl ? imageUrl : 'https://via.placeholder.com/150';
});