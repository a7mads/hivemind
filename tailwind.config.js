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
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        hivemind: {
          black: '#1a1a1a',
          green: {
            DEFAULT: '#2e7d32',
            light: '#4caf50',
            dark: '#1b5e20'
          },
          white: '#ffffff',
        }
      },
      fontFamily: {
        rajdhani: ['var(--font-rajdhani)'],
      },
    },
  },
  plugins: [],
}; 