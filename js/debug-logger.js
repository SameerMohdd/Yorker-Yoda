/**
 * Debug Logger for Yorker Yoda
 * 
 * Provides utilities for logging and debugging the data fetching process.
 * Enable with URL parameter: ?debug=true
 */

// Debug mode state
let debugMode = false;

// Initialize the debug logger
function initDebugLogger() {
    // Check URL parameters for debug flag
    const urlParams = new URLSearchParams(window.location.search);
    debugMode = urlParams.get('debug') === 'true';
    
    if (debugMode) {
        // Create UI for debugging
        createDebugUI();
        
        // Override console.log and other methods to capture logs
        setupConsoleOverrides();
        
        console.log("Debug mode enabled");
    }
}

// Create debug UI panel
function createDebugUI() {
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debug-panel';
    debugPanel.style.cssText = `
        position: fixed;
        bottom: 0;
        right: 0;
        width: 400px;
        height: 300px;
        background-color: rgba(0, 0, 0, 0.8);
        color: #0f0;
        font-family: monospace;
        font-size: 12px;
        padding: 10px;
        overflow-y: auto;
        z-index: 9999;
        border-top-left-radius: 10px;
        border-left: 1px solid #2B6735;
        border-top: 1px solid #2B6735;
    `;
    
    const heading = document.createElement('div');
    heading.textContent = "Yorker Yoda Debug Console";
    heading.style.cssText = `
        font-weight: bold;
        margin-bottom: 10px;
        border-bottom: 1px solid #2B6735;
        padding-bottom: 5px;
        color: #B27F35;
    `;
    
    const logContainer = document.createElement('div');
    logContainer.id = 'debug-logs';
    logContainer.style.cssText = `
        height: calc(100% - 30px);
        overflow-y: auto;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.cssText = `
        position: absolute;
        top: 5px;
        right: 5px;
        background: #B27F35;
        color: white;
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 10px;
        cursor: pointer;
    `;
    
    closeButton.addEventListener('click', function() {
        debugPanel.style.display = 'none';
    });
    
    // Add toggle button to show/hide panel
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Debug';
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 5px;
        right: 5px;
        background: #2B6735;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 12px;
        cursor: pointer;
        z-index: 10000;
        display: none;
    `;
    
    toggleButton.addEventListener('click', function() {
        if (debugPanel.style.display === 'none') {
            debugPanel.style.display = 'block';
            toggleButton.style.display = 'none';
        }
    });
    
    // Add refresh data button
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Refresh Data';
    refreshButton.style.cssText = `
        margin-top: 10px;
        background: #2B6735;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 12px;
        cursor: pointer;
    `;
    
    refreshButton.addEventListener('click', function() {
        if (window.pslDataFetcher && typeof window.pslDataFetcher.forceRefresh === 'function') {
            console.log("Forcing PSL data refresh...");
            window.pslDataFetcher.forceRefresh();
            if (window.pslDataIntegration && typeof window.pslDataIntegration.integrate === 'function') {
                window.pslDataIntegration.integrate();
            }
        }
    });
    
    // Add clear logs button
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Logs';
    clearButton.style.cssText = `
        margin-top: 10px;
        margin-left: 10px;
        background: #B27F35;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 12px;
        cursor: pointer;
    `;
    
    clearButton.addEventListener('click', function() {
        const logContainer = document.getElementById('debug-logs');
        if (logContainer) {
            logContainer.innerHTML = '';
        }
    });
    
    // Append elements
    debugPanel.appendChild(heading);
    debugPanel.appendChild(logContainer);
    debugPanel.appendChild(closeButton);
    debugPanel.appendChild(refreshButton);
    debugPanel.appendChild(clearButton);
    
    document.body.appendChild(debugPanel);
    document.body.appendChild(toggleButton);
    
    // Make the debug panel draggable
    makeDraggable(debugPanel, heading);
}

// Make an element draggable
function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    handle.style.cursor = 'move';
    handle.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set the element's new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
        element.style.bottom = 'auto';
        element.style.right = 'auto';
    }
    
    function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Override console methods to capture logs
