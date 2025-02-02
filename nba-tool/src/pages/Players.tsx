import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  CircularProgress,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { fetchPlayers } from "../services/api";

const Players: React.FC = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPlayers(page, 10);
        if (searchTerm) {
          const filteredPlayers = data.data.filter((player: any) =>
            `${player.first_name} ${player.last_name}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
          setPlayers(filteredPlayers);
        } else {
          setPlayers(data.data);
        }
      } catch (err) {
        setError("Failed to load players.");
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [page, searchTerm]);

  return (
    <Box sx={{ paddingTop: "80px", paddingX: "20px" }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate("/")} // Navigate to the home page
        sx={{ marginBottom: "20px" }}
      >
        Back to Home
      </Button>

      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Explore Players
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Players"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "20px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter player name..."
      />

      {/* Show Loading Spinner */}
      {loading && <CircularProgress />}

      {/* Show Error Message */}
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* No Players Message */}
      {!loading && !error && players.length === 0 && (
        <Typography variant="h6" color="text.secondary">
          No players found. Try a different search.
        </Typography>
      )}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="outlined"
          disabled={page === 1}
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