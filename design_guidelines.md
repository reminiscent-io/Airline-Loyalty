# Southwest Airlines Loyalty Calculator - Design Guidelines

## Design Approach
**Design System Selection**: Custom branded design inspired by Southwest Airlines' official website, prioritizing clarity, friendliness, and trust. This is a utility-focused application with visual warmth - combining functional dashboards with Southwest's signature approachable personality.

## Brand Colors (User-Specified)
- **Primary**: #304CB2 (Southwest Blue) - Headers, primary CTAs, tier badges
- **Secondary**: #FFBF27 (Southwest Gold) - A-List tier indicators, highlights
- **Accent**: #EF3340 (Southwest Red) - A-List Preferred, important alerts, heart motifs
- **Background**: #F7F8FA (Light Grey) - Page background, card backgrounds
- **Text**: #111B40 (Dark Navy) - Primary text, headings
- **Success**: #068D42 (Green) - Progress indicators, achievement states

## Typography
- **Primary Font**: Southwest Sans (fallback: Open Sans from Google Fonts)
- **Headings**: 
  - H1: 2.5rem (40px), font-weight 700, tracking-tight
  - H2: 2rem (32px), font-weight 700
  - H3: 1.5rem (24px), font-weight 600
  - H4: 1.25rem (20px), font-weight 600
- **Body**: 1rem (16px), font-weight 400, line-height 1.6
- **Small Text**: 0.875rem (14px) for captions, helper text

## Layout System
- **Spacing Scale**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 24 (p-2, p-4, p-6, etc.)
- **Container**: max-w-7xl centered with px-4 md:px-6 lg:px-8
- **Section Padding**: py-12 on mobile, py-16 on desktop
- **Card Spacing**: Internal padding p-6 to p-8
- **Grid System**: 1 column mobile, 2-3 columns tablet/desktop for calculator cards

## Component Library

### Navigation Header
- Fixed or sticky header with Southwest blue background (#304CB2)
- Southwest logo/heart icon on left
- Navigation links (if needed) aligned right
- Height: h-16 to h-20
- Shadow: subtle drop shadow for depth

### Calculator Cards
- White background (bg-white) with rounded-xl corners (rounded-xl or rounded-2xl)
- Border: 1px solid light gray or subtle shadow (shadow-md)
- Padding: p-6 md:p-8
- Each calculator section in its own card
- Stack vertically on mobile, grid layout on desktop

### Input Fields
- Rounded inputs (rounded-lg) with border-2
- Default border: gray-300
- Focus state: border-[#304CB2] with ring-2 ring-blue-500/20
- Labels: font-weight 600, text-sm, text-[#111B40], mb-2
- Helper text: text-sm text-gray-600 below inputs

### Tier Badges & Status Indicators
- **Base/Member**: Gray background with dark text
- **A-List**: Gold (#FFBF27) background with contrasting text
- **A-List Preferred**: Red (#EF3340) background with white text
- Badge style: inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
- Include heart icon (♥) within tier badges

### Progress Bars
- Track: Light gray background (bg-gray-200), rounded-full, h-3 to h-4
- Fill: Gradient using Southwest colors or solid success green (#068D42)
- Percentage label above or inside bar
- Companion Pass progress: Use bold red (#EF3340) for fill when approaching/achieving goal

### Buttons
- **Primary CTA**: bg-[#304CB2] with white text, hover:bg-[#253a8f]
- **Secondary**: bg-[#FFBF27] with dark text, hover:bg-[#e6ab1f]
- **Accent**: bg-[#EF3340] with white text, hover:bg-[#d42d3a]
- Style: rounded-lg, px-6 py-3, font-semibold, transition-colors
- If on images: backdrop-blur-sm with semi-transparent background

### Results Display Panel
- Prominent card with slightly larger text
- Use success color (#068D42) for positive results
- Display point totals in large, bold numbers (text-3xl to text-4xl)
- Include breakdown sections with smaller text
- Visual hierarchy: Total > Breakdown > Details

### Comparison Tables
- Striped rows for readability (alternate bg-gray-50)
- Header row with Southwest blue background
- Benefits listed with checkmarks (✓) in success green
- Rounded corners on table container
- Responsive: stack columns on mobile, full table on desktop

### Heart Motif Integration
- Use heart icons (♥) as decorative elements in headers
- Heart bullet points for benefit lists
- Subtle heart watermarks in card backgrounds (very low opacity)
- Heart icon in Companion Pass section (core to that benefit)

## Images
**Hero Section**: Include a welcoming hero image at top of page
- Image Description: Friendly Southwest Airlines aircraft on runway or happy travelers with luggage at airport, bright daylight, professional photography with warm tones
- Treatment: Moderate overlay (bg-blue-900/40) for text readability
- Height: h-[400px] md:h-[500px]
- Content: Centered white text with main heading and subheading
- CTA buttons with backdrop-blur-sm background

## Iconography
- Use Heroicons via CDN (outline style for most, solid for filled hearts)
- Key icons: heart (♥), checkmark (✓), trophy (tier achievement), plane, star (benefits)
- Icon size: 5-6 for decorative, 8-10 for primary focal points

## Responsive Behavior
- Mobile-first approach
- Calculator inputs: Full width on mobile, multi-column on md+ screens
- Cards: Stack vertically on mobile, 2-3 column grid on lg+ screens
- Tables: Scroll horizontally on mobile or stack key columns
- Text sizes: Scale down 1-2 steps on mobile viewports

## Accessibility
- Maintain WCAG AA contrast ratios (already met with provided colors)
- Form labels properly associated with inputs
- Progress bars include aria-valuenow/valuemin/valuemax
- Focus states clearly visible on all interactive elements
- Semantic HTML throughout (section, article, aside elements)

## Animations
Use very sparingly - focus on functional feedback:
- Smooth transitions on progress bar fills (transition-all duration-500)
- Subtle hover states on cards (hover:shadow-lg)
- Results panel fade-in when calculations update
- NO distracting scroll animations or complex motion

## Page Structure
1. Hero section with welcoming image and main heading
2. Tier comparison overview cards (3 columns: Member, A-List, A-List Preferred)
3. Interactive calculator section (flight spending inputs, current status)
4. Results panel (points earned, tier progress)
5. Companion Pass calculator (separate focused section)
6. Benefits breakdown table
7. Footer with Southwest branding