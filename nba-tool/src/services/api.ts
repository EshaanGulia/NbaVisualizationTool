import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Your server's base URL

/**
 * Fetches all players from the server.
 */
export const fetchPlayers = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/allPlayers`, {
      params: { page, perPage },
    });
    return response.data;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Error fetching players:", errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Fetches all teams from the server.
 */
export const fetchTeams = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/allTeams`);
    console.log('Teams from server:', response.data);
    return response.data;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    console.error('Error fetching teams:', errorMessage);
    throw new Error(errorMessage);
  }
};