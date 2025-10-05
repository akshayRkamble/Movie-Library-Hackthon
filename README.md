# Movie Library

A modern, responsive web application for browsing and managing movies built with R## Implementation Details

### Key Technical Enhancements
1. **Type Safety**
   - Implemented full TypeScript support
   - Created comprehensive type definitions for TMDB API responses
   - Added proper error handling with type checking

2. **State Management**
   - Used React Query for efficient API data management
   - Implemented Context API for watchlist state
   - Added proper caching and invalidation strategies

3. **Performance Optimizations**
   - Implemented infinite scrolling for better load times
   - Added debounced search to minimize API calls
   - Optimized component re-renders

### Design Choices & Assumptionsact, TypeScript, and Vite. The application uses The Movie Database (TMDB) API to fetch movie data and provides features for searching, filtering, and managing a personal watchlist.

## Core Requirements
✅ Fetch and display popular movies using TMDB API
✅ Search functionality for finding movies by title
✅ Grid layout displaying movie posters and titles
✅ Add/Remove movies to/from Watchlist with localStorage persistence
✅ Separate Watchlist view for saved movies

## Enhanced Features
I've extended the core requirements with the following additional features:

1. **Advanced Movie Browsing**
   - 🎬 Infinite scrolling for seamless movie exploration
   - 🔍 Real-time search suggestions as you type
   - � Fixed header navigation that stays visible while scrolling

2. **Enhanced Filtering System**
   - 🌍 Region-based filtering (e.g., United States, United Kingdom, Japan)
   - 🗣️ Language filtering with support for major film languages
   - � Visual genre representation with color-coded badges

3. **Detailed Movie Information**
   - 📋 Structured information display:
     ```
     Genre:    [Thriller] [Drama] [History]
     Country:  [United States of America]
     Language: [English]
     ```
   - ⭐ TMDB rating and vote count
   - ⏱️ Movie runtime
   - 🎬 Release status (In Theaters, Coming Soon, etc.)
   - 📺 Streaming availability information

4. **Enhanced Watchlist Features**
   - � Real-time watchlist counter in navigation
   - 💾 Persistent storage using localStorage
   - 🔄 Quick add/remove functionality from any view

5. **UI/UX Improvements**
   - 📱 Fully responsive design for all screen sizes
   - � Color-coded badges for better visual categorization:
     - Teal: Genres
     - Purple: Country
     - Blue: Language
   - 🖼️ Image fallbacks for missing posters
   - 💫 Smooth animations and transitions

6. **Performance Optimizations**
   - ⚡ Debounced search to prevent API spam
   - 📦 Efficient caching with React Query
   - 🔄 Optimized re-rendering with React hooks

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI
- **State Management**: React Query, Context API
- **Routing**: React Router
- **API Integration**: Axios
- **Movie Data**: TMDB API

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Movie-Library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your TMDB API credentials:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

### Local Production Build

```bash
npm run build
npm run preview
```

The application is deployed at: [Movie Library](https://movie-library-project-hackthon.vercel.app)

## Live Demo
👉 [Visit Movie Library App](https://movie-library-project-hackthon.vercel.app)

## Design Choices & Assumptions

### Filtering Implementation
- **Language Filter**: Client-side filtering for better user experience
- **Region Filter**: Server-side filtering using TMDB API parameters
- **Genre Display**: Badges with color coding for better visual hierarchy

### UI/UX Decisions
1. **Fixed Header**
   - Navigation bar stays visible while scrolling
   - Shows watchlist count for quick reference

2. **Movie Cards**
   - Structured information display:
     ```
     Genre:    [Thriller] [Drama] [History]
     Country:  [United States of America]
     Language: [English]
     ```
   - Color-coded badges for better visual categorization:
     - Teal: Genres
     - Purple: Country
     - Blue: Language

3. **Watchlist Features**
   - Persistent storage using localStorage
   - Counter badge in navigation
   - Quick add/remove functionality

### Performance Considerations
- Infinite scrolling for better load times
- Debounced search to prevent API spam
- React Query for efficient caching
- Optimized image loading with fallbacks

### Language Support
- Focused on major film industry languages
- Primary languages included:
  - English
  - Spanish
  - French
  - German
  - Italian
  - Japanese
  - Korean
  - Chinese
  - Hindi
  - Russian
  - Portuguese

## Future Improvements

1. Advanced Filtering
   - Multiple genre selection
   - Release year range
   - Rating range

2. User Features
   - Custom movie lists
   - Ratings and reviews
   - Social sharing

3. Performance
   - Image lazy loading
   - Progressive loading
   - Service worker for offline support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- TMDB API for movie data
- Chakra UI for component library
- React Query for data fetching
- All contributors and maintainers