# Yorker Yoda - PSL 2025 Match Predictor

A predictive analytics tool for Pakistan Super League (PSL) 2025 cricket matches with live data integration from Cricinfo.

## Features

- Live data fetching from Cricinfo for PSL 2025 
- Up-to-date team standings, match results, and upcoming fixtures
- Match prediction based on historical and current season performance
- Detailed match analysis with head-to-head statistics
- Weather and venue impact considerations
- Social media highlights integration
- Responsive design for all devices

## Live Data Integration

The application automatically fetches the latest PSL 2025 data from Cricinfo:

- Team standings and performance statistics
- Match results and scores
- Upcoming match schedules
- Head-to-head records

Data is refreshed:
- On page load
- Every hour (for long-duration sessions)
- When manually triggered via the debug console

## Technical Implementation

### Data Fetching Architecture

The application uses a multi-layer approach to ensure reliable data access:

1. **Direct Fetch**: Attempts to directly fetch data from Cricinfo
2. **CORS Proxy**: If direct fetch fails due to CORS restrictions, falls back to using a CORS proxy
3. **Local Cache**: Stores fetched data in localStorage to minimize network requests
4. **Default Data**: Uses embedded default data (last updated May 3, 2025) as a final fallback

### Key Components

- **data-fetcher.js**: Handles the core data retrieval from Cricinfo
- **data-integration.js**: Integrates fetched data into the application
- **cors-proxy.js**: Manages CORS proxy selection and fallback mechanisms
- **default-data.js**: Provides fallback data when live fetching fails
- **debug-logger.js**: Optional debugging utilities (enabled with ?debug=true URL parameter)

## Deployment

For optimal performance with the CORS proxy:

1. Deploy to a platform like Vercel or Netlify
2. The included `/api/proxy.js` serverless function will handle CORS issues

## Debugging

To enable debug mode, add `?debug=true` to the URL. This will show a debug console with:

- Data fetching logs
- Error messages
- Current data inspection
- Manual data refresh option

## Future Enhancements

- Expanded historical data integration
- Player-specific performance analytics
- More sophisticated prediction algorithms
- Additional cricket tournament support
