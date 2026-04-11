/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Gap values
    'gap-[0rem]',
    'gap-[0.25rem]',
    'gap-[0.5rem]',
    'gap-[1rem]',
    'gap-[1.5rem]',
    'gap-[2rem]',
    'gap-[3rem]',
    'gap-[4rem]',
    // Flexbox justify-content
    'justify-start',
    'justify-center',
    'justify-end',
    'justify-between',
    'justify-around',
    'justify-evenly',
    // Flexbox align-items
    'items-start',
    'items-center',
    'items-end',
    'items-stretch',
    'items-baseline',

    // Flexbox align-content
    'content-start',
    'content-center',
    'content-end',
    'content-between',
    'content-around',
    'content-evenly',
    'content-stretch',

    // Grid columns
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-6',
    // Grid rows
    'grid-rows-1',
    'grid-rows-2',
    'grid-rows-3',
    // Place items
    'place-items-start',
    'place-items-center',
    'place-items-end',
    'place-items-stretch',
    // Grid justify-items
    'justify-items-start',
    'justify-items-center',
    'justify-items-end',
    'justify-items-stretch',
    // Grid align-items
    'items-start',
    'items-center',
    'items-end',
    'items-stretch',
    'items-baseline',
    // Grid justify-content
    'justify-normal',
    'justify-start',
    'justify-center',
    'justify-end',
    'justify-between',
    'justify-around',
    'justify-evenly',
    // Grid align-content
    'content-normal',
    'content-start',
    'content-center',
    'content-end',
    'content-between',
    'content-around',
    'content-evenly',
    'content-stretch',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fredoka', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#2563eb', // Tailwind blue-600
        },
      },
    },
  },
  plugins: [],
};