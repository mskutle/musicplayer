/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gotham: ["Gotham", "sans-serif"],
      },
      colors: {
        green: {
          spotify: "rgb(30, 215, 96)",
        },
      },
    },
  },
  plugins: [],
};
