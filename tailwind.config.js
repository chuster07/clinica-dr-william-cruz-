/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfc',
          100: '#ccfbf6',
          200: '#99f6ed',
          300: '#5ce8dc',
          400: '#2dd4c4',
          500: '#2c7873',
          600: '#246661',
          700: '#1e5450',
          800: '#184340',
          900: '#143835',
        },
        medical: {
          50: '#f0fdf7',
          100: '#dcfce9',
          200: '#bbf7d5',
          300: '#86efb0',
          400: '#6fb98f',
          500: '#4ade80',
          600: '#3cb371',
          700: '#2f9960',
          800: '#25804f',
          900: '#1e6a42',
        },
        accent: {
          purple: '#a855f7',
          pink: '#ec4899',
          orange: '#f97316',
          blue: '#3b82f6',
        },
        dark: {
          50: '#18181b',
          100: '#27272a',
          200: '#3f3f46',
          300: '#52525b',
          400: '#71717a',
          500: '#a1a1aa',
          600: '#d4d4d8',
          700: '#e4e4e7',
          800: '#f4f4f5',
          900: '#fafafa',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.8)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      }
    },
  },
  plugins: [],
}
