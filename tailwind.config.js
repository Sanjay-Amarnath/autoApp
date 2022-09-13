/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./",
  ],
  theme: {
    extend: {
      height: {
        "100vh": "100vh",
        "235px": "235px",
        "40":"40%",
        "30":"30%",
      },
      width: {
        "100": "100%",
        "70": "70%",
        "30":"30%",
        screen: "100vw",
      },
    },
  },
  plugins: [],
};
