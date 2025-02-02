import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

const PlayerDetails: React.FC = () => {
  const { playerId } = useParams<{ playerId: string }>(); // Get player ID from the URL
  const [selectedTab, setSelectedTab] = useState(0);
  const [playerData, setPlayerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Fetch player data based on playerId
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "42045409-d194-4bab-b5bc-50cea9a824c1");
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders
        };
        

        const response = await fetch(
          `https://www.balldontlie.io/api/v1/players/${playerId}`,requestOptions
        );
        const data = await response.json();
        setPlayerData(data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchPlayerData();
    }
  }, [playerId]);

  return (
    <Box sx={{ paddingTop: "80px", paddingX: "20px" }}>
      {/* Player Header */}
      {loading ? (
        <CircularProgress />
      ) : playerData ? (
        <>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {playerData.first_name} {playerData.last_name}
          </h1>
          <p>
            Team: <strong>{playerData.team.full_name}</strong>
          </p>
          <p>
            Position: <strong>{playerData.position || "N/A"}</strong>
          </p>
        </>
      ) : (
        <p>Player not found.</p>
      )}

      {/* Tabs Navigation */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Overview" />
        <Tab label="Stats" />
        <Tab label="Games" />
        <Tab label="Splits" />
        <Tab label="Bio" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ marginTop: "20px" }}>
        {selectedTab === 0 && (
          <div>
            <h2>Overview</h2>
            <p>
              Information about {playerData?.first_name} {playerData?.last_name}.
            </p>
          </div>
        )}
        {selectedTab === 1 && (
          <div>
            <h2>Stats</h2>
            <p>Stats content will go here.</p>
          </div>
        )}
        {selectedTab === 2 && (
          <div>
            <h2>Games</h2>
            <p>Games content will go here.</p>
          </div>
        )}
        {selectedTab === 3 && (
          <div>
            <h2>Splits</h2>
            <p>Splits content will go here.</p>
          </div>
        )}
        {selectedTab === 4 && (
          <div>
            <h2>Bio</h2>
            <p>Bio content will go here.</p>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default PlayerDetails;