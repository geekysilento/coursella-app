import { Button, Card, TextField } from "@mui/material";
import React from "react";

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const sendCourse = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      headers: { "Content-type": "application/json", "Authorization": "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    if(response.ok){
        alert("added course successfully!")
        const data = await response.json()
        console.log(data)
    }
    else{
        alert("error adding course!")
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
        <h1 style={{ alignItems: "center" }}>Add Course</h1>

        <form style={formStyle}>
          <TextField
            label="Enter title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Enter description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button variant="contained" onClick={sendCourse}>Add Course</Button>
        </form>

        <p>
          Click <a href="/showcourses">here</a> to show all courses 
        </p>
      </Card>
    </div>
  );
}
export default CreateCourse;
