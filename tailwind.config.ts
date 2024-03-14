import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        top: "0 -1px 3px 0 rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        page: "75vw",
        "page-small": "50vw",
      },
      zIndex: {
        lower: "0",
        base: "10",
        higher: "20",
        "modal-backdrop": "30",
        modal: "40",
        "modal-prio-backdrop": "50",
        "modal-prio": "60",
        tooltip: "70",
        "modal-top-prio-backdrop": "80",
        "modal-top-prio": "90",
        "tooltip-prio": "100",
        "top-prio": "110",
        maximum: "99999",
      },
    },
  },
  plugins: [],
};
export default config;
