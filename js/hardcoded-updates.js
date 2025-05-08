/**
 * Hardcoded PSL 2025 Updates
 * 
 * This file contains the latest hardcoded PSL 2025 data as of May 8, 2025
 * from the official PSL website (psl-t20.com/points-table/).
 * 
 * It ensures we have accurate data even if dynamic scraping fails.
 */

// Latest points table data as of May 8, 2025
const CURRENT_POINTS_TABLE = {
    "Quetta Gladiators": {
        matches: 9,
        wins: 6,
        losses: 2,
        noResults: 1,
        points: 13,
        nrr: "+1.530",
        form: "WWWLW",
        recentMatches: [
            { opponent: "Multan Sultans", result: "Won by 10 wickets", date: "2025-05-07" },
            { opponent: "Islamabad United", result: "Won by 2 wickets", date: "2025-05-05" },
            { opponent: "Lahore Qalandars", result: "No result (Rain)", date: "2025-05-01" },
            { opponent: "Peshawar Zalmi", result: "Won by 64 runs", date: "2025-04-27" },
            { opponent: "Karachi Kings", result: "Won by 5 runs", date: "2025-04-25" }
        ]
    },
    "Karachi Kings": {
        matches: 8,
        wins: 5,
        losses: 3,
        noResults: 0,
        points: 10,
        nrr: "+0.433",
        form: "WLWLW",
        recentMatches: [
            { opponent: "Lahore Qalandars", result: "Won by 4 wickets", date: "2025-05-04" },
            { opponent: "Multan Sultans", result: "Won by 87 runs", date: "2025-05-01" },
            { opponent: "Quetta Gladiators", result: "Lost by 5 runs", date: "2025-04-25" },
            { opponent: "Peshawar Zalmi", result: "Won by 2 wickets", date: "2025-04-21" },
            { opponent: "Islamabad United", result: "Lost by 6 wickets", date: "2025-04-20" }
        ]
    },
    "Islamabad United": {
        matches: 9,
        wins: 5,
        losses: 4,
        noResults: 0,
        points: 10,
        nrr: "-0.044",
        form: "LWLLW",
        recentMatches: [
            { opponent: "Quetta Gladiators", result: "Lost by 2 wickets", date: "2025-05-05" },
            { opponent: "Peshawar Zalmi", result: "Lost by 6 wickets", date: "2025-05-02" },
            { opponent: "Lahore Qalandars", result: "Lost by 88 runs", date: "2025-04-30" },
            { opponent: "Lahore Qalandars", result: "Lost by 5 wickets", date: "2025-04-26" },
            { opponent: "Multan Sultans", result: "Won by 7 wickets", date: "2025-04-23" }
        ]
    },
    "Lahore Qalandars": {
        matches: 9,
        wins: 4,
        losses: 4,
        noResults: 1,
        points: 9,
        nrr: "+0.958",
        form: "LWNWW",
        recentMatches: [
            { opponent: "Karachi Kings", result: "Lost by 4 wickets", date: "2025-05-04" },
            { opponent: "Quetta Gladiators", result: "No result (Rain)", date: "2025-05-01" },
            { opponent: "Islamabad United", result: "Won by 88 runs", date: "2025-04-30" },
            { opponent: "Islamabad United", result: "Won by 5 wickets", date: "2025-04-26" },
            { opponent: "Peshawar Zalmi", result: "Lost by 7 wickets", date: "2025-04-24" }
        ]
    },
    "Peshawar Zalmi": {
        matches: 8,
        wins: 4,
        losses: 4,
        noResults: 0,
        points: 8,
        nrr: "-0.082",
        form: "WWLLW",
        recentMatches: [
            { opponent: "Multan Sultans", result: "Won by 7 wickets", date: "2025-05-05" },
            { opponent: "Islamabad United", result: "Won by 6 wickets", date: "2025-05-02" },
            { opponent: "Quetta Gladiators", result: "Lost by 64 runs", date: "2025-04-27" },
            { opponent: "Lahore Qalandars", result: "Won by 7 wickets", date: "2025-04-24" },
            { opponent: "Karachi Kings", result: "Lost by 2 wickets", date: "2025-04-21" }
        ]
    },
    "Multan Sultans": {
        matches: 9,
        wins: 1,
        losses: 8,
        noResults: 0,
        points: 2,
        nrr: "-2.708",
        form: "LLLLL",
        recentMatches: [
            { opponent: "Quetta Gladiators", result: "Lost by 10 wickets", date: "2025-05-07" },
            { opponent: "Peshawar Zalmi", result: "Lost by 7 wickets", date: "2025-05-05" },
            { opponent: "Karachi Kings", result: "Lost by 87 runs", date: "2025-05-01" },
            { opponent: "Islamabad United", result: "Lost by 7 wickets", date: "2025-04-23" },
            { opponent: "Lahore Qalandars", result: "Won by 33 runs", date: "2025-04-22" }
        ]
    }
};

