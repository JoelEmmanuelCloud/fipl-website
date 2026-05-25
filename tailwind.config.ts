import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#E03027', dark: '#C0231A' },
        accent: '#F47820',
        fipl: { dark: '#13132B' },
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-fipl': 'linear-gradient(135deg, #E03027 0%, #F47820 100%)',
      },
    },
  },
  plugins: [],
}
export default config
