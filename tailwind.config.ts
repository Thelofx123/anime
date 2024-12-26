import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(card|ripple).js",
  ],
  prefix: "",
  theme: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        h1: ["4rem", "4.8rem"],
        "h1-md": ["8.333vw", "10vw"],
        "h1-lg": ["7.5rem", "9rem"],
        "h1-2xl": ["8.333vw", "10vw"],

        h2: ["3rem", "3.6rem"],
        "h2-md": ["6.250vw", "7.500vw"],
        "h2-lg": ["5.25rem", "6.3rem"],
        "h2-2xl": ["5.833vw", "7vw"],

        h3: ["2rem", "2.4rem"],
        "h3-md": ["4.167vw", "5vw"],
        "h3-lg": ["4rem", "4.8rem"],
        "h3-2xl": ["4.444vw", "5.333vw"],

        h4: ["1.5rem", "1.8rem"],
        "h4-md": ["3.125vw", "3.750vw"],
        "h4-lg": ["2rem", "2.4rem"],
        "h4-2xl": ["2.222vw", "2.667vw"],

        h5: ["1.125rem", "1.35rem"],
        "h5-md": ["2.344vw", "2.813vw"],
        "h5-lg": ["1.5rem", "2rem"],
        "h5-2xl": ["1.667vw", "2.222vw"],

        "body-text": ["0.75rem", "1.05rem"],
        "body-text-md": ["1.563vw", "2.188vw"],
        "body-text-lg": ["0.875rem", "1.225rem"],
        "body-text-2xl": ["0.972vw", "1.361vw"],

        "body-large": ["0.875rem", "1.225rem"],
        "body-large-md": ["1.823vw", "2.552vw"],
        "body-large-lg": ["1rem", "1.4rem"],
        "body-large-2xl": ["0.972vw", "1.361vw"],
        "body-large-16-2xl": ["1.111vw", "1.556vw"],

        "body-small": ["0.75rem", "1.05rem"],
        "body-small-md": ["1.563vw", "2.188vw"],
        "body-small-lg": ["0.875rem", "1.225rem"],
        "body-small-2xl": ["0.972vw", "1.361vw"],

        caption: ["0.75rem", "1.05rem"],
        "caption-md": ["1.563vw", "2.214vw"],
        "caption-lg": ["0.75rem", "1.05rem"],
        "caption-2xl": ["0.833vw", "1.167vw"],

        "utility-large": ["0.875rem", "0.963rem"],
        "utility-large-2xl": ["0.972vw", "1.069vw"],

        "utility-small": ["0.75rem", "0.9rem"],
        "utility-small-2xl": ["0.833vw", "1vw"],
      },
      textColor: {
        primary: "var(--text-primary)",
      },
      spacing: {
        navigation: "13.5px",

        10: "0.625rem",
        "10-md": "1.302vw",
        "10-2xl": "0.694vw",

        20: "1.25rem",
        "20-md": "2.604vw",
        "20-2xl": "1.389vw",

        30: "1.875rem",
        "30-md": "3.906vw",
        "30-2xl": "2.083vw",

        40: "2.5rem",
        "40-md": "5.208vw",
        "40-2xl": "2.778vw",

        60: "3.75rem",
        "60-md": "7.813vw",
        "60-2xl": "4.167vw",
      },
      letterSpacing: {
        widest: "0.08rem",
        wide: "0.02em",
      },
      safelist: [
        {
          pattern:
            /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
          variants: ["hover", "ui-selected"],
        },
        {
          pattern:
            /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
          variants: ["hover", "ui-selected"],
        },
        {
          pattern:
            /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
          variants: ["hover", "ui-selected"],
        },
        {
          pattern:
            /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
          pattern:
            /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
          pattern:
            /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
      ],
      screens: {
        tablet2: { min: "767px", max: "1305px" },
        "2xl": { min: "1441px" },
        "value-prop": { min: "1100px" },
        homePad: { min: "767px", max: "1024px" },
        homeDesk: { min: "1025px", max: "1440px" },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
} satisfies Config;

export default config;
