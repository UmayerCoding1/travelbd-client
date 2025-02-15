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
        Inconsolata: "'Inconsolata', monospace"
      },
      colors: {
        primaryColor: '#0085C9'
      },
      
      boxShadow: {
        primaryShadow: "1px 1px 20px #63626294"
      },
      backgroundColor: {
        primaryBgColor: '#3b82f6'
      }
    },
  },
  plugins: [require('daisyui')],
}

