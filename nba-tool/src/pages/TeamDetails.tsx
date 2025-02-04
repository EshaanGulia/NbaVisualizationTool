import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { fetchTeamById } from "../services/api";

const TeamDetails = () => {
    const { id } = useParams(); // Get ID from URL
    const [team, setTeam] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTeam = async () => {
            try {
                if (!id) throw new Error("Invalid team ID");
                const data = await fetchTeamById(id);
                setTeam(data);
            } catch (err) {
                setError("Failed to load team details.");
                console.error("Error fetching team:", err);
            } finally {
                setLoading(false);
            }
        };

        loadTeam();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4">{team.full_name}</Typography>
            <Typography variant="body1">City: {team.city}</Typography>
            <Typography variant="body1">Conference: {team.conference}</Typography>
            <Typography variant="body1">Division: {team.division}</Typography>
        </Box>
    );
};

export default TeamDetails;