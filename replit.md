# Southwest Rapid Rewards Calculator

## Overview

This is a comprehensive airline loyalty program calculator web application supporting multiple airlines: Southwest, American Airlines, United, Delta, JetBlue, and Atmos. Each airline has its own dedicated page with airline-specific branding, elite status tier carousels, rewards calculators, benefits comparison tables, and credit card details.

The application provides real-time calculations showing total points/miles earned, progress toward elite status tiers, and financial value analysis. Key features include:
- Airline-specific reward calculators with accurate point/mile calculations
- Elite status tier progression tracking with visual carousel displays
- Credit card integration with sign-up bonus calculations
- Benefits comparison tables for each tier level
- Branded design using each airline's official colors

## Recent Changes (November 7, 2025)
- **Calculator Defaults**: All airline calculators now default to $1,000 flight spend and 1 flight/segment
- **Southwest Component Naming**: Renamed Southwest components with Southwest prefix (e.g., SouthwestCalculator, SouthwestTierCard) to match naming convention of other airlines
- **Delta Calculator Enhancement**: Added sign-up bonus checkbox feature to Delta calculator to standardize with American and United calculators
- **Delta Tier Card Format Update**: Updated Delta tier card and schema to match American/Southwest format with DELTA_TIER_CONFIGS object structure and DeltaTierType keys
- **File Organization**: Southwest components moved to dedicated southwest/ folder with consistent naming
- **United Status Tracker Enhancement**: Improved United's Premier status progress display with dual progress bars clearly showing that BOTH PQP and PQF are required for qualification (unlike Southwest which allows EITHER qualification method). Added tier markers showing accurate thresholds: Silver (5K PQP/15 PQF), Gold (10K PQP/30 PQF), Platinum (15K PQP/45 PQF), 1K (24K PQP/60 PQF)
- **United Return on Spend**: Updated calculation to include credit card annual fee in total spend, providing more accurate ROI when using a credit card

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript, using functional components and hooks exclusively.

**Routing**: Wouter for lightweight client-side routing, configured to serve a single-page application with a home page and 404 fallback.

**UI Component Library**: Radix UI primitives with custom shadcn/ui components styled using Tailwind CSS. The component system follows the "New York" style variant with extensive use of Radix primitives for accessibility (accordion, alert-dialog, checkbox, dialog, dropdown-menu, popover, progress, select, tabs, toast, tooltip, etc.).

**State Management**: React Query (TanStack Query v5) for server state management. Local component state uses React hooks (useState). No global state management library is implemented.

**Styling Approach**: 
- Tailwind CSS with custom Southwest Airlines brand colors defined in the config
- CSS variables for theme customization (light mode focus)
- Custom utility classes for elevation effects (hover-elevate, active-elevate-2)
- Component-specific styling using class-variance-authority for variant management

**Design System**: Custom branded design inspired by Southwest Airlines visual identity with specific color palette:
- Primary: #304CB2 (Southwest Blue)
- Secondary: #FFBF27 (Southwest Gold)  
- Accent: #EF3340 (Southwest Red)
- Background: #F7F8FA (Light Grey)
- Text: #111B40 (Dark Navy)
- Success: #068D42 (Green)

### Backend Architecture

**Runtime**: Node.js with TypeScript using ES modules (type: "module" in package.json).

**Server Framework**: Express.js configured as a custom server with Vite integration for development.

**API Design**: RESTful API with a single calculation endpoint (`POST /api/calculate`) that accepts calculator input and returns calculation results. Input validation uses Zod schemas defined in shared schema file.

**Business Logic**: Centralized calculator logic in `server/calculator.ts` that implements Southwest Rapid Rewards earning rules:
- Flight points calculation based on tier status and spending
- Tier Qualifying Points (TQP) tracking - only flight-earned points count
- Companion Pass progress tracking - both flight and credit card points count
- Tier progression logic (Member → A-List → A-List Preferred)

**Development Server**: Custom Vite middleware setup with hot module replacement (HMR) support. The server proxies API requests and serves the React application in development mode.

**Build Process**: 
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js` with external packages
- Production: Single Node.js process serves both static assets and API

### Data Storage Solutions

**Current Implementation**: In-memory storage using `MemStorage` class with Map-based data structures for user management. The storage interface (`IStorage`) defines CRUD methods for user operations.

**Database Configuration**: Drizzle ORM configured for PostgreSQL with schema defined in `shared/schema.ts`. Database connection expects `DATABASE_URL` environment variable. Migration files output to `./migrations` directory.

**Data Models**: 
- User model with basic authentication fields (username, password hash)
- Calculator types defined as TypeScript interfaces and Zod schemas in shared schema
- Tier configuration objects defining point earning rates, qualification thresholds, and benefits

**Note**: The application is configured for PostgreSQL via Drizzle ORM but currently uses in-memory storage. Database integration is prepared but not actively used in the current implementation.

### Authentication and Authorization

**Status**: Minimal authentication infrastructure present but not actively implemented in the current application flow. The storage layer includes user creation and retrieval methods, but no authentication middleware or session management is active for the calculator features.

**Session Management**: Package `connect-pg-simple` is installed for PostgreSQL-backed session storage, indicating planned session management capability.

### External Dependencies

**Third-Party Services**: 
- Neon Database serverless driver (`@neondatabase/serverless`) for potential serverless PostgreSQL connectivity
- Google Fonts (Open Sans) loaded via CDN as fallback for Southwest Sans font

**Build Tools**:
- Vite for frontend bundling and development server
- esbuild for server-side bundling
- TypeScript compiler for type checking
- Drizzle Kit for database schema management and migrations

**Development Tools**:
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- PostCSS with Tailwind CSS and Autoprefixer

**UI Dependencies**: 
- Extensive Radix UI component primitives for accessible, unstyled components
- lucide-react for iconography
- embla-carousel-react for carousel functionality
- date-fns for date manipulation
- cmdk for command menu functionality

**Form Handling**: 
- react-hook-form integration via @hookform/resolvers
- Zod for runtime validation and schema definition
- drizzle-zod for generating Zod schemas from Drizzle ORM schemas