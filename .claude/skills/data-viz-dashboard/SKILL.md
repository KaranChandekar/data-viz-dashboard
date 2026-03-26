---
name: data-viz-dashboard
description: Build an animated real-time data visualization dashboard with glassmorphism UI, animated charts, number counters, drag-to-reorder widgets, and dark/light mode transitions. Use this skill when building analytics dashboards, admin panels, data visualization apps, or SaaS dashboard UIs. Trigger when the user mentions dashboard, analytics UI, data visualization, KPI cards, animated charts, glassmorphism dashboard, or admin panel with animations.
---

# Real-Time Data Visualization Dashboard Skill

## Overview
This skill guides you through building a modern, animated data visualization dashboard with real-time updates, smooth animations, and interactive widgets. Perfect for analytics platforms, admin panels, and SaaS applications that need to display and track key performance indicators.

## Tech Stack

### Core Framework
- **Next.js 15** with App Router
- **React 19** for component architecture
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling

### State Management & Animation
- **Zustand** for lightweight global state (chart data, theme)
- **Framer Motion** for component animations and drag interactions
- **GSAP** (alternative to Framer) for counter animations and complex effects

### Data Visualization
- **Recharts** for charts (line, bar, pie, area, etc.)
- **date-fns** for date formatting

### UI Components & Styling
- **ShadCN/UI** for pre-built accessible components
- **Tailwind CSS v4** with custom configuration
- **lucide-react** for icons

### Development Tools
- **@hookform/react** for form handling (optional)
- **clsx** or **classnames** for dynamic class generation

## Project Structure

```
03-data-viz-dashboard/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── providers.tsx (Framer Motion, Zustand setup)
├── components/
│   ├── Layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── MainContent.tsx
│   ├── Dashboard/
│   │   ├── KPICard.tsx
│   │   ├── ChartCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── WidgetGrid.tsx
│   │   └── ReorderableWidget.tsx
│   ├── Charts/
│   │   ├── LineChartWidget.tsx
│   │   ├── BarChartWidget.tsx
│   │   ├── PieChartWidget.tsx
│   │   └── AreaChartWidget.tsx
│   ├── Common/
│   │   ├── LoadingSkeleton.tsx
│   │   ├── NotificationBell.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ModeToggle.tsx
│   └── Dialogs/
│       └── WidgetSettings.tsx
├── lib/
│   ├── store.ts (Zustand store)
│   ├── animations.ts
│   ├── mock-data.ts
│   └── utils.ts
├── public/
│   └── icons/
└── package.json
```

## Color System & Theming

### Dark Mode (Default)
- **Background Primary**: `#0f172a` (slate-900)
- **Background Secondary**: `#1e293b` (slate-800)
- **Card Background**: `rgba(15, 23, 42, 0.6)` with backdrop-blur
- **Border**: `rgba(148, 163, 184, 0.2)` (slate-400 transparent)
- **Text Primary**: `#f1f5f9` (slate-100)
- **Text Secondary**: `#cbd5e1` (slate-300)
- **Accent**: `#3b82f6` (blue-500)
- **Success**: `#10b981` (emerald-500)
- **Warning**: `#f59e0b` (amber-500)
- **Error**: `#ef4444` (red-500)

### Light Mode
- **Background Primary**: `#ffffff`
- **Background Secondary**: `#f8fafc` (slate-50)
- **Card Background**: `rgba(255, 255, 255, 0.8)` with backdrop-blur
- **Border**: `rgba(148, 163, 184, 0.3)` (slate-300)
- **Text Primary**: `#0f172a` (slate-900)
- **Text Secondary**: `#475569` (slate-600)
- **Accent**: `#2563eb` (blue-600)

### CSS Variables for Dynamic Theming
```css
:root {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --accent: #3b82f6;
  --border: rgba(148, 163, 184, 0.2);
}

html[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --accent: #2563eb;
  --border: rgba(148, 163, 184, 0.3);
}
```

### CSS Transition for Theme Switch
```css
* {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
```

## Dashboard Layout

