/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["BrunoAceSC"],
        impact: ["impact"],
        kicker: ["kicker"],
        nikea: ["NIKEA"],
        eudoxussans: ["EudoxusSans"],
        hanyTrial: ["HanyTrial"],
        tommy: ["Tommy"],
        ortland: ["Ortland"],
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(136deg, #1b1b1b, #000000)",
      },
      backgroundSize: {
        120: "120% 120%",
      },
      keyframes: {
        "gradient-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 6s ease infinite",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },

      },

      boxShadow: {
        neumorphic: `
          -15px -15px 15px rgba(0, 0, 0, 0.2),
          15px 15px 15px rgba(0, 0, 0, 0.1),
          inset -5px -5px 5px rgba(0, 0, 0, 0.2),
          inset 5px 5px 5px rgba(0, 0, 0, 0.1)
        `,
      },
    },
  },
  plugins: [],
};
