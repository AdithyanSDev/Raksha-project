/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        "chat-bg": "#f9fafb", // Chat application background
        "chat-bubble-sent": "#3b82f6", // Sent message bubble
        "chat-bubble-received": "#e5e7eb", // Received message bubble
        "modal-bg": "#ffffff", // Modal background
        "modal-overlay": "rgba(0, 0, 0, 0.5)", // Modal overlay color
      },
      boxShadow: {
        "modal": "0px 4px 6px rgba(0, 0, 0, 0.1)", // Modal shadow
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out",
        "slide-in": "slide-in 0.8s ease-out",
      },
    },
  },
  plugins: [],
};
