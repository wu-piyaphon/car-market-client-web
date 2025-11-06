# Car Marketplace - Client Web

[![My Skills](https://skillicons.dev/icons?i=nextjs,react,tailwind,ts,html,css)](https://skillicons.dev)

## Overview
![Homepage Screenshot](https://car-market-storage-bucket.s3.ap-southeast-7.amazonaws.com/port/Screenshot+2568-10-18+at+15.52.25.png?raw=true)

A car marketplace connecting car buyers and sellers through a web platform. Built with modern technologies and designed specifically for the Thai market, featuring intelligent search, financial form request, and comprehensive car listing.

![Car Listing Screenshot](https://car-market-storage-bucket.s3.ap-southeast-7.amazonaws.com/port/Screenshot+2568-10-18+at+15.59.49.png?raw=true)

Allows users to search an extensive car database using facet filters. The search results are displayed in a list of car cards, each with a thumbnail, title, price, and a link to the car detail page.

## 🌟 Features

- **Smart Search**: Multi-parameter filtering by brand, model, type, and price with instant results
- **Digital Content**: Car listing and detail displayed responsively with pagination for seamless UX/UI
- **Financial Services**: Loan calculator and professional vehicle valuation form requests
- **Mobile-First**: Responsive design with touch-optimized interface and PWA capabilities

## ⚙️ Tech Stack

### Frontend Framework
- **Next.js 15** - React framework with App Router and Turbopack integration
- **React 19** - Latest React version with concurrent features
- **TypeScript** - Type-safe development with strict mode

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework for rapid development
- **Shadcn/ui** - Copy-paste component library built on Radix UI primitives
- **Radix UI** - Headless, accessible component primitives
- **Lucide React** - Scalable vector icon library
- **Class Variance Authority** - Type-safe component variant management

### Form Management & Validation
- **React Hook Form** - High-performance forms with minimal re-renders
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Seamless form validation integration

### Development Tools
- **Biome** - Unified toolchain for linting, formatting, and code analysis
- **Lefthook** - Git hooks automation and workflow management
- **Turbopack** - High-performance bundler for optimized build processes  

## 📂 Project Structure

```
car-market-client-web/
├── app/                     # Next.js App Router pages
├── components/              # Reusable UI components
│   ├── hook-forms/          # Form components with validation
│   ├── ui/                  # Design system components
│   ├── layout/              # Navigation and structure
│   └── sections/            # Page-specific sections
├── hooks/                   # Custom React hooks and API
├── lib/                     # Utilities and configurations
├── types/                   # TypeScript definitions
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/wu-piyaphon/car-market-client-web.git
cd car-market-client-web
```

2. **Install dependencies**
```bash
yarn install
```

3. **Environment setup**
```bash
   cp .env.example .env.local
   # Configure your environment variables
```

4. **Start the development server**
```bash
yarn dev
```

5. **Open your browser and navigate to `http://localhost:3000`**

### Scripts
```bash
yarn dev        # Development server with Turbopack
yarn build      # Production build
yarn start      # Production server
yarn lint       # Code analysis with Biome
yarn format     # Code formatting
```

## 📌 Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with search and featured listings |
| `/cars` | Vehicle browsing with filtering |
| `/cars/[slug]` | Detailed vehicle information |
| `/loan-calculator` | Financial planning tools |
| `/car-valuation` | Vehicle appraisal services |
| `/car-selling` | Vehicle listing platform |
