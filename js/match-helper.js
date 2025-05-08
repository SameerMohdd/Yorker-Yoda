/**
 * Match Helper Functions for Yorker Yoda
 * This file contains helper functions to fix issues with matches display
 */

// Improved function to get upcoming matches
function getUpcomingMatchesImproved() {
    try {
        // Debug log
        console.log("Getting upcoming matches with improved function");
        
        // Initialize empty matches object
        const upcomingMatches = {};
        
        // Check if allMatches exists
        if (!window.allMatches || typeof window.allMatches !== 'object') {
            console.error("allMatches not properly initialized in global scope");
            
            // Try to get matches from hardcoded updates
            if (window.hardcodedUpdates && window.hardcodedUpdates.matches) {
                console.log("Using hardcoded matches as fallback");
                
                // Filter and return only future matches
                for (const [key, match] of Object.entries(window.hardcodedUpdates.matches)) {
                    if (isDateInFuture(match.date)) {
                        upcomingMatches[key] = match;
                    }
                }
                
                return upcomingMatches;
            }
            
            // Try to get matches from default data
            if (window.DEFAULT_PSL_DATA && window.DEFAULT_PSL_DATA.matches) {
                console.log("Using default PSL data matches as fallback");
                
                // Filter and return only future matches
                for (const [key, match] of Object.entries(window.DEFAULT_PSL_DATA.matches)) {
                    if (isDateInFuture(match.date)) {
                        upcomingMatches[key] = match;
                    }
                }
                
                return upcomingMatches;
            }
            
            console.error("No fallback matches data found");
            return {};
        }
        
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Log today's date for debugging
        console.log("Today's date for comparison:", today.toISOString());
        
        // Loop through all matches and filter for upcoming ones
        for (const [key, match] of Object.entries(window.allMatches)) {
            try {
                if (match && match.date) {
                    const matchDate = new Date(match.date);
                    
                    // Log match date for debugging
                    console.log(`Match ${key} date:`, matchDate.toISOString(), "Is upcoming:", matchDate >= today);
                    
                    if (matchDate >= today) {
                        upcomingMatches[key] = match;
                    }
                } else {
                    console.warn(`Match ${key} has invalid date:`, match && match.date);
                }
            } catch (error) {
                console.error(`Error processing match ${key}:`, error);
            }
        }
        
        // If no upcoming matches, return all matches as fallback
        if (Object.keys(upcomingMatches).length === 0) {
            console.warn("No upcoming matches found. Using all matches as fallback.");
            return window.allMatches;
        }
        
        return upcomingMatches;
    } catch (error) {
        console.error("Error in getUpcomingMatchesImproved:", error);
        
        // Return all matches as fallback in case of error
        if (window.allMatches) {
            return window.allMatches;
        } else {
            return {};
        }
    }
}

// Helper function to check if a date is in the future
function isDateInFuture(dateStr) {
    if (!dateStr) return false;
    
    try {
        const date = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return date >= today;
    } catch (error) {
        console.error("Error comparing dates:", error);
        return false;
    }
}

