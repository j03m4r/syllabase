import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'brown': '#755330',
      'white': '#ffffff',
      'black': '#000000',
      'beige': '#ffffe4',
      'offWhite': '#f5f5f5',
      'meteorite': '#371F76',
      'lavender': '#CFBDFF',
      'periwinkle': '#E5DBFF',
      'darkpurple': '#291E42',
      'lightpink': '#E4BDFF',
      'pink': '#FFBDE0',
      'cyan': '#9ADFED',
      'lightblue': '#BDEAFF',
      'mint': '#99edc3',
      'lime': '#ACED9A',
      'yellow': '#EDEC9A',
      'khaki': '#EDD89A',
      'spotifyGreen': '#1ED760'
    },
  },
  plugins: [],
}
export default config
