/**
 * CORS Proxy Service for Yorker Yoda
 * 
 * This module provides a CORS proxy functionality to allow fetching data 
 * from Cricinfo and other cricket data sources that might have CORS restrictions.
 */

// List of CORS proxies that can be used
const CORS_PROXIES = [
    // Custom proxy (when deployed)
    '/api/proxy?url=',
    
    // Public CORS proxies as fallbacks
    'https://corsproxy.io/?',
    'https://api.allorigins.win/raw?url=',
    'https://cors-anywhere.herokuapp.com/'
];

// Track which proxy is currently working
let currentProxyIndex = 0;
let lastSuccessfulProxy = localStorage.getItem('last_successful_proxy_index') || 0;

/**
 * Creates a proxied URL for the given source URL
 * @param {string} url - The source URL to fetch
 * @returns {string} The proxied URL
 */
function createProxiedUrl(url) {
    // Start with the last successful proxy
    currentProxyIndex = parseInt(lastSuccessfulProxy);
    return `${CORS_PROXIES[currentProxyIndex]}${encodeURIComponent(url)}`;
}

/**
 * Fetches data through the CORS proxy
 * @param {string} url - The source URL to fetch
 * @returns {Promise<Response>} The fetch response
 */
async function fetchWithProxy(url) {
    // Try with the current proxy
    try {
        const proxiedUrl = createProxiedUrl(url);
        console.log(`Attempting to fetch via proxy: ${CORS_PROXIES[currentProxyIndex]}`);
        
        const response = await fetch(proxiedUrl);
        
        if (response.ok) {
            // Store the successful proxy index
            localStorage.setItem('last_successful_proxy_index', currentProxyIndex.toString());
            return response;
        } else {
            throw new Error(`Proxy returned ${response.status}`);
        }
    } catch (error) {
        console.warn(`Proxy ${currentProxyIndex} failed:`, error);
        
        // Try next proxy
        currentProxyIndex = (currentProxyIndex + 1) % CORS_PROXIES.length;
        
        // If we've tried all proxies, give up
        if (currentProxyIndex === parseInt(lastSuccessfulProxy)) {
            throw new Error('All CORS proxies failed');
        }
        
        // Try again with the next proxy
        return fetchWithProxy(url);
    }
}

// Export the proxy functions to the global scope
window.corsProxy = {
    fetch: fetchWithProxy,
    createUrl: createProxiedUrl
};