### Sidebar Navigation
- Fixed or collapsible sidebar (toggle with hamburger button)
- Width: 280px (desktop), collapses to 64px (desktop), hidden on mobile
- Contains:
  - Logo/brand at top
  - Navigation links: Dashboard, Analytics, Reports, Settings, Help
  - Active link indicator: slide animation (right border or background highlight)
  - User profile section at bottom (optional)
- Animation: collapse/expand with smooth width transition (0.3s)
- Mobile: hamburger menu that slides in from left with overlay

### Header Section
- Fixed at top (below sidebar on desktop)
- Contains:
  - Page title/breadcrumb
  - Search bar (optional)
  - Notification bell with badge counter
  - Theme toggle (dark/light mode)
  - User profile dropdown
- Height: 64px
- Background: semi-transparent with glassmorphism (backdrop-blur)
- Notification bell:
  - Red badge with counter (e.g., "3" for 3 notifications)
  - Badge animates pop-in when count changes (scale 0 → 1.2 → 1)
  - Dropdown menu slides down on click
  - Menu items fade in with stagger (0.05s delay)

### Main Content Grid
- Responsive grid: adjust columns based on screen size
- Desktop (1024px+): 4-column grid (300px columns with gaps)
- Tablet (768px-1023px): 2-column grid
- Mobile (<768px): 1-column full-width
- Gap between widgets: 24px
- Grid auto-flow: dense (smart placement of cards)

## KPI Cards

### Card Structure
- Card dimensions: responsive (min-width 200px, flex-grow to fill)
- Content:
  - Title (e.g., "Total Revenue")
  - Large metric number (e.g., "$125,430")
  - Trend indicator (% change: +12.5% or -3.2%)
  - Optional: small chart sparkline (mini line chart)
  - Optional: additional metadata

### Card Design (Glassmorphism)
- Background: `rgba(15, 23, 42, 0.6)` with `backdrop-blur(10px)`
- Border: 1px solid `rgba(148, 163, 184, 0.2)`
- Border-radius: 12px
- Padding: 24px
- Subtle shadow: `0 8px 32px rgba(0, 0, 0, 0.1)`

### Number Counter Animation
- When data updates, number animates from old value to new value
- Use Framer Motion `MotionValue` with `useTransform`:
  ```typescript
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, newValue, { duration: 1.5 });
    return () => controls.stop();
  }, [newValue, count]);
  ```
- Alternative: GSAP `AttrPlugin` for DOM text node updates
- Duration: 1-1.5 seconds
- Easing: `power2.out`
- Format numbers: add thousand separators, currency symbols

### Trend Indicator
- Display: "↑ +12.5%" or "↓ -3.2%"
- Color: green for positive, red for negative
- Optional animation: pulse on data update
- Font size: smaller than metric (14px)

### Hover Effects
- Scale: 1 → 1.02 (subtle lift)
- Shadow: increase depth
- Duration: 0.3s ease-out
- Optional: highlight border color on hover

## Chart Widgets

### Chart Container Structure
- Card with title, optional toolbar (refresh, settings)
- Chart takes 80% of card height
- Legend below chart
- Loading state: skeleton shimmer animation

### Chart Animations on Mount
- **Line Chart**: draw animation from left to right
  - Stroke-dasharray animation: `strokeDashoffset 0 → full length`
  - Duration: 1.5s
  - Easing: `power2.inOut`
- **Bar Chart**: grow animation from bottom to top
  - Each bar scales from scaleY(0) to scaleY(1)
  - Stagger: 0.1s between bars
  - Duration: 0.6s per bar
  - Easing: `back.out`
- **Pie/Donut Chart**: sweep animation
  - Rotate animation: rotate(0) → rotate(360deg)
  - Opacity animation: 0 → 1
  - Duration: 1.2s
  - Easing: `power2.out`
- **Area Chart**: fill animation from bottom
  - Scale and opacity: combine for smooth reveal
  - Duration: 1s

### Real-Time Data Updates
- Charts re-render when data changes
- Animate data point transitions:
  - Framer Motion `layoutId` for shared layout animation
  - Duration: 0.8s for smooth transition
  - Optional: subtle pulse on new data point
