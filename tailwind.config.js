/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    colors: {
      "light-beige": "#FFFBF3",
      "burgundy": "#540D2A",
      "middle-green": "#540D2A",
      "dark-brown": "#3A3228",
      "light-burgundy": "#992350",
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"],
  }
}
