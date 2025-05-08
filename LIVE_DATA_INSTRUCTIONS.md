# Live Data Fetching Implementation Guide

This document explains the live data fetching feature implemented in Yorker Yoda and how to use it effectively.

## Overview

The Yorker Yoda application now fetches live PSL 2025 data from Cricinfo to keep the points table, team standings, match results, and upcoming matches up-to-date. The implementation ensures reliable data access even when faced with common issues like CORS restrictions or network failures.

## How It Works

The data fetching process occurs:
- Automatically when the page loads
- Every hour for long user sessions
- When manually triggered (in debug mode)

## Implementation Details

### 1. Data Sources

The application fetches data from these Cricinfo endpoints:
- **Standings/Points Table**: Team statistics, points, NRR, etc.
- **Fixtures**: Upcoming match schedule
- **Results**: Recent match results and scores

### 2. Reliability Features

To ensure reliability, the application implements:

- **Progressive Fetch Methods**:
  - Direct fetch attempt first
  - CORS proxy fallback if direct fetch fails
  - Custom serverless API proxy as a tertiary option
  
- **Data Persistence**:
  - localStorage caching for offline/return visits
  - Default data fallback (from May 3, 2025) if all fetching fails
  
- **Error Handling**:
  - Comprehensive error capturing and reporting
  - Graceful degradation to cached/default data

### 3. Performance Considerations

- Fetch operations run asynchronously to avoid blocking the UI
- Data is cached to minimize network requests
- Content is only updated when new data is available

## Usage & Testing

### Regular Usage

The live data fetching happens automatically - no user action is required.

### Debug Mode

For testing and troubleshooting, you can enable debug mode:

1. Add `?debug=true` to the URL (e.g., `index.html?debug=true`)
2. A debug console will appear in the bottom-right corner
3. Use the "Refresh Data" button to manually trigger data fetching
4. View detailed logs of the fetch process

### Testing CORS Features

To test how the application handles CORS issues:
1. Open the developer console
2. Go to the Network tab
3. Notice the sequence of fetch attempts when direct access fails

## Deployment Notes

For optimal performance with the CORS proxy:

1. Deploy to a platform supporting serverless functions (Vercel, Netlify)
2. The included `/api/proxy.js` will automatically handle CORS issues

## Troubleshooting

If data isn't updating:

1. Enable debug mode (`?debug=true`)
2. Check the console for specific error messages
3. Ensure the application has network connectivity
4. Verify localStorage is available (not in private browsing mode)
5. Clear browser cache and reload if necessary

## Future Enhancements

Planned improvements:
- Cricket API integration (if available)
- More data points for enhanced prediction accuracy
- Push notifications for live match updates
- Expanded tournament support beyond PSL
