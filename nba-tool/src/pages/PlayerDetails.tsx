import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { fetchPlayerById } from "../services/api";

const PlayerDetails = () => {
    const { id } = useParams(); // Get ID from URL
    const [player, setPlayer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPlayer = async () => {
            try {
                if (!id) throw new Error("Invalid player ID");
                const data = await fetchPlayerById(id);
                setPlayer(data);
            } catch (err) {
                setError("Failed to load player details.");
                console.error("Error fetching player:", err);
            } finally {
                setLoading(false);
            }
        };

        loadPlayer();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4">{player.first_name} {player.last_name}</Typography>
            <Typography variant="body1">Team: {player.team?.full_name || "Unknown"}</Typography>
            <Typography variant="body1">Position: {player.position || "N/A"}</Typography>
        </Box>
    );
};

export default PlayerDetails;