function setupConsoleOverrides() {
    const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info
    };
    
    function addLogToUI(type, args) {
        const logContainer = document.getElementById('debug-logs');
        if (!logContainer) return;
        
        const logEntry = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString();
        let color = '';
        
        switch (type) {
            case 'log':
                color = '#0f0';
                break;
            case 'warn':
                color = '#ff0';
                break;
            case 'error':
                color = '#f00';
                break;
            case 'info':
                color = '#0ff';
                break;
        }
        
        logEntry.style.color = color;
        logEntry.style.marginBottom = '3px';
        
        // Format the args nicely
        let message = '';
        for (const arg of args) {
            if (typeof arg === 'object') {
                try {
                    message += JSON.stringify(arg, null, 2) + ' ';
                } catch (e) {
                    message += arg + ' ';
                }
            } else {
                message += arg + ' ';
            }
        }
        
        logEntry.textContent = `[${timestamp}] ${message}`;
        logContainer.appendChild(logEntry);
        
        // Auto-scroll to bottom
        logContainer.scrollTop = logContainer.scrollHeight;
    }
    
    // Override console methods
    console.log = function() {
        originalConsole.log.apply(console, arguments);
        if (debugMode) {
            addLogToUI('log', arguments);
        }
    };
    
    console.warn = function() {
        originalConsole.warn.apply(console, arguments);
        if (debugMode) {
            addLogToUI('warn', arguments);
        }
    };
    
    console.error = function() {
        originalConsole.error.apply(console, arguments);
        if (debugMode) {
            addLogToUI('error', arguments);
        }
    };
    
    console.info = function() {
        originalConsole.info.apply(console, arguments);
        if (debugMode) {
            addLogToUI('info', arguments);
        }
    };
}

// Add data inspection features
function inspectData() {
    console.log("--- CURRENT PSL DATA ---");
    if (window.pslData) {
        console.log("Teams data:", window.pslData.teams);
        console.log("Head-to-head data:", window.pslData.headToHead);
        console.log("Venues data:", window.pslData.venues);
    } else {
        console.log("No PSL data available");
    }
    
    console.log("--- MATCH DATA ---");
    if (window.allMatches) {
        console.log("Matches:", window.allMatches);
    } else {
        console.log("No match data available");
    }
    
    console.log("--- STORAGE DATA ---");
    try {
        console.log("localStorage entries:", Object.keys(localStorage).length);
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes('psl')) {
                console.log(`${key}: ${localStorage.getItem(key).substring(0, 100)}...`);
            }
        }
    } catch (e) {
        console.error("Error accessing localStorage:", e);
    }
}

// Function to specifically debug the upcoming matches
function debugUpcomingMatches() {
    console.log("--- DEBUGGING UPCOMING MATCHES ---");
    
    // Check if getUpcomingMatches function exists
    if (typeof window.getUpcomingMatches === 'function') {
        const upcomingMatches = window.getUpcomingMatches();
        console.log("Upcoming matches from function:", upcomingMatches);
        console.log("Number of upcoming matches:", Object.keys(upcomingMatches).length);
        
        if (Object.keys(upcomingMatches).length === 0) {
            console.warn("No upcoming matches found. This could be why no matches are displayed.");
        }
        
        // Check today's date
        const today = new Date();
        console.log("Current date:", today.toISOString());
        
        // Debug match dates
        if (window.allMatches) {
            for (const [key, match] of Object.entries(window.allMatches)) {
                const matchDate = new Date(match.date);
                console.log(`Match: ${key}, Date: ${match.date}, Is future date: ${matchDate >= today}`);
            }
        }
    } else {
        console.error("getUpcomingMatches function not found");
    }
    
    // Debug DOM elements
    const matchButtonsContainer = document.getElementById('quick-match-buttons');
    console.log("Match buttons container:", matchButtonsContainer);
    
    const upcomingMatchesList = document.getElementById('upcoming-matches-list');
    console.log("Upcoming matches list container:", upcomingMatchesList);
}

// Function to fix common data issues
function fixDataIssues() {
    console.log("Attempting to fix common data issues...");
    
    // Fix 1: Ensure allMatches is properly initialized
    if (!window.allMatches || Object.keys(window.allMatches).length === 0) {
        console.log("Fixing missing allMatches data...");
        
        // Use hardcoded matches if available
        if (window.hardcodedUpdates && window.hardcodedUpdates.matches) {
            window.allMatches = window.hardcodedUpdates.matches;
            console.log("Applied hardcoded matches data");
        } else if (window.DEFAULT_PSL_DATA && window.DEFAULT_PSL_DATA.matches) {
            window.allMatches = window.DEFAULT_PSL_DATA.matches;
            console.log("Applied default matches data");
        }
    }
    
    // Fix 2: Force repopulation of UI
    if (typeof window.populateMatchSelector === 'function') {
        window.populateMatchSelector();
        console.log("Repopulated match selector");
    }
    
    if (typeof window.populateUpcomingMatches === 'function') {
        window.populateUpcomingMatches();
        console.log("Repopulated upcoming matches");
    }
    
    console.log("Fix attempt completed");
    
    // Return status for logging
    return {
        allMatchesFixed: window.allMatches && Object.keys(window.allMatches).length > 0,
        upcomingMatchesCount: typeof window.getUpcomingMatches === 'function' ? 
            Object.keys(window.getUpcomingMatches()).length : 'unknown'
    };
}

// Export debug functions to global scope
window.debugLogger = {
    init: initDebugLogger,
    inspectData: inspectData,
    debugUpcomingMatches: debugUpcomingMatches,
    fixDataIssues: fixDataIssues,
    isEnabled: () => debugMode
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', initDebugLogger);
