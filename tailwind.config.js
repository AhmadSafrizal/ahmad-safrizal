/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/private/**/*.{js,jsx,ts,tsx}",
    "./src/components/private/main/**/*.{js,jsx,ts,tsx}",
    "./src/components/private/main/navbar/Mavbar.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}