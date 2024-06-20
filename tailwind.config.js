/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0A0A0A",
        white: "#F1F1F1",
        orange: "#FF9900",
        red: "#DD1B00",
        green: "#1DBF73",
        grey: "#95979D",
      },
    },
  },
  plugins: [],
};
