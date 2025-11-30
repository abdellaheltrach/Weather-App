# Weather App

A modern, responsive weather application built with React and TypeScript that provides real-time weather information with geolocation support and multi-language capabilities.

## 🌐 Live Demo

Check out the live application: [https://weatherappelt.netlify.app/](https://weatherappelt.netlify.app/)

## ✨ Features

- **Real-time Weather Data** - Get current weather conditions for any location
- **Geolocation Support** - Automatically detect and display weather for your current location
- **Hourly Forecast** - View detailed hourly weather predictions
- **Multi-language Support** - Available in English and Arabic with automatic language detection
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI** - Clean and intuitive interface built with Tailwind CSS and Radix UI components
- **Accessibility** - ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **React 19** - Latest version with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **i18next** - Internationalization framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/abdellaheltrach/Weather-App.git
cd weather
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
bun run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
bun preview
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌍 Internationalization

The app supports multiple languages:

- English (en)
- Arabic (ar)

Language is automatically detected based on browser settings and can be switched within the app.

## 📄 License

This project is open source and available under the MIT License.
