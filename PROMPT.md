Build me an animated real-time data visualization dashboard from scratch using Next.js 15 with App Router, Recharts for data visualization, Framer Motion for animations, Zustand for state management, and Tailwind CSS v4 with a glassmorphism design.

**Project Requirements:**

**Tech Stack & Setup**
- Next.js 15 with App Router and TypeScript
- React 19 with functional components and hooks
- Recharts for charts (line, bar, pie, area charts)
- Framer Motion for smooth component animations and drag interactions
- Zustand for lightweight global state (chart data, theme, layout)
- Tailwind CSS v4 with custom theme variables for light/dark mode
- ShadCN/UI for pre-built accessible components
- date-fns for date formatting
- lucide-react for SVG icons

**Color System & Dark Mode**
- Dark mode default (toggle to light mode)
- Dark theme colors:
  - Background: `#0f172a` (slate-900)
  - Card background: `rgba(15, 23, 42, 0.6)` with backdrop-blur 10px
  - Border: `rgba(148, 163, 184, 0.2)`
  - Text: `#f1f5f9` (slate-100)
  - Accent: `#3b82f6` (blue)
  - Success: `#10b981` (green)
  - Warning: `#f59e0b` (amber)
  - Error: `#ef4444` (red)
- Light theme: inverted colors (white backgrounds, dark text)
- CSS variables for dynamic theme switching
- Smooth color transitions (0.2s ease) when toggling theme

**Dashboard Layout Structure**
- Fixed sidebar (280px) with navigation links: Dashboard, Analytics, Reports, Settings, Help
- Sidebar collapsible on desktop (toggle to 64px), hamburger menu on mobile
- Active navigation indicator: colored right border with slide animation
- Fixed header (64px) at top: page title, search bar, notification bell, theme toggle, user profile
- Main content area: responsive grid of dashboard widgets below header
- Responsive: desktop 4-column grid, tablet 2-column, mobile 1-column full-width

**KPI Cards (Key Performance Indicators)**
- Display 4-6 KPI metrics at top of dashboard
- Each card shows:
  - Title (e.g., "Total Revenue", "Active Users")
  - Large metric number (e.g., "$125,430")
  - Trend indicator with percentage (e.g., "↑ +12.5%" in green, "↓ -3.2%" in red)
  - Optional: small sparkline chart showing last 7 days trend
- Card styling:
  - Glassmorphism: `backdrop-blur(10px)`, semi-transparent background
  - Border: thin 1px divider line
  - Border-radius: 12px
  - Padding: 24px
  - Subtle shadow for depth
- Number counter animation on data update:
  - Animate from old value to new value over 1.5 seconds
  - Use Framer Motion MotionValue with useTransform or GSAP
  - Format with thousand separators and currency symbol
  - Easing: `power2.out`
- Hover effects (desktop):
  - Subtle scale (1 → 1.02)
  - Shadow increase
  - Border color brightens slightly

**Chart Widgets**
- Build 4 different chart types, each in its own card:
  1. **Line Chart**: daily revenue over 30 days (animated draw-in on load)
  2. **Bar Chart**: sales by product category (animated grow-up on load)
  3. **Pie/Donut Chart**: revenue distribution by region (animated sweep on load)
  4. **Area Chart**: user activity over time (animated fill on load)
- Each chart card contains:
  - Title and optional toolbar (refresh icon, settings)
  - Legend below chart
  - Loading skeleton with shimmer animation while data loads
  - Tooltip on hover showing exact values

**Chart Animations**
- **Line Chart**: Draw animation
  - Use SVG stroke-dasharray animation
  - Lines animate from left to right over 1.5 seconds
  - Easing: `power2.inOut`
- **Bar Chart**: Grow animation
  - Each bar scales from height 0 to full height
  - Bars stagger: 0.1s delay between each bar
  - Duration: 0.6s per bar
  - Easing: `back.out`
- **Pie Chart**: Sweep animation
  - Rotate entire pie from 0 to 360 degrees
  - Opacity fades in simultaneously
  - Duration: 1.2 seconds
  - Easing: `power2.out`
- **Area Chart**: Fill animation
  - Combine scale and opacity for smooth reveal
  - Animate from bottom-left to top-right
  - Duration: 1 second
- **Real-time Updates**: Charts re-render smoothly with data transitions
  - Smooth animation when data points change (0.8s)
  - Optional: pulse effect on new data point

**Real-Time Data Simulation**
- Simulate live data updates every 3-5 seconds
- Use `setInterval` to update Zustand store
- Update patterns:
  - KPI values: ±1-5% random change
  - Chart data points: add new point on right, shift old points left
  - Trend indicators: recalculate based on new data
- Zustand store manages: KPIs, chart data, notifications, theme, widget layout
- Data starts with mock data on page load

**Drag-to-Reorder Dashboard Widgets**
- Enable drag-and-drop to rearrange dashboard cards
- Use Framer Motion `Reorder` component (axis="y" for vertical reordering)
- Visual feedback:
  - Drag handle icon (:::) or grab entire card
  - On drag: card scales up (1 → 1.05), opacity 0.7, shadow increases
  - Cursor: grab on hover, grabbing while dragging
  - Other widgets: slide smoothly out of the way (0.3s transition)
- Persistence: save reordered layout to localStorage + Zustand
- Restore layout on page reload
- Disable drag-to-reorder on mobile (use settings modal instead)

