/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 1rem 2rem rgba(0, 0, 0, 0.15)",
      },
      translate: {
        "-0.5": "-2px",
      },
      transformOrigin: {
        "origin-top-left": "top left",
      },
    },
  },
  plugins: [],
};