- Use React memo to prevent unnecessary re-renders

### Hover Interactions
- Show tooltip on hover over data point:
  - Tooltip slides up from data point
  - Background: semi-transparent dark with border
  - Fade-in animation: 0.2s
  - Position: follow cursor or fixed above data point
- Highlight relevant bar/line on hover (brighten color)
- Cursor changes to pointer on hover

### Chart Responsiveness
- Charts resize with Recharts responsive container
- Font sizes adjust: desktop 12px, mobile 10px
- Legend position: horizontal on desktop, vertical on mobile
- Spacing adjusts for mobile: smaller margins/padding

## Drag-to-Reorder Dashboard Widgets

### Framer Motion Reorder Component
- Use Framer Motion `Reorder` container and item:
  ```typescript
  <Reorder.Group axis="y" values={items} onReorder={setItems}>
    {items.map((item) => (
      <Reorder.Item key={item.id} value={item}>
        <DashboardWidget {...item} />
      </Reorder.Item>
    ))}
  </Reorder.Group>
  ```
- Enable drag on specific widgets (KPI cards, charts)
- Drag handle: icon or entire card (designer choice)

### Drag Visual Feedback
- On drag start: widget scales up (1 → 1.05), shadow increases
- Opacity: 0.7 while dragging (shows it's movable)
- Cursor: changes to `grab` on hover, `grabbing` while dragging
- Other widgets: slide out of the way smoothly (reorder animation)
- Duration: 0.3s for reorder transitions

### Persistence
- Store reordered layout in Zustand store
- Optional: save to localStorage or backend
- On page reload: restore saved layout

## Skeleton Loading States

### Shimmer Animation
- Show skeleton placeholders while data loads
- Gradient shimmer animation:
  ```css
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  ```
- Background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`
- Duration: 1.5s, infinite loop
- Easing: `ease-in-out`

### Skeleton Shapes
- KPI card skeleton: 3 placeholders (title, number, trend)
- Chart card skeleton: rectangle with height 300px
- Table skeleton: multiple rows with columns

## Dark/Light Mode Toggle

### Toggle Component
- Located in header (right side)
- Icon: sun (light mode) or moon (dark mode)
- On click: toggle between modes
- Store preference: localStorage + Zustand

### Smooth Transition
- All colors transition smoothly (0.2s ease):
  ```css
  * { transition: background-color 0.2s, color 0.2s, border-color 0.2s; }
  ```
- No flash of unstyled content (FOUC)
- Text color updates in sync with background

### CSS Variable Updates
- Change root CSS variables on toggle:
  ```typescript
  document.documentElement.setAttribute('data-theme', 'light');
  // or
  document.documentElement.style.setProperty('--bg-primary', '#ffffff');
  ```

## Data Table Component

### Table Layout
- Columns: adjustable based on data (user, date, status, amount, action)
- Rows: paginated (10, 25, 50 rows per page options)
- Sortable columns: click header to sort ascending/descending
- Filterable: add filter button with dropdown/search

### Row Hover Animation
- Background color: fade in (rgba(59, 130, 246, 0.1))
- Duration: 0.2s
- Optional: subtle scale (1 → 1.02)

### Animations
- Row appearance on initial load: staggered fade-in
  - Each row: opacity 0 → 1
  - Stagger: 0.05s between rows
  - Duration: 0.4s
- Sort animation: rows reorder smoothly
  - Framer Motion layout animation
  - Duration: 0.3s `ease-in-out`
- Pagination: fade out old rows, fade in new rows
  - Duration: 0.2s each direction

### Status Indicator
- Column shows status (Active, Pending, Completed, Failed)
- Color-coded: green, yellow, blue, red
- Optional: small pulsing dot icon for "Active" status
  - Pulse animation: opacity 1 → 0.5 → 1
  - Duration: 2s, infinite

## Real-Time Data Simulation

### Data Store (Zustand)
```typescript
export const useStore = create((set) => ({
  charts: {
    lineData: [...],
    barData: [...],
  },
  kpis: {
    totalRevenue: 125430,
    activeUsers: 3421,
  },
  updateData: (newData) => set(...),
}));
```

### Simulation Function
- Use `setInterval` to update data every 2-5 seconds
- Simulate realistic changes:
  - Increment/decrement values by 1-10%
  - Add new data points to charts (shift array left, add new point right)
  - Update trends (random ±0.5% to ±5%)
- Start interval on component mount, cleanup on unmount

### Data Sources (Optional)
- **DummyJSON API**: Fetch user, product, post data for mock dashboard
- **CoinGecko API**: Free crypto price data for finance dashboard
- **JSONPlaceholder**: Fake REST API for todos, posts, comments
- **Mockoon**: Local mock server for local testing

## Notification Bell & Dropdown

### Notification Bell
- Icon: bell outline from lucide-react
- Badge: red circle with white number (0-99, "99+" for overflow)
- Badge animation on count change:
  - Pop-in: scale 0 → 1.2 → 1 (0.4s)
  - Pulse: opacity 1 → 0.5 → 1 (2s loop)
- Hover effect: scale up (1 → 1.1), color changes

### Notification Dropdown
- Trigger: click bell icon
- Position: fixed, top-right below header
- Width: 350px (responsive: 300px on mobile)
- Height: max 400px with scroll
- Animation: slide down from top + fade in (0.3s)

### Notification List
- Each notification: title, message, timestamp, optional action button
- Most recent first
- Row hover: background highlight
- Click notification: close dropdown, optional navigation
- Swipe to dismiss (mobile): slide right + fade out

## Sidebar Navigation

### Navigation Structure
- Logo at top
- Navigation items (Dashboard, Analytics, Reports, Settings, Help, Logout)
- Active indicator: right border (3px) or background highlight in accent color
- Active indicator animation: slide from previous item to current (0.3s)

### Collapse/Expand Animation
- Collapsible sidebar: toggle with hamburger button in header
- Width animation: 280px ↔ 64px (0.3s ease-in-out)
- Text labels: fade out during collapse, fade in during expand
- Icons: always visible, slight shift on collapse

### Mobile Menu
- On mobile: sidebar hidden by default
- Hamburger button in header toggles slide-in menu
- Menu slides from left (translateX -100% → 0)
- Overlay backdrop fades in simultaneously (opacity 0 → 0.5)
- Duration: 0.3s
- Close on item click or backdrop click

## Performance Optimization

### Component Memoization
- Memoize chart components with `React.memo()`
- Prevent re-renders on parent state changes
- Use `useCallback` for event handlers

### Chart Performance
- Limit data points: show last 30-60 days (not years)
- Virtualize large tables with `react-window` or similar
- Lazy load chart libraries dynamically
- Disable animations on low-end devices (check `prefers-reduced-motion`)

### Animation Performance
- Use `will-change: transform` on animated elements
- Prefer `transform` and `opacity` over other properties
- Use Framer Motion's `layout` carefully (expensive)
- Debounce resize events
- Use `shouldReflow: false` to skip reflows

### Data Fetching
- Use SWR or React Query for data fetching with caching
- Deduplicate requests within same time window
- Pagination for large datasets (tables)
- Real-time updates via WebSocket (if available)

### Bundle & Build
- Code-split chart library: dynamic import only on dashboard
- Tree-shake unused Recharts chart types
- Minify and compress CSS/JS
- Target bundle size: <250KB JS gzipped
- Lazy load analytics tracking scripts

## Responsive Design Strategy

### Desktop (1024px+)
- 4-column grid layout
- Sidebar always visible (280px)
- Full chart details and legends visible
- Hover effects and animations enabled
- Drag-to-reorder enabled

### Tablet (768px-1023px)
- 2-column grid layout
- Collapsible sidebar (64px default, expand on hover)
- Simplified charts (smaller fonts, compact legends)
- Touch-friendly: larger tap targets (48×48px minimum)
- Disable drag-to-reorder (replace with settings modal)

### Mobile (<768px)
- 1-column full-width layout
- Sidebar hidden, hamburger menu in header
- Simplified KPI cards (single metric)
- Chart height reduced (200px instead of 300px)
- Table scrolls horizontally
- Tap targets minimum 44×44px
- Simplified animations (shorter durations)
- Respect `prefers-reduced-motion` preference

## Accessibility

### WCAG Compliance
- Color contrast: text on background ≥ 4.5:1 ratio
- Font sizes: minimum 12px (14px recommended for body)
- Focus indicators: visible blue outline on interactive elements
- Keyboard navigation: Tab through all interactive elements
- Screen reader support: ARIA labels on icons, charts, buttons

### Specific Implementations
- Chart tooltips: accessible via keyboard (Arrow keys to navigate points)
- Table sorting: announce sort direction to screen readers
- Color not sole indicator: use patterns/icons with colors
- Notifications: announce new notifications to screen readers
- Modal dialogs: trap focus, manage z-index properly

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Free Resources

### APIs
- **DummyJSON**: Mock REST API (users, products, posts, todos)
- **CoinGecko**: Cryptocurrency price data (no auth required)
- **JSONPlaceholder**: Fake JSON API for testing

### UI Components
- **ShadCN/UI**: Pre-built accessible components (buttons, inputs, etc.)
- **Lucide Icons**: Beautiful SVG icon library

### Fonts
- **Google Fonts**: Inter (body), Space Mono (code), Syne (headings)

### Color Tools
- **Tailwind CSS**: Extensive color palette built-in
- **Color Hunt**: Curated color palettes

## Development Workflow

### Setup
1. Create Next.js 15 project with App Router
2. Install dependencies: `npm install recharts framer-motion zustand @shadcn/ui`
3. Configure Tailwind CSS with custom theme colors
4. Set up Zustand store for dashboard state
5. Create mock data generator for real-time simulation

### Debugging
- React DevTools Profiler: check render performance
- Chrome DevTools Performance tab: identify janky animations
- Disable animations with `prefers-reduced-motion` for testing
- Console logging for data updates

### Testing
- Unit tests for chart components (Jest)
- Integration tests for drag-to-reorder (React Testing Library)
- Visual regression tests (Percy, Chromatic)
- Performance testing (Lighthouse, WebPageTest)

## Testing Checklist

- [ ] KPI cards display and update numbers smoothly
- [ ] Number counter animates when data changes
- [ ] Charts render with draw/grow/sweep animations
- [ ] Charts respond to real-time data updates
- [ ] Drag-to-reorder widgets works smoothly
- [ ] Reordered layout persists on page reload
- [ ] Dark/Light mode toggle works with smooth transition
- [ ] Notification bell shows badge with count
- [ ] Notification dropdown slides down and lists items
- [ ] Sidebar collapses/expands smoothly
- [ ] Mobile hamburger menu slides in from left
- [ ] Data table sorts on column click
- [ ] Table rows animate in on load
- [ ] Skeleton loading shows shimmer animation
- [ ] All hover effects work smoothly
- [ ] Keyboard navigation works (Tab through elements)
- [ ] Screen reader announces key updates
- [ ] Animations disabled with `prefers-reduced-motion`
- [ ] Lighthouse score >80 on desktop
- [ ] Mobile responsiveness: layouts stack correctly

## Common Issues & Solutions

- **Charts not animating on update**: Ensure `key` prop changes or use `layoutId`
- **Drag-to-reorder lag**: Use `shouldReflow: false`, memoize widgets
- **Theme switch flash**: Use CSS variables set in document root before hydration
- **Table scroll issues**: Ensure container has fixed height, use overflow-auto
- **Notifications spam**: Debounce or throttle notification updates
- **Memory leak with setInterval**: Clear interval in useEffect cleanup

## Additional Resources

- Recharts Documentation: https://recharts.org
- Framer Motion API: https://www.framer.com/motion
- Zustand Documentation: https://github.com/pmndrs/zustand
- ShadCN/UI Components: https://ui.shadcn.com
- Tailwind CSS: https://tailwindcss.com
- Next.js Image Optimization: https://nextjs.org/docs/app/api-reference/components/image
