import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    dark: { ...require("daisyui/src/theming/themes").dark, fontFamily: "Satoshi" },
    light: { ...require("daisyui/src/theming/themes").light, fontFamily: "Satoshi" },
  },
};
export default config;
