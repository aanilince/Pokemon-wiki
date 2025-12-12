export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          50: '#f9f8f4',
          100: '#f0ede6',
          200: '#e0dcd3',
          300: '#c8c2b5',
          400: '#a39b8b',
          500: '#857b6c',
          600: '#696053',
          700: '#524a41',
          800: '#423c35',
          900: '#36312c',
          accent: '#c05621',
        },
        tcg: {
          yellow: '#d4b483', // Muted gold/parchment
          blue: '#4a3b32',   // Deep leather brown (formerly blue)
          paper: '#f3f0e0',  // Cream paper
          dark: '#2c241b',   // Dark sepia text
          holofoil: '#e8dcb5', // Soft highlight
          red: '#8c3324',      // Vintage red
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Lora"', 'serif'],
      }
    },
  },
  plugins: [],
}
