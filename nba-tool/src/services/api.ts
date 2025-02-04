import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Fetch all players
export const fetchPlayers = async (page: number = 1, perPage: number = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/allPlayers`, {
            params: { page, perPage },
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching players:", err);
        throw new Error("Failed to fetch players.");
    }
};

// Fetch a specific player
export const fetchPlayerById = async (id: string | undefined) => {
    try {
        const response = await axios.get(`${BASE_URL}/players/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching player:", err);
        throw new Error("Failed to fetch player.");
    }
};

// Fetch all teams
export const fetchTeams = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/allTeams`);
        return response.data;
    } catch (err) {
        console.error("Error fetching teams:", err);
        throw new Error("Failed to fetch teams.");
    }
};

// Fetch a specific team
export const fetchTeamById = async (id: string | undefined) => {
    try {
        const response = await axios.get(`${BASE_URL}/teams/${id}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching team:", err);
        throw new Error("Failed to fetch team.");
    }
};