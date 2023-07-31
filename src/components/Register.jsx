import React from "react";
import Button from "@mui/material/Button";
import { ButtonBase, Card, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const nav = useNavigate();
  const sendRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      alert("Registered Successfully");
      nav('/courses')
    } else if (response.statusText == "Forbidden") {
      alert("You are already registered!");
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
    <>
      <div style={containerStyle}>
        <Card variant="outlined" style={cardStyle}>
          <h1 style={{ alignItems: "center" }}>Register</h1>

          <form style={formStyle}>
            <TextField
              label="Enter username"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Enter password"
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={sendRegister}>
              Register
            </Button>
            
          </form>

          <p>
            Already a member? <a href="/login">Login</a>
          </p>
        </Card>
      </div>
    </>
  );
}

export default Register;
