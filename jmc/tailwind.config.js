/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gov-blue': '#003366',
        'gov-orange': '#ff6600',
        'gov-light': '#f5f5f5',
        'gov-dark': '#1a1a1a',
        'gov-green': '#006400',
        'gov-gold': '#d4af37',
      },
    },
  },
  plugins: [],
}

