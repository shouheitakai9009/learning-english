import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans JP', ...defaultTheme.fontFamily.sans],
        'noto': ['Noto Sans JP']
      },
    },
  },
  plugins: [],
}