**Data Table Component**
- Display table of transactions/records (10-20 rows per page)
- Columns: ID, Date, User/Description, Status, Amount, Action
- Features:
  - Paginate: 10/25/50 rows per page selector
  - Sortable columns: click header to sort ascending/descending
  - Row hover: background highlight (fade-in 0.2s)
  - Status indicator: color-coded (Active-green, Pending-yellow, Complete-blue, Failed-red)
  - Status can pulse if "Active" (opacity loop 2s)
- Animations:
  - Rows fade in on initial load (staggered 0.05s between rows)
  - Sort animation: rows smoothly reorder on sort (0.3s with layout animation)
  - Pagination: fade out old rows, fade in new rows (0.2s each)
  - Row click: optional expand to show details (slide down animation)

**Notification Bell & Dropdown**
- Header icon: bell outline from lucide-react
- Badge counter: red circle with white number (0-99, "99+" for overflow)
- Badge animation on count update: pop-in scale animation (0 → 1.2 → 1, 0.4s)
- Notification dropdown:
  - Trigger: click bell icon
  - Position: fixed, top-right below header
  - Width: 350px (responsive: 300px on mobile)
  - Animation: slide down + fade in (0.3s)
  - List 5-8 recent notifications
  - Each notification: icon, title, message, timestamp
  - Row hover: highlight background
  - Dismiss: click X button or swipe right on mobile
  - Notification auto-updates with mock notifications every 10-30 seconds

**Theme Toggle (Dark/Light Mode)**
- Toggle button in header: sun/moon icon
- On click: switch between dark and light theme
- Smooth transition: all colors animate (0.2s ease)
- Store preference: localStorage + Zustand
- CSS variables update on toggle (no page refresh)
- Icon animates: rotate 180 degrees during transition (0.3s)

**Sidebar Navigation**
- Fixed width 280px (collapses to 64px on toggle)
- Contains:
  - Logo/brand name at top
  - Navigation items: Dashboard, Analytics, Reports, Settings, Help, Logout
  - Active link indicator: right border (3px accent color) with slide animation
  - User profile section at bottom (optional avatar + name)
- Collapse animation: width transitions smoothly (0.3s ease-in-out)
- Text labels fade out/in during collapse
- Icons always visible, shift position on collapse

**Mobile Sidebar Menu**
- Hidden by default on mobile
- Hamburger button in header toggles menu
- Slide-in from left (translateX -100% → 0, 0.3s)
- Overlay backdrop fades in (opacity 0 → 0.5)
- Menu items staggered fade-in (0.05s stagger)
- Close on item click or backdrop click

**Loading States & Skeletons**
- Show skeleton placeholders while data loads
- Shimmer animation: gradient moves across placeholder (1.5s infinite)
- Gradient: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`
- Skeleton shapes:
  - KPI card: 3 placeholder lines (title, big number, trend)
  - Chart card: rectangle (height 300px)
  - Table rows: multiple row skeletons with column placeholders
- Fade out skeleton, fade in actual content when loaded (0.3s)

**Performance Optimization**
- Memoize chart components with React.memo() to prevent unnecessary re-renders
- Use useCallback for event handlers
- Code-split chart library: dynamically import Recharts only on dashboard page
- Lazy load lower-fold widgets with React.lazy + Suspense
- Limit chart data points: show last 30-60 days, not all historical data
- Virtualize large tables with row windowing (if >100 rows)
- Disable complex animations on low-end devices (check prefers-reduced-motion)
- CSS animations on will-change: transform and opacity only
- Bundle size target: <250KB JS gzipped
- Lighthouse score target: >80 desktop, >70 mobile

**Responsive Design**
- Desktop (1024px+): 4-column grid, full sidebar, all animations enabled
- Tablet (768px-1023px): 2-column grid, collapsible sidebar, simplified animations
- Mobile (<768px): 1-column full-width, hamburger menu, touch-friendly (44×44px min taps)
  - Stack all widgets vertically
  - Hide chart legends if space constrained
  - Reduce chart heights (200px instead of 300px)
  - Simplify: shorter animation durations, fewer stagger effects
  - Respect prefers-reduced-motion system setting

**Accessibility**
- WCAG AA color contrast minimum 4.5:1
- Font minimum 12px (14px for body text)
- Focus indicators: visible blue outline on interactive elements
- Keyboard navigation: Tab through all interactive elements
- Screen reader support: ARIA labels, announcements for updates
- Chart tooltips: navigate with arrow keys, announce values to screen readers
- Table: announce sort direction, row counts
- Disable animations with prefers-reduced-motion media query

**Data Sources (Free APIs & Mock Data)**
- **DummyJSON**: Fetch user, product, post data (https://dummyjson.com)
- **CoinGecko**: Cryptocurrency prices (no auth required)
- **JSONPlaceholder**: Mock REST API for todos, posts, comments
- Initial load: use hardcoded mock data, simulate real-time updates with setInterval
- Optional: fetch from free API and combine with simulated updates

**Deployment**
- Deploy to Vercel (optimized for Next.js)
- Use `next/image` for image optimization
- Enable Vercel Analytics to monitor Core Web Vitals
- Configure environment variables if using APIs (optional)
- Test performance: check Lighthouse scores, CWV metrics

**Deliverables**
- Fully functional Next.js dashboard application
- All animations smooth at 60fps on desktop
- Mobile responsive with touch-friendly interactions
- Accessible: keyboard navigation, screen reader support
- Clean, well-commented TypeScript code
- README with setup, environment variables, and deployment instructions
- Mock data generator for realistic dashboard simulation
- Ready to customize with real API data and styling
