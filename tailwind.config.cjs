/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        strongBlue: "#2b4f71",
        darkGrayishBlue: "#657a97",
        grayishBlue: "#c9cfdf",
      },
      animation: {
        slideBot: "slideBot 400ms ease 400ms backwards",
        slideTop: "slideTop 400ms ease-out forwards",
        bump: "bump 300ms ease-out",
      },
      keyframes: {
        slideBot: {
          "0%": {
            opacity: "0",
            transform: "translateY(3rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideTop: {
          "0%": { opacity: "0", transform: "translate(-50%,50%)" },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-25%)",
          },
        },
        bump: {
          "0%": { transform: "scale(1)" },
          "10%": { transform: "scale(0.9)" },
          "30%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