// Latest head-to-head data (updated with recent matches)
const CURRENT_HEAD_TO_HEAD = {
    "Multan Sultans-Peshawar Zalmi": {
        total: 2,
        matches: [
            { date: "2025-05-05", result: "Peshawar Zalmi won by 7 wickets", scores: "MS: 108 all out, PZ: 109/3" },
            { date: "2025-04-19", result: "Peshawar Zalmi won by 120 runs", scores: "PZ: 227/7, MS: 107 all out" }
        ]
    },
    "Islamabad United-Lahore Qalandars": {
        total: 3,
        matches: [
            { date: "2025-04-30", result: "Lahore Qalandars won by 88 runs", scores: "LQ: 202/6, IU: 114 all out" },
            { date: "2025-04-26", result: "Lahore Qalandars won by 5 wickets", scores: "IU: 185/6, LQ: 186/5" },
            { date: "2025-04-11", result: "Islamabad United won by 8 wickets", scores: "LQ: 139/10, IU: 143/2" }
        ]
    },
    "Karachi Kings-Multan Sultans": {
        total: 2,
        matches: [
            { date: "2025-05-01", result: "Karachi Kings won by 87 runs", scores: "KK: 201/5, MS: 114 all out" },
            { date: "2025-04-12", result: "Karachi Kings won by 4 wickets", scores: "MS: 234/3, KK: 236/6" }
        ]
    },
    "Peshawar Zalmi-Quetta Gladiators": {
        total: 2,
        matches: [
            { date: "2025-04-27", result: "Quetta Gladiators won by 64 runs", scores: "QG: 182/5, PZ: 118 all out" },
            { date: "2025-04-12", result: "Quetta Gladiators won by 80 runs", scores: "QG: 216/3, PZ: 136 all out" }
        ]
    },
    "Karachi Kings-Lahore Qalandars": {
        total: 2,
        matches: [
            { date: "2025-05-04", result: "Karachi Kings won by 4 wickets", scores: "LQ: 148 all out, KK: 149/6" },
            { date: "2025-04-15", result: "Lahore Qalandars won by 65 runs", scores: "LQ: 226/4, KK: 161 all out" }
        ]
    },
    "Islamabad United-Multan Sultans": {
        total: 2,
        matches: [
            { date: "2025-04-23", result: "Islamabad United won by 7 wickets", scores: "MS: 148/8, IU: 149/3" },
            { date: "2025-04-16", result: "Islamabad United won by 47 runs", scores: "IU: 184/5, MS: 137 all out" }
        ]
    },
    "Karachi Kings-Quetta Gladiators": {
        total: 2,
        matches: [
            { date: "2025-04-25", result: "Quetta Gladiators won by 5 runs", scores: "QG: 170/7, KK: 165/8" },
            { date: "2025-04-18", result: "Karachi Kings won by 56 runs", scores: "KK: 205/6, QG: 149 all out" }
        ]
    },
    "Lahore Qalandars-Peshawar Zalmi": {
        total: 1,
        matches: [
            { date: "2025-04-24", result: "Peshawar Zalmi won by 7 wickets", scores: "LQ: 172/6, PZ: 173/3" }
        ]
    },
    "Islamabad United-Karachi Kings": {
        total: 1,
        matches: [
            { date: "2025-04-20", result: "Islamabad United won by 6 wickets", scores: "KK: 165/7, IU: 166/4" }
        ]
    },
    "Karachi Kings-Peshawar Zalmi": {
        total: 1,
        matches: [
            { date: "2025-04-21", result: "Karachi Kings won by 2 wickets", scores: "PZ: 178/6, KK: 179/8" }
        ]
    },
    "Lahore Qalandars-Multan Sultans": {
        total: 1,
        matches: [
            { date: "2025-04-22", result: "Multan Sultans won by 33 runs", scores: "MS: 195/5, LQ: 162 all out" }
        ]
    },
    "Islamabad United-Peshawar Zalmi": {
        total: 2,
        matches: [
            { date: "2025-05-02", result: "Peshawar Zalmi won by 6 wickets", scores: "IU: 163/7, PZ: 164/4" },
            { date: "2025-04-14", result: "Islamabad United won by 102 runs", scores: "IU: 254/4, PZ: 152 all out" }
        ]
    },
    "Multan Sultans-Quetta Gladiators": {
        total: 2,
        matches: [
            { date: "2025-05-07", result: "Quetta Gladiators won by 10 wickets", scores: "MS: 98 all out, QG: 99/0" },
            { date: "2025-04-29", result: "Quetta Gladiators won by 10 wickets", scores: "MS: 89 all out, QG: 90/0" }
        ]
    },
    "Lahore Qalandars-Quetta Gladiators": {
        total: 2,
        matches: [
            { date: "2025-05-01", result: "No result (Rain)", scores: "Match abandoned" },
            { date: "2025-04-13", result: "Lahore Qalandars won by 79 runs", scores: "LQ: 242/5, QG: 163 all out" }
        ]
    },
    "Islamabad United-Quetta Gladiators": {
        total: 1,
        matches: [
            { date: "2025-05-05", result: "Quetta Gladiators won by 2 wickets", scores: "IU: 165/8, QG: 166/8" }
        ]
    }
};

