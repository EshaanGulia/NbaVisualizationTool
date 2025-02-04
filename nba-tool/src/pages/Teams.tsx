import { Link } from "react-router-dom";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { fetchTeams } from "../services/api";
import { useState, useEffect } from "react";

const Teams = () => {
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTeams = async () => {
            try {
                const data = await fetchTeams();
                if (!data || !data.data) throw new Error("No team data found.");
                setTeams(data.data);
            } catch (err) {
                console.error("Error fetching teams:", err);
            } finally {
                setLoading(false);
            }
        };

        loadTeams();
    }, []);

    if (loading) return <p>Loading teams...</p>;

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
                NBA Teams
            </Typography>

            <Grid container spacing={3}>
                {teams.map((team) => (
                    <Grid item xs={12} sm={6} md={4} key={team.id}>
                        <Card
                            component={Link}
                            to={`/teams/${team.id}`} // 🔥 Navigates to team details
                            sx={{
                                textDecoration: "none",
                                cursor: "pointer",
                                transition: "transform 0.2s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6">{team.full_name}</Typography>
                                <Typography variant="body2">City: {team.city}</Typography>
                                <Typography variant="body2">Conference: {team.conference}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Teams;