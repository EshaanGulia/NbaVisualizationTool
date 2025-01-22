const BASE_URL = "https://www.balldontlie.io/v1";
const API_KEY = import.meta.env.VITE_API_KEY; // Dynamically load API key from .env

/**
 * Fetches a paginated list of players.
 */
export const fetchPlayers = async (page: number = 1, perPage: number = 10) => {
  const response = await fetch(`${BASE_URL}/players?page=${page}&per_page=${perPage}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`, // Use the API key
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

/**
 * Fetches a list of teams.
 */
export const fetchTeams = async () => {
  const response = await fetch(`${BASE_URL}/teams`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`, // Use the API key
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

/**
 * Fetches a paginated list of stats.
 */
export const fetchStats = async (page: number = 1, perPage: number = 10) => {
  const response = await fetch(`${BASE_URL}/stats?page=${page}&per_page=${perPage}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`, // Use the API key
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

/**
 * Fetches a paginated list of games.
 */
export const fetchGames = async (page: number = 1, perPage: number = 10) => {
  const response = await fetch(`${BASE_URL}/games?page=${page}&per_page=${perPage}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`, // Use the API key
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};