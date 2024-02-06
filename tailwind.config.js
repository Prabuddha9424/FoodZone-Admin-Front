/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "var(--primary-color)",
        WarningColor: "var(--warning-color)",
        BackgroundColor: "var(--background-color)",
        textColor:"var(--text-color)",
        backgroundYellow:"var(--background-yellow)"
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
      }
    },

  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
}

