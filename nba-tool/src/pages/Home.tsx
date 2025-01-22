import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        textAlign: "center",
        backgroundColor: "#f8f9fa", // Light gray background
        margin: 0, // Remove any default margin
        padding: 0, // Remove any default padding
      }}
    >
      {/* Header */}
      <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Welcome to the NBA Visualization Tool
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "40px", color: "#555" }}>
        Explore NBA players, teams, games, stats, and more!
      </Typography>

      {/* Navigation Buttons */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/players"
            sx={{ textTransform: "none", fontWeight: "bold", padding: "10px 20px" }}
          >
            Explore Players
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/teams"
            sx={{ textTransform: "none", fontWeight: "bold", padding: "10px 20px" }}
          >
            Explore Teams
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/games"
            sx={{ textTransform: "none", fontWeight: "bold", padding: "10px 20px" }}
          >
            View Games
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/stats"
            sx={{ textTransform: "none", fontWeight: "bold", padding: "10px 20px" }}
          >
            View Stats
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;