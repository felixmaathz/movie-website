/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      primary: '#032539',
      accent: '#fa991c',
      secondary: '#fbeceb'

    },
    fontFamily: {
      'quicksand': ['quicksand', 'sans-serif'],

    },
  },
  }
export const plugins = [];