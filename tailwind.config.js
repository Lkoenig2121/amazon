/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'amazon-orange': '#FF9900',
        'amazon-blue': '#232F3E',
        'amazon-yellow': '#FFD814',
        'amazon-dark': '#131921',
        'amazon-light': '#F3F3F3',
      },
    },
  },
  plugins: [],
}


