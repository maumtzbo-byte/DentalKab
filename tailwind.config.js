/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF5EC",
          2: "#F4E8D8",
        },
        ink: {
          900: "#3D2B1F",
          700: "#6B4E37",
          500: "#967856",
        },
        ochre: {
          DEFAULT: "#A8703F",
          dark: "#7C5228",
        },
        coffee: {
          DEFAULT: "#5B4B3D",
          dark: "#463A2F",
        },
        peach: {
          DEFAULT: "#EFA671",
          dark: "#DC8A52",
          light: "#FBE0C7",
        },
        line: "#E6D6BE",
      },
    },
  },
  plugins: [],
};
