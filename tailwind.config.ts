import type { Config } from "tailwindcss";

const config: Config = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#1A1A1A',
            light: '#2A2A2A',
            dark: '#0F0F0F',
          },
          accent: {
            DEFAULT: '#D4383B',
            light: '#E85A5C',
            dark: '#B22E31',
          },
          warm: {
            DEFAULT: '#C97B4A',
            light: '#D9956B',
            dark: '#A86439',
          },
          surface: {
            DEFAULT: '#F5F0EB',
            dark: '#E8E0D8',
          },
        },
        fontFamily: {
          display: ['Playfair Display', 'serif'],
          body: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }

export default config;