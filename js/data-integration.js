/**
 * PSL 2025 Data Integration
 * This script integrates the fetched PSL 2025 data into the application
 */

// Main data integration function
async function integrateDataIntoApp() {
    try {
        // Initialize data fetcher and get data
        const pslData = await window.pslDataFetcher.init();
        if (!pslData) {
            console.error("Failed to get PSL data");
            return;
        }
        
        // Update application data
        updateApplicationData(pslData);
        
        // Update UI elements
        updateUIElements(pslData);
        
        // Update news ticker
        updateNewsTicker(pslData.newsItems);
        
        console.log("PSL data successfully integrated into the application!");
        
        // Display last update time
        const lastFetchTime = window.pslDataFetcher.getLastFetchTime();
        if (lastFetchTime) {
            console.log("Last data update:", lastFetchTime.toLocaleString());
        }
    } catch (error) {
        console.error("Error integrating PSL data:", error);
    }
}

/**
 * Updates the application's data structures with fetched data
 * @param {Object} pslData - The fetched PSL data
 */
function updateApplicationData(pslData) {
    // Update teams data
    if (pslData.teams) {
        window.pslData.teams = pslData.teams;
    }
    
    // Update head-to-head data
    if (pslData.headToHead) {
        window.pslData.headToHead = pslData.headToHead;
    }
    
    // Update venues data
    if (pslData.venues) {
        window.pslData.venues = pslData.venues;
    }
    
    // Update matches data
    if (pslData.matches) {
        window.allMatches = pslData.matches;
    }
}

/**
 * Updates the UI elements with the new data
 * @param {Object} pslData - The fetched PSL data
 */
function updateUIElements(pslData) {
    // Re-populate match selector with updated data
    if (typeof window.populateMatchSelector === 'function') {
        window.populateMatchSelector();
    }
    
    // Re-populate upcoming matches section if it exists
    if (typeof window.populateUpcomingMatches === 'function') {
        window.populateUpcomingMatches();
    }
    
    // Update any match details that are currently displayed
    const selectedButton = document.querySelector('.match-button.selected');
    if (selectedButton && typeof window.showMatchDetails === 'function') {
        window.showMatchDetails(selectedButton.dataset.matchId);
    }
    
    // Update points table if the function exists
    if (typeof window.updatePointsTable === 'function') {
        window.updatePointsTable();
    }
    
    // Update social media highlights with latest news
    updateSocialMediaHighlights(pslData);
    
    // Update the news ticker with latest information
    updateNewsTicker(pslData.newsItems);
    
    // Update the data-status element to show the latest update time
    updateDataStatusElement();
}

/**
 * Updates the news ticker with the latest news items
 * @param {Array} newsItems - Array of news item strings
 */
function updateNewsTicker(newsItems) {
    if (!newsItems || !newsItems.length) return;
    
    const tickerContent = document.querySelector('.ticker-content');
    if (!tickerContent) return;
    
    // Format news items for ticker
    const newsText = newsItems.map(item => `${item} • `).join(' ');
    const repeatedNews = newsText.repeat(2); // Repeat to ensure continuous scrolling
    
    tickerContent.innerHTML = repeatedNews;
}

/**
 * Updates the social media highlights section with latest information
 * @param {Object} pslData - The fetched PSL data
 */
function updateSocialMediaHighlights(pslData) {
    // Get the social posts container
    const socialPosts = document.querySelector('.social-posts');
    if (!socialPosts) return;
    
    // Create updated posts
    let postsHtml = '';
    
    // First post - Latest standings
    const topTeams = getTopTeams(pslData.teams, 3);
    postsHtml += createSocialPost({
        author: 'PSL Official',
        avatar: 'logo/psl.png',
        timeAgo: 'Yesterday',
        content: `Points Table Update: ${topTeams.map(team => `${team.name} (${team.points})`).join(', ')} leading the table! Which teams do you think will make it to the playoffs? #PSL2025`,
        likes: `${getRandomNumber(2, 7)}.${getRandomNumber(1, 9)}K`,
        comments: getRandomNumber(500, 900),
        shares: `${getRandomNumber(1, 3)}.${getRandomNumber(1, 9)}K`
    });
    
    // Second post - Latest match result
    if (pslData.newsItems && pslData.newsItems.length > 0) {
        const latestResult = pslData.newsItems[0];
        postsHtml += createSocialPost({
            author: extractTeamFromNews(latestResult),
            avatar: `logo/${getTeamLogo(extractTeamFromNews(latestResult))}`,
            timeAgo: 'Today',
            content: `${latestResult} 🏏 What a game! Thanks to all our fans for their support. #PSL2025 #CricketFever`,
            likes: `${getRandomNumber(3, 8)}.${getRandomNumber(1, 9)}K`,
            comments: getRandomNumber(300, 700),
            shares: `${getRandomNumber(1, 4)}.${getRandomNumber(1, 9)}K`
        });
    }
    
    // Third post - Player stats
    postsHtml += createSocialPost({
        author: 'Cricket Analyst',
        avatar: 'logo/analyst.jpeg',
        timeAgo: '5 hours ago',
        content: `${getRandomPlayerStat()} continues to impress in #PSL2025. The tournament has reached its crucial stage as teams fight for playoff spots. #CricketStats`,
        likes: `${getRandomNumber(1, 4)}.${getRandomNumber(1, 9)}K`,
        comments: getRandomNumber(200, 600),
        shares: getRandomNumber(500, 900)
    });
    
    // Update the social posts container
    socialPosts.innerHTML = postsHtml;
}

