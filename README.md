# DataViz Dashboard

A real-time animated data visualization dashboard featuring glassmorphism UI, interactive charts, drag-to-reorder widgets, and seamless dark/light mode transitions.

![DataViz Dashboard](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)

## Preview

![Dashboard Preview](/public/preview.png)

## Features

- **6 KPI Cards** with animated number counters (Framer Motion) and sparkline charts
- **4 Chart Types** — Line, Bar, Pie/Donut, and Area charts with smooth draw/grow/sweep animations
- **Real-Time Data Simulation** — KPIs update every 3s, charts shift every 5s, notifications every 15-25s
- **Drag-to-Reorder** dashboard widgets using Framer Motion Reorder with layout persistence
- **Data Table** — sortable columns, pagination (10/25/50 rows), status badges with pulse animation
- **Dark/Light Mode** toggle with smooth CSS variable transitions and localStorage persistence
- **Glassmorphism Design** — `backdrop-blur(10px)`, semi-transparent cards, subtle shadows
- **Collapsible Sidebar** (280px to 64px) with active navigation indicator animation
- **Mobile Responsive** — hamburger menu, stacked layouts, touch-friendly (44x44px min taps)
- **Notification System** — auto-generated alerts, badge counter with pop animation, dismissable dropdown
- **Loading Skeletons** with shimmer animation across all widget types
- **Accessibility** — keyboard navigation, ARIA labels, `prefers-reduced-motion` support

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS v4, ShadCN/UI |
| Charts | Recharts |
| Animations | Framer Motion |
| State | Zustand |
| Icons | Lucide React |
| Dates | date-fns |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/KaranChandekar/data-viz-dashboard.git
cd data-viz-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.tsx            Root layout with theme and providers
  page.tsx              Main dashboard page
  providers.tsx         Data initialization and real-time simulation
  globals.css           Theme variables, glassmorphism, animations
components/
  layout/
    Sidebar.tsx         Collapsible sidebar + mobile drawer
    Header.tsx          Top bar with search, notifications, theme toggle
  dashboard/
    KPICard.tsx         KPI metric cards with animated counters
    DataTable.tsx       Sortable, paginated transaction table
    WidgetGrid.tsx      Drag-to-reorder widget container
  charts/
    ChartCard.tsx       Shared chart card wrapper
    LineChartWidget.tsx Line chart — daily revenue over 30 days
    BarChartWidget.tsx  Bar chart — sales by product category
    PieChartWidget.tsx  Donut chart — revenue distribution by region
    AreaChartWidget.tsx Area chart — user activity over time
  common/
    AnimatedCounter.tsx Framer Motion number animation
    ThemeToggle.tsx     Dark/light mode switch with icon rotation
    NotificationBell.tsx Bell icon with dropdown and badge
    LoadingSkeleton.tsx Shimmer loading placeholders
lib/
  store.ts              Zustand global state
  mock-data.ts          Data generators and real-time update functions
  animations.ts         Framer Motion animation variants
  utils.ts              Utility functions (cn)
```

## Customization

### Connecting Real APIs

Replace mock data generators in `lib/mock-data.ts` with API calls. Suggested free APIs:

- [DummyJSON](https://dummyjson.com) — users, products, posts
- [CoinGecko](https://www.coingecko.com/en/api) — cryptocurrency prices (no auth)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) — mock REST API

### Theme Colors

Edit CSS variables in `app/globals.css` under `:root` (light) and `.dark` (dark) selectors.

### Adding Widgets

1. Create a new chart/widget component in `components/`
2. Add the widget ID to the `WidgetId` type in `lib/store.ts`
3. Register it in the `widgetMap` in `components/dashboard/WidgetGrid.tsx`
4. Add its ID to the default `widgetOrder` array

## Deployment

Deploy to Vercel (optimized for Next.js):

```bash
npx vercel
```

No environment variables required — all data is simulated client-side.

## License

MIT