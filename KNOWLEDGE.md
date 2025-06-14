# Redstone Chicken Project Knowledge Base

## 🎯 Project Overview

**Project Name**: Redstone Chicken's Official Website  
**Purpose**: Minecraft Bedrock addon and texture pack distribution platform  
**Tech Stack**: React, TypeScript, Vite, Tailwind CSS, Supabase, shadcn/ui  
**Target Audience**: Minecraft Bedrock players seeking quality mods and texture packs  
**Domain**: Redstone Chicken content creation and distribution  

## 🎨 Design System & Branding

### Brand Identity
- **Primary Brand**: "Redstone Chicken" (NEVER "Lovable")
- **Logo**: YouTube profile image from `https://yt3.googleusercontent.com/ytc/AIdro_mhEBuRNDkRxOWUjeZflxfdyutxSHfzuEOhEAtTW8VVp_I=s900-c-k-c0x00ffffff-no-rj`
- **Tagline**: Creating amazing Minecraft mods, resource packs, and content

### Color Scheme
- **Primary**: Red (`--primary`) - redstone-themed
- **Background**: Dark theme with glass morphism effects
- **Accent Colors**: Various red tones for highlights and CTAs
- **Text**: High contrast for accessibility

### Typography
- **Primary Font**: Montserrat (via Google Fonts)
- **Usage**: Consistent font-family throughout with `font-montserrat` class
- **Hierarchy**: Clear heading structure with responsive sizing

### Visual Design Principles
- **Glass Morphism**: Semi-transparent panels with backdrop blur
- **Subtle Animations**: Hover effects, fade-ins, gentle floating
- **Red Accents**: Strategic use of red for CTAs and highlights
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## 🏗️ Architecture Guidelines

