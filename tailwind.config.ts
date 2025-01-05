import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'hs-blue-primary': 'rgba(0, 178, 255, 1)',
                'hs-blue-secondary': '#4F9AC6',
                'hs-card-bg': 'rgba(42, 68, 80, 1)',
                'hs-card-border': 'rgba(68, 93, 105, 1)',
                'hs-card-text': 'rgba(189, 228, 235, 1)',
                'hs-box-bg': 'rgba(255, 255, 255, 0.1)',
                'hs-box-title': 'rgba(255, 255, 255, 0.15)',

                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
} satisfies Config;