// Updated upcoming matches
const CURRENT_MATCHES = {
    "Match27": {
        team1: "Karachi Kings",
        team2: "Peshawar Zalmi",
        date: "2025-05-08",
        time: "7:00 PM",
        venue: "Rawalpindi"
    },
    "Match28": {
        team1: "Lahore Qalandars",
        team2: "Peshawar Zalmi",
        date: "2025-05-09",
        time: "7:00 PM",
        venue: "Rawalpindi"
    },
    "Match29": {
        team1: "Islamabad United",
        team2: "Karachi Kings",
        date: "2025-05-10",
        time: "7:00 PM",
        venue: "Rawalpindi"
    },
    "Match30": {
        team1: "Multan Sultans",
        team2: "Quetta Gladiators",
        date: "2025-05-11",
        time: "7:00 PM",
        venue: "Multan"
    },
    // Playoff matches
    "Qualifier 1": {
        team1: "Quetta Gladiators",
        team2: "TBA",
        date: "2025-05-13",
        time: "7:00 PM",
        venue: "Rawalpindi"
    },
    "Eliminator": {
        team1: "TBA",
        team2: "TBA",
        date: "2025-05-14",
        time: "7:00 PM",
        venue: "Lahore"
    },
    "Qualifier 2": {
        team1: "TBA",
        team2: "TBA",
        date: "2025-05-16",
        time: "7:00 PM",
        venue: "Lahore"
    },
    "Final": {
        team1: "TBA",
        team2: "TBA",
        date: "2025-05-18",
        time: "7:00 PM",
        venue: "Lahore"
    }
};

// Latest news items
const CURRENT_NEWS_ITEMS = [
    "Quetta Gladiators beat Multan Sultans by 10 wickets to secure top spot in the PSL points table", 
    "Peshawar Zalmi beat Multan Sultans by 7 wickets to boost playoff chances",
    "Quetta Gladiators beat Islamabad United by 2 wickets in a thrilling last-over finish", 
    "Karachi Kings beat Lahore Qalandars by 4 wickets, Irfan the hero as Kings ace the chase",
    "Quetta Gladiators secure spot in Qualifier 1 with 13 points from 9 matches",
    "Zalmi face Kings in crucial match today with playoff implications for both teams",
    "PSL confirms final to be held at Gaddafi Stadium on May 18 as scheduled"
];

/**
 * Applies the hardcoded updates to the PSL data
 * @param {Object} existingData - The existing PSL data
 * @returns {Object} The updated PSL data
 */
function applyHardcodedUpdates(existingData) {
    try {
        // Clone the existing data
        const updatedData = JSON.parse(JSON.stringify(existingData));
        
        // Update teams data
        for (const [teamName, teamData] of Object.entries(CURRENT_POINTS_TABLE)) {
            if (updatedData.teams[teamName]) {
                // Update each property
                updatedData.teams[teamName].matches = teamData.matches;
                updatedData.teams[teamName].wins = teamData.wins;
                updatedData.teams[teamName].losses = teamData.losses;
                updatedData.teams[teamName].noResults = teamData.noResults || 0;
                updatedData.teams[teamName].points = teamData.points;
                updatedData.teams[teamName].nrr = teamData.nrr;
                updatedData.teams[teamName].form = teamData.form;
                updatedData.teams[teamName].recentMatches = teamData.recentMatches;
            }
        }
        
        // Update head-to-head data
        for (const [key, data] of Object.entries(CURRENT_HEAD_TO_HEAD)) {
            updatedData.headToHead[key] = data;
        }
        
        // Update matches
        for (const [key, data] of Object.entries(CURRENT_MATCHES)) {
            updatedData.matches[key] = data;
        }
        
        // Update news items
        updatedData.newsItems = CURRENT_NEWS_ITEMS;
        
        // Update timestamp
        updatedData.lastUpdated = new Date().toISOString();
        
        console.log("Applied hardcoded updates to PSL data (latest as of May 8, 2025)");
        return updatedData;
    } catch (error) {
        console.error("Error applying hardcoded updates:", error);
        return existingData;
    }
}

// Export to global scope
window.hardcodedUpdates = {
    applyUpdates: applyHardcodedUpdates,
    pointsTable: CURRENT_POINTS_TABLE,
    headToHead: CURRENT_HEAD_TO_HEAD,
    matches: CURRENT_MATCHES,
    newsItems: CURRENT_NEWS_ITEMS
};