/**
 * Creates HTML for a social media post
 * @param {Object} postData - The post data
 * @returns {string} HTML for the social post
 */
function createSocialPost(postData) {
    return `
        <div class="social-post">
            <div class="post-header">
                <div class="post-avatar">
                    <img src="${postData.avatar}" alt="${postData.author} Avatar" />
                </div>
                <div class="post-info">
                    <div class="post-author">${postData.author}</div>
                    <div class="post-date">${postData.timeAgo}</div>
                </div>
            </div>
            <div class="post-content">
                ${postData.content}
            </div>
            <div class="post-actions">
                <div class="post-action"><i>❤️</i> ${postData.likes}</div>
                <div class="post-action"><i>💬</i> ${postData.comments}</div>
                <div class="post-action"><i>🔄</i> ${postData.shares}</div>
            </div>
        </div>
    `;
}

/**
 * Gets the top N teams by points
 * @param {Object} teams - Teams data object
 * @param {number} count - Number of teams to return
 * @returns {Array} Top teams
 */
function getTopTeams(teams, count) {
    const teamArray = Object.entries(teams).map(([name, data]) => ({
        name,
        points: data.points || 0,
        nrr: data.nrr || '0.000'
    }));
    
    // Sort by points, then by NRR
    teamArray.sort((a, b) => {
        if (a.points !== b.points) return b.points - a.points;
        return parseFloat(b.nrr) - parseFloat(a.nrr);
    });
    
    return teamArray.slice(0, count);
}

/**
 * Extracts a team name from a news item
 * @param {string} newsItem - The news text
 * @returns {string} The team name
 */
function extractTeamFromNews(newsItem) {
    const teamNames = [
        'Islamabad United', 'Lahore Qalandars', 'Karachi Kings',
        'Quetta Gladiators', 'Peshawar Zalmi', 'Multan Sultans'
    ];
    
    for (const team of teamNames) {
        if (newsItem.includes(team)) {
            return team;
        }
    }
    
    return 'PSL Official';
}

/**
 * Gets a logo filename for a team
 * @param {string} teamName - The team name
 * @returns {string} The logo filename
 */
function getTeamLogo(teamName) {
    return teamName.toLowerCase().replace(' ', '_') + '.png';
}

/**
 * Gets a random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random player statistic string
 * @returns {string} Random player stat
 */
function getRandomPlayerStat() {
    const players = [
        { name: "Mohammad Rizwan", team: "Multan Sultans", stat: "has scored 368 runs in 10 innings at an average of 58.25" },
        { name: "Babar Azam", team: "Peshawar Zalmi", stat: "leads the run charts with 386 runs at a strike rate of 156.32" },
        { name: "Shadab Khan", team: "Islamabad United", stat: "has taken 14 wickets while maintaining an economy of 7.26" },
        { name: "Shaheen Afridi", team: "Lahore Qalandars", stat: "has picked up 12 wickets in 8 matches" },
        { name: "Fakhar Zaman", team: "Lahore Qalandars", stat: "has hit the most sixes (24) in the tournament" },
        { name: "Hasan Ali", team: "Karachi Kings", stat: "has been impressive with 11 wickets" },
        { name: "Saud Shakeel", team: "Quetta Gladiators", stat: "has scored 275 runs at an average of 45.83" }
    ];
    
    const player = players[Math.floor(Math.random() * players.length)];
    return `${player.name} (${player.team}) ${player.stat}`;
}

/**
 * Updates the data status element with the latest update time
 */
function updateDataStatusElement() {
    const statusElement = document.getElementById('data-status');
    if (statusElement && window.pslDataFetcher && typeof window.pslDataFetcher.getLastFetchTime === 'function') {
        const lastFetch = window.pslDataFetcher.getLastFetchTime();
        if (lastFetch) {
            // Keep only the text part and add the refresh button back
            const refreshButton = statusElement.querySelector('button');
            statusElement.textContent = `Live data from Cricinfo - Last updated: ${lastFetch.toLocaleString()}`;
            if (refreshButton) {
                statusElement.appendChild(refreshButton);
            }
        }
    }
}

// Export the main integration function to the global scope
window.pslDataIntegration = {
    integrate: integrateDataIntoApp
};