// Improved function to populate upcoming matches section
function populateUpcomingMatchesImproved() {
    // Get the matches container
    const upcomingMatchesList = document.getElementById('upcoming-matches-list');
    if (!upcomingMatchesList) {
        console.error("Could not find upcoming-matches-list element");
        return;
    }
    
    // Start with a loading indicator
    upcomingMatchesList.innerHTML = `
        <div id="matches-loading" style="text-align: center; padding: 20px;">
            <div style="display: inline-block; width: 30px; height: 30px; border: 3px solid #eee; border-radius: 50%; border-top-color: #B27F35; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 10px; color: #666;">Loading upcoming matches...</p>
        </div>
    `;
    
    try {
        // Get upcoming matches
        const upcomingMatches = getUpcomingMatchesImproved();
        
        let html = '';
        let count = 0;
        
        // Check if we have any upcoming matches
        if (!upcomingMatches || Object.keys(upcomingMatches).length === 0) {
            upcomingMatchesList.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #666;">
                    <p>No upcoming matches found.</p>
                    <button id="refresh-matches-btn" style="background: #B27F35; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px;">Refresh Matches</button>
                </div>
            `;
            
            // Add event listener to refresh button
            const refreshBtn = document.getElementById('refresh-matches-btn');
            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    // Implement data refresh logic
                    fixDataIssues();
                });
            }
            
            return;
        }
        
        // Loop through upcoming matches
        for (const [key, match] of Object.entries(upcomingMatches)) {
            if (count >= 6) break; // Show only 6 upcoming matches
            
            try {
                const matchDate = new Date(match.date);
                const dateStr = matchDate.toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short', 
                    day: 'numeric',
                    year: '2-digit'
                });
                
                // Handle team logos safely
                let team1Logo = '<img src="/api/placeholder/40/40" alt="Logo placeholder" />';
                let team2Logo = '<img src="/api/placeholder/40/40" alt="Logo placeholder" />';
                
                try {
                    // Check if teams are TBA
                    if (!match.team1.includes('TBA')) {
                        team1Logo = `<img src="logo/${match.team1.toLowerCase().replace(' ', '_')}.png" alt="${match.team1} Logo" />`;
                    }
                    
                    if (!match.team2.includes('TBA')) {
                        team2Logo = `<img src="logo/${match.team2.toLowerCase().replace(' ', '_')}.png" alt="${match.team2} Logo" />`;
                    }
                } catch (logoError) {
                    console.error("Error loading team logos:", logoError);
                }
                
                // Format match number/title
                const matchTitle = key.includes('Match') ? `${key.replace('Match', 'Match ')}` : key;
                
                // Generate HTML for this match item
                html += `
                    <div class="match-item">
                        <div class="match-item-header">${dateStr} • ${match.time} • ${match.venue}</div>
                        <div class="match-item-teams">
                            <div class="match-item-team">
                                <div class="match-item-logo">
                                    ${team1Logo}
                                </div>
                                <div class="match-item-name">${match.team1}</div>
                            </div>
                            <div class="match-item-vs">VS</div>
                            <div class="match-item-team">
                                <div class="match-item-logo">
                                    ${team2Logo}
                                </div>
                                <div class="match-item-name">${match.team2}</div>
                            </div>
                        </div>
                        <div class="match-item-footer">${matchTitle}</div>
                    </div>
                `;
                count++;
            } catch (error) {
                console.error(`Error processing match ${key}:`, error);
            }
        }
        
        // Display the matches or error message
        if (html === '') {
            upcomingMatchesList.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #666;">
                    <p>Error displaying upcoming matches.</p>
                    <button id="refresh-matches-btn" style="background: #B27F35; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px;">Retry</button>
                </div>
            `;
            
            // Add event listener to retry button
            const refreshBtn = document.getElementById('refresh-matches-btn');
            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    populateUpcomingMatchesImproved();
                });
            }
        } else {
            upcomingMatchesList.innerHTML = html;
        }
    } catch (error) {
        console.error("Error in populateUpcomingMatchesImproved:", error);
        
        upcomingMatchesList.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #666;">
                <p>Error loading upcoming matches.</p>
                <button id="refresh-matches-btn" style="background: #B27F35; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px;">Retry</button>
            </div>
        `;
        
        // Add event listener to retry button
        const refreshBtn = document.getElementById('refresh-matches-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                populateUpcomingMatchesImproved();
            });
        }
    }
}

// Improved match selector population
function populateMatchSelectorImproved() {
    const matchButtonsContainer = document.getElementById('quick-match-buttons');
    if (!matchButtonsContainer) {
        console.error("Could not find quick-match-buttons element");
        return;
    }
    
    matchButtonsContainer.innerHTML = '';
    
    try {
        // Get upcoming matches
        const upcomingMatches = getUpcomingMatchesImproved();
        let count = 0;
        
        // Check if we have any upcoming matches
        if (!upcomingMatches || Object.keys(upcomingMatches).length === 0) {
            matchButtonsContainer.innerHTML = `
                <div style="text-align: center; padding: 20px; width: 100%;">
                    <p style="color: #666;">No upcoming matches found.</p>
                </div>
            `;
            return;
        }
        
        // Loop through upcoming matches
        for (const [key, match] of Object.entries(upcomingMatches)) {
            if (count >= 6) break; // Show only 6 upcoming matches
            
            try {
                const matchDate = new Date(match.date);
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                // Format date string
                const dateStr = matchDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric'
                });
                
                // Add today/tomorrow label
                let timeLabel = '';
                if (matchDate.toDateString() === today.toDateString()) {
                    timeLabel = ' (Today)';
                } else if (matchDate.toDateString() === tomorrow.toDateString()) {
                    timeLabel = ' (Tomorrow)';
                }
                
                // Create the button element
                const button = document.createElement('button');
                button.className = 'match-button';
                button.dataset.matchId = key;
                
                // Handle team icons safely
                let team1Icon = '';
                let team2Icon = '';
                
                try {
                    if (!match.team1.includes('TBA')) {
                        team1Icon = `<img src="logo/${match.team1.toLowerCase().replace(' ', '_')}.png" alt="${match.team1}" class="team-icon">`;
                    }
                    
                    if (!match.team2.includes('TBA')) {
                        team2Icon = `<img src="logo/${match.team2.toLowerCase().replace(' ', '_')}.png" alt="${match.team2}" class="team-icon">`;
                    }
                } catch (logoError) {
                    console.error("Error creating team icons:", logoError);
                }
                
                // Set button content
                button.innerHTML = `
                    <div>
                        <div class="match-button-teams">${team1Icon} ${match.team1} vs ${team2Icon} ${match.team2}</div>
                        <div class="match-button-details">${dateStr}${timeLabel} • ${match.time} • ${match.venue}</div>
                    </div>
                `;
                
                // Add click event
                button.addEventListener('click', function() {
                    // Remove 'selected' class from all buttons
                    document.querySelectorAll('.match-button').forEach(btn => {
                        btn.classList.remove('selected');
                    });
                    
                    // Add 'selected' class to clicked button
                    this.classList.add('selected');
                    
                    // Show match details
                    if (typeof window.showMatchDetails === 'function') {
                        window.showMatchDetails(this.dataset.matchId);
                    } else {
                        console.error("showMatchDetails function not found in global scope");
                    }
                });
                
                // Add button to container
                matchButtonsContainer.appendChild(button);
                count++;
            } catch (error) {
                console.error(`Error creating match button for ${key}:`, error);
            }
        }
        
        // If no buttons were created, show message
        if (count === 0) {
            matchButtonsContainer.innerHTML = `
                <div style="text-align: center; padding: 20px; width: 100%;">
                    <p style="color: #666;">No upcoming matches available.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error in populateMatchSelectorImproved:", error);
        
        matchButtonsContainer.innerHTML = `
            <div style="text-align: center; padding: 20px; width: 100%;">
                <p style="color: #666;">Error loading match selector.</p>
                <button id="retry-selector-btn" style="background: #B27F35; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px;">Retry</button>
            </div>
        `;
        
        // Add event listener to retry button
        const retryBtn = document.getElementById('retry-selector-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', function() {
                populateMatchSelectorImproved();
            });
        }
    }
}

