# City Agent 🗺️

AI-powered neighborhood discovery platform. Find the neighborhood that fits your life.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Google Fonts (Inter + Fraunces)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
city-agent/
├── app/
│   ├── layout.tsx       # Root layout + fonts + metadata
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles + design tokens
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ExamplePrompts.tsx
│   ├── HowItWorks.tsx
│   ├── NeighborhoodCards.tsx
│   ├── ChatDemo.tsx
│   └── GlobalCoverage.tsx
├── lib/
│   └── data.ts          # All content/data
├── types/
│   └── index.ts         # TypeScript interfaces
├── tailwind.config.ts
└── tsconfig.json
```

## Deploy to Vercel
```bash
npm i -g vercel
vercel
```
