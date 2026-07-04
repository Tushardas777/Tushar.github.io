# ⚡ Quantum Minimalist - Premium Webpage Template

A clean, premium, and fully responsive webpage boilerplate built using standard HTML5, CSS3 variables, and modern vanilla JavaScript.

---

## 📁 File Structure

```text
├── index.html            # Main markup and structure of the website
├── assets/
│   ├── css/
│   │   └── style.css     # Styling, theme management, and animations
│   └── js/
│       └── main.js       # Dynamic UI interactions & form simulation
└── README.md             # Guide on how to edit and customize the files
```

---

## 🛠️ How to Edit & Customize

This boilerplate was built specifically to be easy to modify. Here is how you can customize the page:

### 1. Change Colors, Fonts, & Spacing
Open [style.css](file:///c:/Users/LuciferMorningStar/Desktop/Potfolio/Tushardas777.github.io-1/assets/css/style.css) and look at the `:root`, `.dark-theme`, and `.light-theme` variables at the top of the file:
* **Brand Theme Colors**: Change `--primary-color` or `--accent-color` (use hex codes or hsl values).
* **Typography**: Modify `--font-heading` or `--font-body` to import your preferred fonts.
* **Gradients**: Customize `--gradient-hero` to change the main colored gradients on the website.

### 2. Update Layout Content
Open [index.html](file:///c:/Users/LuciferMorningStar/Desktop/Potfolio/Tushardas777.github.io-1/index.html):
* **Hero Content**: Edit the `<h1>` and `<p>` elements under `<section id="hero">`.
* **Grid Items**: Modify the `<div class="feature-card">` containers to showcase your own services, features, or projects.
* **Form Action**: Set up your contact form submission by linking the `<form>` to an email service (like Formspree or static backends).

### 3. Add Custom Interactivity
Open [main.js](file:///c:/Users/LuciferMorningStar/Desktop/Potfolio/Tushardas777.github.io-1/assets/js/main.js):
* **Theme storage**: Manage how user preference settings are recorded.
* **Menu actions**: Customize the mobile navigation drawer behaviors.
* **Form feedback**: Edit the mocked latency parameters or success messages on form submission.

---

## 🚀 How to Run Locally

Since this template uses vanilla HTML/CSS/JS with zero external compilation requirements, you can preview the website instantly:
1. Double-click the [index.html](file:///c:/Users/LuciferMorningStar/Desktop/Potfolio/Tushardas777.github.io-1/index.html) file to open it in your browser.
2. Alternatively, run a simple local web server in the folder:
   * **Python**: `python -m http.server 8000` (Then visit `http://localhost:8000`)
   * **NodeJS**: `npx serve` (Then visit the displayed local URL)
