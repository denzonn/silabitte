/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4abdac', 
        'primaryHover': '#36ddc4', 
        'secondary': '#f7b733', 
        'text': '#dfdce3', 
      },
    },
  },
  plugins: [require("daisyui")],
}

