# Black & White Calculator

A minimal, self-contained calculator web application built with plain HTML, CSS, and JavaScript. The interface follows a strict black-and-white color scheme. The page can also display an image from a URL provided via the query parameter `?url=...`.

## Summary
- Pure front-end (no build tools, no frameworks)
- Clean and accessible UI using only black and white
- Keyboard support for fast input
- Optional image display via `?url=...` query parameter

## Setup
1. Download or clone this repository.
2. Open `index.html` in any modern web browser.

No additional dependencies or servers are required.

## Usage
- Click the on-screen buttons or use your keyboard.
  - Digits: 0–9
  - Decimal: .
  - Operators: +, -, *, /
  - Equals: = or Enter
  - Clear: Escape (or the C button)
  - Delete last character: Backspace (or the ⌫ button)
  - Percent: % (or the % button)
  - Toggle sign: ± button

### Display an image via URL
Append a `url` query parameter to the page address, for example:

```
index.html?url=https://example.com/image.png
```

If the image loads successfully, it will appear in the “External image” section at the top of the page.

## Project Structure
- `index.html` – Markup for the calculator and the optional image display.
- `style.css` – Black & white styles for a clean, accessible UI.
- `script.js` – Calculator logic, keyboard support, and image loading from `?url=...`.

## License
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
