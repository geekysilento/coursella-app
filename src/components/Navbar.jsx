import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate=useNavigate();
  const logoStyle = {
    fontSize: 30,
    cursor: 'pointer', 
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row", 
        justifyContent: "space-between",
      }}
    >
      <Typography style={logoStyle} onClick={() => navigate('/')}>CourSella</Typography>
      <div>
        <Button variant="contained" onClick={() => navigate('/register')}>Signup</Button>
        <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
      </div>
    </div>
  );
}

export default Navbar;
