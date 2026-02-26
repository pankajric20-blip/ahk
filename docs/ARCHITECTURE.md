# Architecture

Three-layer architecture:
- Client Layer (Web + Mobile): Next.js 15 App Router & Expo Router with UI built on Tailwind CSS, NativeWind, shadcn/ui.
- API Layer: Next.js API Routes, Supabase Client SDK, Edge Functions.
- Data Layer: Supabase PostgreSQL, Storage, Realtime, n8n Automation.
- External Services: Razorpay (Payments), OneSignal/Interakt (Push/WhatsApp notifications), Clearbit (Logos).

Monorepo is implemented with Turborepo and pnpm workspaces.
