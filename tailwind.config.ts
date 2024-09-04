import type { Config } from "tailwindcss";

type DaisyUITheme = {
  [key: string]: string | Record<string, string>;
};

const addCustomStyle = (theme: DaisyUITheme) => ({
  ...theme,
  fontFamily: "Satoshi",
  ".btn-nav-link": {
    "border-color": "transparent",
    "background-color": "transparent",
  },
  ".btn-nav-link:hover": {
    "border-color": "transparent",
    "background-color": "transparent",
  },
});

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
    themes: [
      {
        dark: addCustomStyle({ ...require("daisyui/src/theming/themes")["dark"] }),
        light: addCustomStyle({ ...require("daisyui/src/theming/themes")["light"] }),
      },
    ],
  },
};
export default config;
