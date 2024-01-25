/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
    colors: {
      'custom-01': '#313866',
      'custom-02': '#50409a',
      'custom-03': '#9643c2',
      'custom-04': '#ff7bbf',
    },
     extend: {},
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }
