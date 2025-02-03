import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CircularProgress,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { fetchTeams } from '../services/api';

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTeams(); // Fetch teams via API
        setTeams(data.data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error loading teams:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <Box sx={{ paddingTop: '80px', paddingX: '20px' }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        sx={{ marginBottom: '20px' }}
      >
        Back to Home
      </Button>

      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Explore NBA Teams
      </Typography>

      {/* Loading */}
      {loading && <CircularProgress />}

      {/* Error */}
      {error && (
        <Typography variant="h6" color="error" sx={{ marginBottom: '20px' }}>
          {error}
        </Typography>
      )}

      {/* Display Teams */}
      {!loading && !error && teams.length > 0 && (
        <Grid container spacing={3}>
          {teams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.id}>
              <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '10px' }}>
                <CardContent>
                  <Typography variant="h6">{team.full_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Abbreviation: {team.abbreviation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    City: {team.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Conference: {team.conference}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Division: {team.division}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Teams;