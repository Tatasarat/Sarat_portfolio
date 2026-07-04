/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#10121A',
        surface: '#171A24',
        surface2: '#1D2130',
        edge: '#2A2F40',
        edgeStrong: '#5D6478',
        muted: '#8890A6',
        muted2: '#5D6478',
        accent: '#7CE38B',
        accentDim: '#4E9E62',
        amber: '#E8A33D',
        rose: '#E5677E',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        content: '920px',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
      },
    },
  },
  plugins: [],
}