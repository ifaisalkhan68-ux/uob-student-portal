export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F5F0',
        green: { DEFAULT: '#1B4332', dark: '#122B21', light: '#2D5A44' },
        brass: { DEFAULT: '#B08D57', light: '#C9A96E' },
        slate: { DEFAULT: '#3A3F44' }
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
