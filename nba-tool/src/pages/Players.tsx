import { Link } from "react-router-dom";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { fetchPlayers } from "../services/api";
import { useState, useEffect } from "react";

const Players = () => {
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPlayers = async () => {
            try {
                const data = await fetchPlayers();
                if (!data || !data.data) throw new Error("No player data found.");
                setPlayers(data.data);
            } catch (err) {
                console.error("Error fetching players:", err);
            } finally {
                setLoading(false);
            }
        };

        loadPlayers();
    }, []);

    if (loading) return <p>Loading players...</p>;

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
                NBA Players
            </Typography>

            <Grid container spacing={3}>
                {players.map((player) => (
                    <Grid item xs={12} sm={6} md={4} key={player.id}>
                        <Card
                            component={Link}
                            to={`/players/${player.id}`} // 🔥 Navigates to player details
                            sx={{
                                textDecoration: "none",
                                cursor: "pointer",
                                transition: "transform 0.2s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6">{player.first_name} {player.last_name}</Typography>
                                <Typography variant="body2">Team: {player.team?.full_name || "Unknown"}</Typography>
                                <Typography variant="body2">Position: {player.position || "N/A"}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Players;