import React, { useState, useEffect } from "react";
import { CircularProgress, Box, Grid, Card, CardContent, Typography, Button, TextField } from "@mui/material";
import { fetchPlayers } from "../services/api"; // Import the API function
import { Link } from "react-router-dom";

const Players: React.FC = () => {
  const [players, setPlayers] = useState<any[]>([]); // State to store players
  const [loading, setLoading] = useState(true); // Loading state
  const [page, setPage] = useState(1); // Current page for pagination
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const data = await fetchPlayers(page); // Fetch players for the current page
        if (searchTerm) {
          // Filter players by search term
          const filteredPlayers = data.data.filter((player: any) =>
            `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setPlayers(filteredPlayers);
        } else {
          setPlayers(data.data);
        }
      } catch (err) {
        console.error("Error fetching players:", err);
        setError("Failed to load players. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [page, searchTerm]);

  return (
    <Box sx={{ paddingTop: "80px", paddingX: "20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Explore Players
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search Players"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "20px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter player name..."
      />

      {/* Show loading spinner */}
      {loading && <CircularProgress />}

      {/* Show error message if any */}
      {error && (
        <Typography variant="h6" color="error" sx={{ marginBottom: "20px" }}>
          {error}
        </Typography>
      )}

      {/* Display Players */}
      {!loading && !error && players.length > 0 && (
        <Grid container spacing={3}>
          {players.map((player) => (
            <Grid item xs={12} sm={6} md={4} key={player.id}>
              <Card sx={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <CardContent>
                  <Typography variant="h6">
                    {player.first_name} {player.last_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Team: {player.team?.full_name || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Position: {player.position || "N/A"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "10px" }}
                    component={Link}
                    to={`/players/${player.id}`} // Link to player details
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Show no players message */}
      {!loading && !error && players.length === 0 && (
        <Typography variant="h6" color="text.secondary">
          No players found. Try a different search.
        </Typography>
      )}

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="outlined"
          disabled={page === 1} // Disable previous button on the first page
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          sx={{ marginRight: "10px" }}
        >
          Previous
        </Button>
        <Button variant="outlined" onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Players;