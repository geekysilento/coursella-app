import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const [username, setUsername] = React.useState("");
  const nav = useNavigate()

  const SendLogin = async (event) => {
    event.preventDefault();

    
    // const response = await fetch("http://localhost:3000/admin/login", {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify({
    //     username,
    //   }),
    // });

    const response = await axios.post("http://localhost:3000/admin/login", {
      username
    })
    
    if (response.status == 200) {
        const data = await response.data;
        localStorage.setItem("token", data.token);
        nav('/courses')
      } else if (response.status == 403) {
        alert("You are not a member");
      } else {
        console.log(response.statusText);
      }
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
  };
  const cardStyle = {
    padding: "30px",
  };
  return (
    <div style={containerStyle}>
      <Card variant="outlined" style={cardStyle}>
        <h1 style={{ alignItems: "center" }}>Login</h1>

        <form style={formStyle}>
          <TextField
            label="Enter username"
            variant="outlined"
            onChange={e => setUsername(e.target.value)}
          />

          <Button variant="contained" onClick={SendLogin}>
            Login
          </Button>
        </form>

        <p>
          New here? <a href="/register">Register</a>
        </p>
      </Card>
    </div>
  );
}

export default Login;
