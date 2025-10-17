const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');
let currentInput = '';

buttons.forEach(button => {
    button.addEventListener('click', event => {
        const value = event.target.value;

        if (value === 'all-clear') {
            currentInput = '';
            calculatorScreen.value = currentInput;
        } else if (value === '=') {
            try {
                currentInput = eval(currentInput).toString();
            } catch (e) {
                currentInput = 'Error';
            }
            calculatorScreen.value = currentInput;
        } else {
            currentInput += value;
            calculatorScreen.value = currentInput;
        }
    });
});

// Function to display image from URL parameter
function displayImageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get('url');
    if (imageUrl) {
        const imageElement = document.getElementById('image-from-url');
        imageElement.src = imageUrl;
    }
}

// Load image on page load
window.onload = displayImageFromURL;