/**
 * Default PSL 2025 data to use as fallback when live data fetching fails
 * This is based on the data as of May 3, 2025
 */

const DEFAULT_PSL_DATA = {
    teams: {
        "Islamabad United": {
            matches: 8,
            wins: 6,
            losses: 2,
            points: 12,
            nrr: "+1.285",
            form: "WWWWWLLW",
            recentMatches: [
                { opponent: "Peshawar Zalmi", result: "Lost by 6 wickets", date: "2025-05-02" },
                { opponent: "Lahore Qalandars", result: "Lost by 88 runs", date: "2025-04-30" },
                { opponent: "Lahore Qalandars", result: "Lost by 5 wickets", date: "2025-04-26" },
                { opponent: "Multan Sultans", result: "Won by 7 wickets", date: "2025-04-23" },
                { opponent: "Karachi Kings", result: "Won by 6 wickets", date: "2025-04-20" }
            ]
        },
        "Lahore Qalandars": {
            matches: 8,
            wins: 5,
            losses: 2,
            points: 11,
            nrr: "+0.635",
            form: "WLWWWLW",
            recentMatches: [
                { opponent: "Quetta Gladiators", result: "No result (Rain)", date: "2025-05-01" },
                { opponent: "Islamabad United", result: "Won by 88 runs", date: "2025-04-30" },
                { opponent: "Islamabad United", result: "Won by 5 wickets", date: "2025-04-26" },
                { opponent: "Peshawar Zalmi", result: "Lost by 7 wickets", date: "2025-04-24" },
                { opponent: "Multan Sultans", result: "Lost by 33 runs", date: "2025-04-22" }
            ]
        },
        "Karachi Kings": {
            matches: 8,
            wins: 4,
            losses: 4,
            points: 8,
            nrr: "-0.148",
            form: "WLWLWWLW",
            recentMatches: [
                { opponent: "Multan Sultans", result: "Won by 87 runs", date: "2025-05-01" },
                { opponent: "Quetta Gladiators", result: "Lost by 5 runs", date: "2025-04-25" },
                { opponent: "Peshawar Zalmi", result: "Won by 2 wickets", date: "2025-04-21" },
                { opponent: "Islamabad United", result: "Lost by 6 wickets", date: "2025-04-20" },
                { opponent: "Quetta Gladiators", result: "Won by 56 runs", date: "2025-04-18" }
            ]
        },
        "Quetta Gladiators": {
            matches: 8,
            wins: 4,
            losses: 3,
            points: 9,
            nrr: "+0.245",
            form: "LWLWWWW",
            recentMatches: [
                { opponent: "Lahore Qalandars", result: "No result (Rain)", date: "2025-05-01" },
                { opponent: "Multan Sultans", result: "Won by 10 wickets", date: "2025-04-29" },
                { opponent: "Peshawar Zalmi", result: "Won by 64 runs", date: "2025-04-27" },
                { opponent: "Karachi Kings", result: "Won by 5 runs", date: "2025-04-25" },
                { opponent: "Karachi Kings", result: "Lost by 56 runs", date: "2025-04-18" }
            ]
        },
        "Peshawar Zalmi": {
            matches: 8,
            wins: 3,
            losses: 5,
            points: 6,
            nrr: "-0.622",
            form: "WLLWLLW",
            recentMatches: [
                { opponent: "Islamabad United", result: "Won by 6 wickets", date: "2025-05-02" },
                { opponent: "Lahore Qalandars", result: "Won by 7 wickets", date: "2025-04-24" },
                { opponent: "Quetta Gladiators", result: "Lost by 64 runs", date: "2025-04-27" },
                { opponent: "Karachi Kings", result: "Lost by 2 wickets", date: "2025-04-21" },
                { opponent: "Multan Sultans", result: "Won by 120 runs", date: "2025-04-19" }
            ]
        },
        "Multan Sultans": {
            matches: 8,
            wins: 1,
            losses: 7,
            points: 2,
            nrr: "-1.387",
            form: "LLLLWLLL",
            recentMatches: [
                { opponent: "Karachi Kings", result: "Lost by 87 runs", date: "2025-05-01" },
                { opponent: "Quetta Gladiators", result: "Lost by 10 wickets", date: "2025-04-29" },
                { opponent: "Islamabad United", result: "Lost by 7 wickets", date: "2025-04-23" },
                { opponent: "Lahore Qalandars", result: "Won by 33 runs", date: "2025-04-22" },
                { opponent: "Peshawar Zalmi", result: "Lost by 120 runs", date: "2025-04-19" }
            ]
        }
    },
    headToHead: {
        "Multan Sultans-Peshawar Zalmi": {
            total: 1,
            matches: [
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
            total: 1,
            matches: [
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
            total: 1,
            matches: [
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
            total: 0,
            matches: []
        }
    },
    venues: {
        "Lahore": {
            matches: 11,
            avgFirstInnings: 185,
            avgSecondInnings: 162,
            tossDecision: "72% elected to field first",
            winningToss: "59% matches won by team winning toss"
        },
        "Karachi": {
            matches: 5,
            avgFirstInnings: 198,
            avgSecondInnings: 184,
            tossDecision: "80% elected to field first",
            winningToss: "60% matches won by team winning toss"
        },
        "Multan": {
            matches: 4,
            avgFirstInnings: 168,
            avgSecondInnings: 152,
            tossDecision: "64% elected to field first",
            winningToss: "52% matches won by team winning toss"
        },
        "Rawalpindi": {
            matches: 4,
            avgFirstInnings: 198,
            avgSecondInnings: 178,
            tossDecision: "75% elected to field first",
            winningToss: "50% matches won by team winning toss"
        }
    },
    matches: {
        "Match24": {
            team1: "Lahore Qalandars",
            team2: "Karachi Kings",
            date: "2025-05-04",
            time: "7:00 PM",
            venue: "Lahore"
        },
        "Match25": {
            team1: "Multan Sultans",
            team2: "Peshawar Zalmi",
            date: "2025-05-05",
            time: "7:00 PM",
            venue: "Multan"
        },
        "Match26": {
            team1: "Islamabad United",
            team2: "Quetta Gladiators",
            date: "2025-05-07",
            time: "7:00 PM",
            venue: "Rawalpindi"
        },
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
        "Qualifier 1": {
            team1: "TBA",
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
    },
    newsItems: [
        "BREAKING: Zalmi keep playoff hopes alive after crushing Sultans by 7 Wicket in one sided contest",
        "Karachi Kings beat Lahore Qalandars by 4 wickets, Irfan the hero as Kings ace tense 15-over chase",
        "Quetta Gladiators beat Islamabad United by 2 wickets in a thrilling last-over finish",
        "Peshawar Zalmi defeat Islamabad United by 6 wickets to keep playoff hopes alive",
        "PSL confirms final to be held at Gaddafi Stadium on May 18 as scheduled",
        "PSL X trophy 'Luminara' unveiled, adorned with over 22,000 zircon stones",
        "Babar Azam reaches 2000 runs in PSL history, becomes fastest to milestone",
        "Shadab Khan takes 100th PSL wicket, third bowler to achieve feat"
    ],
    lastUpdated: "2025-05-03T18:30:00.000Z"
};

// Export to global scope to make it available for the integration scripts
window.DEFAULT_PSL_DATA = DEFAULT_PSL_DATA;