### File Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── project/         # Project-specific components
│   └── downloads/       # Download page components
├── pages/               # Route-based pages
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── styles/              # CSS files for animations, components
└── integrations/        # External service integrations
```

### Component Organization
- **Small, Focused Components**: Maximum 200-300 lines
- **Single Responsibility**: Each component has one clear purpose
- **Composition over Inheritance**: Use hooks for shared logic
- **TypeScript**: Strict typing for all components and props

### State Management
- **React Query**: For server state and caching
- **React Hooks**: useState, useEffect for local state
- **Context**: Minimal use, only for true global state
- **Supabase**: Real-time subscriptions for live data

## 📱 Responsive Design Standards

### Breakpoints (Tailwind CSS)
- **sm**: 640px+ (small tablets)
- **md**: 768px+ (tablets)
- **lg**: 1024px+ (laptops)
- **xl**: 1280px+ (desktops)
- **2xl**: 1536px+ (large screens)

### Mobile-First Principles
- Default styles target mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interactions (44px minimum tap targets)
- Swipe gestures for carousels and navigation

### Performance on Mobile
- Lazy loading for images and heavy components
- Optimized animations using CSS transforms
- Reduced motion support via `prefers-reduced-motion`
- Minimal JavaScript bundle size

## 🔧 Key Features & Components

### Download System
- **Real-time Tracking**: Supabase triggers update download counts instantly
- **File Management**: Support for multiple versions and addon files
- **Analytics**: Track download patterns and popular content
- **Mobile Downloads**: Optimized download flow for mobile devices

### Project Management
- **CRUD Operations**: Full project lifecycle management
- **Rich Content**: Markdown support with custom syntax
- **Image Galleries**: Multiple image support with lazy loading
- **Video Integration**: YouTube API for showcase videos

### Navigation & Discovery
- **Responsive Navbar**: Adaptive sizing with logo and navigation
- **Filter System**: Advanced filtering for downloads page
- **Search Functionality**: (Planned) Full-text search across projects
- **Categorization**: Projects organized by type and compatibility

### Video Features
- **YouTube Integration**: Latest videos from Redstone Chicken channel
- **Video Carousels**: Smooth scrolling with thumbnail navigation
- **Auto-play Support**: Configurable video playback
- **Mobile Optimization**: Touch-friendly video controls

## 📊 Performance Optimization Guidelines

### Image Optimization
- **Lazy Loading**: Intersection observer for progressive loading
- **Format Selection**: WebP/AVIF when supported, fallback to JPG
- **Responsive Images**: Multiple sizes for different screen densities
- **Compression**: Optimized file sizes without quality loss

### Code Splitting
- **Route-based Splitting**: Separate bundles for each page
- **Component Lazy Loading**: Dynamic imports for heavy components
- **Tree Shaking**: Remove unused code from production bundles
- **Dependency Optimization**: Minimal third-party libraries

### Runtime Performance
- **React Query Caching**: Intelligent caching for API responses
- **Memoization**: useMemo and useCallback for expensive operations
- **Virtual Scrolling**: For large lists (planned enhancement)
- **Animation Optimization**: CSS transforms over layout changes

## 🎮 Content Guidelines

### Project Types
- **"Addon"**: Behavior packs, resource packs (NOT "mod")
- **"Texture Pack"**: Visual enhancement packs
- **Minecraft Versions**: Bedrock edition focus
- **Compatibility**: Clear version requirements

### Content Standards
- **Descriptions**: Rich markdown with custom syntax support
- **Images**: High-quality screenshots and promotional images
- **Videos**: Showcase gameplay and installation guides
- **Downloads**: Multiple format support (.mcpack, .mcworld)

### SEO & Discoverability
- **Semantic HTML**: Proper heading structure and ARIA labels
- **Meta Tags**: Dynamic meta descriptions for each project
- **Structured Data**: Schema.org markup for projects
- **URL Structure**: Clean, descriptive URLs

## 🔌 Integrations & APIs

### Supabase Backend
- **Database**: PostgreSQL with real-time subscriptions
- **Authentication**: Email/password and social login (planned)
- **File Storage**: Project files and images
- **Edge Functions**: Custom API endpoints

### YouTube API
- **Channel Statistics**: Subscriber count, video count, total views
- **Latest Videos**: Automatic fetching of recent uploads
- **Video Metadata**: Titles, descriptions, thumbnails
- **Rate Limiting**: Efficient API usage within quotas

### External Services
- **CDN**: Image optimization and delivery
- **Analytics**: User behavior tracking (planned)
- **Error Monitoring**: Crash reporting and debugging
- **Email**: Transactional emails (planned)

## 🚀 Deployment & DevOps

### Environment Setup
- **Development**: Local Vite dev server with hot reload
- **Staging**: Lovable preview deployments
- **Production**: Lovable hosted with custom domain support
- **Database**: Supabase hosted PostgreSQL

### CI/CD Pipeline
- **Automated Testing**: Component tests and E2E tests (planned)
- **Code Quality**: ESLint, Prettier, TypeScript checking
- **Deployment**: Automatic deployment on code changes
- **Rollback**: Quick rollback capability for issues

### Monitoring & Maintenance
- **Error Tracking**: Real-time error reporting
- **Performance Monitoring**: Core Web Vitals tracking
- **Database Monitoring**: Query performance and health
- **Security**: Regular dependency updates and security scans

## 🎯 User Experience Guidelines

### Accessibility
- **WCAG Compliance**: AA level accessibility standards
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: High contrast ratios for readability

### Loading States
- **Skeleton Screens**: Placeholder content during loading
- **Progressive Loading**: Content appears as it becomes available
- **Error States**: Clear error messages with retry options
- **Empty States**: Helpful messages when no content exists

### Mobile UX
- **Touch Gestures**: Swipe navigation for carousels
- **Pull-to-Refresh**: Native-like refresh interactions
- **Offline Support**: Basic offline functionality (planned)
- **App-like Feel**: PWA capabilities (planned)

## 🔧 Development Best Practices

### Code Quality
- **TypeScript**: Strict mode enabled, full type coverage
- **ESLint**: Custom rules for React and TypeScript
- **Prettier**: Consistent code formatting
- **Git Hooks**: Pre-commit hooks for quality checks

### Component Development
- **Storybook**: Component documentation (planned)
- **Testing**: Unit tests for critical components
- **Props Validation**: TypeScript interfaces for all props
- **Documentation**: JSDoc comments for complex functions

### Performance Best Practices
- **Bundle Analysis**: Regular bundle size monitoring
- **Lighthouse Scores**: Target 90+ scores across all metrics
- **Real User Monitoring**: Track actual user performance
- **Progressive Enhancement**: Core functionality works without JS

## 📈 Future Roadmap

### Short Term (Next 2-4 weeks)
- [ ] Search functionality implementation
- [ ] User authentication system
- [ ] Project rating and review system
- [ ] Enhanced mobile experience

### Medium Term (1-3 months)
- [ ] PWA implementation
- [ ] Advanced analytics dashboard
- [ ] Social sharing features
- [ ] Notification system

### Long Term (3-6 months)
- [ ] User-generated content
- [ ] Community features
- [ ] Advanced search with AI
- [ ] Multi-language support

## 🐛 Known Issues & Technical Debt

### Current Issues
- Large component files (being refactored)
- Some mobile nav text overflow (fixed)
- Download page layout shifts (fixed)
- Video carousel centering (fixed)

### Technical Debt
- Legacy components need refactoring
- Unused imports cleanup needed
- Bundle size optimization pending
- Test coverage improvement needed

## 🔍 SEO & Marketing

### Content Strategy
- **Educational Content**: How-to guides and tutorials
- **Showcase Videos**: Project demonstrations
- **Community Engagement**: Discord and social media
- **Influencer Partnerships**: Minecraft content creators

### Technical SEO
- **Site Speed**: Optimized loading times
- **Mobile-First**: Mobile-optimized design
- **Structured Data**: Rich snippets for projects
- **XML Sitemap**: Automatic sitemap generation

This knowledge base should be updated regularly as the project evolves and new features are added.