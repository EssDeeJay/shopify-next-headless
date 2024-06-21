import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/preline.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#046a38',
        secondary: '#82bc00',
        text: '#24272a',
        lightGrey: '#e8e5de'
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};
export default config;