module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          ' 0% ': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      },

      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      colors: {
        theme: '#f15a24',
        hover_color: '#ec6737',
        theme_gray: '#F1F1F1',
        theme_light: '#f37d52',
        theme_extra_light: '#f37a4e',
        primary: '#8e24aa',
        facebook: '#3b5999',
        twitter: '#55acee',
        linkedin: '#0077b5',
        instagram: '#e4405f',
        whatsapp: '#25d366',
        youtube: '#cd201f',
        nav: '#f15a24',
      },
    },
  },
  plugins: [
    require('tailwindcss-scoped-groups'),
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
}
