/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        AlexBrush: "'Alex Brush', cursive",
        Inconsolata: "'Inconsolata', monospace",
        bodyTextFontLato:  "'Lato', serif",
        bodyTextFontRaleway:  "'Raleway', serif",
      },
      colors: {
        primaryColor: '#0085C9',
        Headings:'#0f294d'
      },
      
      boxShadow: {
        primaryShadow: "1px 1px 10px #63626294"
      },
      backgroundColor: {
        primaryBgColor: '#3b82f6'
      }
    },
  },
  plugins: [require('daisyui')],
}

