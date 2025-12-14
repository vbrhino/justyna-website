# Justyna Website

A modern, clean, and responsive public website built with pure HTML5 and CSS3.

## Features

- 📱 **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- 🎨 **Modern CSS** - Uses CSS Grid, Flexbox, and CSS Variables
- 🚀 **Fast & Lightweight** - No frameworks or dependencies
- ♿ **Accessible** - Semantic HTML5 markup
- 🎯 **Easy to Customize** - Clean code structure with CSS variables for theming

## Project Structure

```
justyna-website/
├── index.html          # Home page
├── about.html          # About page
├── contact.html        # Contact page with form
├── styles.css          # Main stylesheet
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Getting Started

### Viewing Locally

Simply open `index.html` in your web browser:

1. Navigate to the project directory
2. Double-click `index.html` or right-click and select "Open with" your preferred browser

### Using a Local Server (Recommended)

For the best experience, use a local web server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000`

## Customization

### Colors

All colors are defined as CSS variables in `styles.css`. You can easily change the color scheme by modifying the `:root` section:

```css
:root {
    --primary-color: #4a90e2;      /* Main brand color */
    --secondary-color: #2c3e50;    /* Secondary color */
    --accent-color: #e74c3c;       /* Accent color */
    --text-color: #333;            /* Text color */
    --light-bg: #f4f4f4;           /* Light background */
    --white: #ffffff;              /* White */
}
```

### Layout

The website uses a container-based layout with a max-width of 1200px. You can adjust this in the `.container` class in `styles.css`.

### Adding New Pages

1. Copy one of the existing HTML files (e.g., `about.html`)
2. Modify the content within the `<main>` section
3. Update the page title and meta description in the `<head>`
4. Add a link to the new page in the navigation menu of all pages

## Deployment

This website can be deployed to any static hosting service:

- **GitHub Pages**: Push to a GitHub repository and enable GitHub Pages
- **Netlify**: Drag and drop the folder or connect your repository
- **Vercel**: Connect your repository or use the CLI
- **Firebase Hosting**: Use Firebase CLI to deploy
- **Any web server**: Upload files via FTP/SFTP

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

This project is open source and available for anyone to use and modify.

## Contributing

Feel free to fork this project and customize it for your needs!