// Function to fix data issues
function fixDataIssues() {
    console.log("Attempting to fix data issues...");
    
    // Apply hardcoded updates if available
    if (window.hardcodedUpdates && typeof window.hardcodedUpdates.applyUpdates === 'function') {
        try {
            console.log("Applying hardcoded updates...");
            
            // Get base data
            let baseData = null;
            
            if (window.pslDataFetcher && typeof window.pslDataFetcher.getCachedData === 'function') {
                baseData = window.pslDataFetcher.getCachedData();
            }
            
            if (!baseData && window.DEFAULT_PSL_DATA) {
                baseData = window.DEFAULT_PSL_DATA;
            }
            
            if (!baseData) {
                console.error("No base data found for hardcoded updates");
                return false;
            }
            
            // Apply hardcoded updates
            const updatedData = window.hardcodedUpdates.applyUpdates(baseData);
            
            // Update global data structures
            window.pslData = {
                teams: updatedData.teams,
                headToHead: updatedData.headToHead,
                venues: updatedData.venues
            };
            
            window.allMatches = updatedData.matches;
            
            console.log("Hardcoded updates applied successfully");
            
            // Re-populate UI
            populateMatchSelectorImproved();
            populateUpcomingMatchesImproved();
            
            // Update points table if function exists
            if (typeof window.updatePointsTable === 'function') {
                window.updatePointsTable();
            }
            
            return true;
        } catch (error) {
            console.error("Error applying hardcoded updates:", error);
        }
    } else {
        console.warn("Hardcoded updates module not available");
    }
    
    // Try alternative approaches if hardcoded updates failed
    try {
        // Ensure allMatches is initialized
        if (!window.allMatches || Object.keys(window.allMatches).length === 0) {
            console.log("allMatches not initialized, attempting to fix...");
            
            if (window.DEFAULT_PSL_DATA && window.DEFAULT_PSL_DATA.matches) {
                window.allMatches = window.DEFAULT_PSL_DATA.matches;
                console.log("Applied default matches data");
            }
        }
        
        // Force UI update
        populateMatchSelectorImproved();
        populateUpcomingMatchesImproved();
        
        return true;
    } catch (error) {
        console.error("Error in alternative fixes:", error);
        return false;
    }
}

// Function to initialize the helper
function initMatchHelper() {
    console.log("Initializing match helper...");
    
    // Override window functions if they don't work properly
    const upcomingMatchesList = document.getElementById('upcoming-matches-list');
    const quickMatchButtons = document.getElementById('quick-match-buttons');
    
    if ((upcomingMatchesList && upcomingMatchesList.children.length === 0) || 
        (quickMatchButtons && quickMatchButtons.children.length === 0)) {
        
        console.log("Empty match displays detected, applying overrides...");
        
        // Override the window functions
        window.populateUpcomingMatches = populateUpcomingMatchesImproved;
        window.populateMatchSelector = populateMatchSelectorImproved;
        window.getUpcomingMatches = getUpcomingMatchesImproved;
        
        // Apply fixes immediately
        fixDataIssues();
    }
}

// Export functions to global scope
window.matchHelper = {
    init: initMatchHelper,
    fixData: fixDataIssues,
    populateMatches: populateUpcomingMatchesImproved,
    populateSelector: populateMatchSelectorImproved,
    getUpcomingMatches: getUpcomingMatchesImproved
};

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to let the original code run first
    setTimeout(initMatchHelper, 1000);
});
