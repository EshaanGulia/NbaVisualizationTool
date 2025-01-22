import React from "react";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  // Do not render Navbar on the Home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav>
      {/* Your Navbar JSX Here */}
    </nav>
  );
};

export default Navbar;