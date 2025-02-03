import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1c1c1c, #3a3a3a)", // Black to light grey
        color: "#fff",
        overflow: "hidden", // Prevents scrolling
      }}
    >
      {/* Animated Title */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: [0, -20, 0] }} // Bouncing animation
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Welcome to the NBA Visualization Tool
        </Typography>
      </motion.div>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/players")}
          sx={{
            background: "#fff",
            color: "#000",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": { background: "#e0e0e0" },
          }}
        >
          Explore Players
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/teams")}
          sx={{
            background: "#fff",
            color: "#000",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": { background: "#e0e0e0" },
          }}
        >
          Explore Teams
        </Button>
      </Box>
    </Box>
  );
};

export default Home;