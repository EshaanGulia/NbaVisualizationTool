import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Correct base URL
const API_KEY = import.meta.env.VITE_API_KEY; // Load API key from .env

/**
 * Fetches a paginated list of players using Axios.
 */
export const fetchPlayers = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/allPlayers`, {
      params: {
        page,
        per_page: perPage,
      },
      headers: {
        'Authorization': '42045409-d194-4bab-b5bc-50cea9a824c1'
      },
    });

    return response.data; // Return API response data
  } catch (error) {
    console.error("Error fetching players:", error);
    throw new Error("Failed to fetch players.");
  }
};