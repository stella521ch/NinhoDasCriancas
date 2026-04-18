import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "var(--font-sans)", "serif"],
      },
      boxShadow: {
        "glow-sm": "0 0 0 1px oklch(0.75 0.12 85 / 0.35), 0 8px 28px -8px oklch(0.55 0.1 150 / 0.35)",
        glow: "0 0 0 1px oklch(0.78 0.14 85 / 0.45), 0 12px 40px -10px oklch(0.5 0.1 150 / 0.45)",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, oklch(0.9 0.08 145 / 0.55) 0%, oklch(0.94 0.06 85 / 0.5) 48%, oklch(0.9 0.1 35 / 0.35) 100%)",
      },
    },
  },
  plugins: [typography],
};
export default config;
