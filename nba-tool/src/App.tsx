import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Teams from "./pages/Teams";

// Define a modern theme
const theme = createTheme({
  palette: {
    primary: { main: "#1976D2" }, // Blue
    secondary: { main: "#FF6D00" }, // Orange
    background: { default: "#F4F6F8" }, // Light gray
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h4: { fontWeight: "bold" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;