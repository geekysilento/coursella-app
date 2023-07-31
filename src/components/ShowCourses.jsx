import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";

function ShowCourses() {
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    async function getCourses() {
      const response = await fetch("http://localhost:3000/admin/courses", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
      }
    }
    getCourses();
  }, []);
  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  return (
    <div style={{display: "flex",  flexWrap: "wrap", backgroundColor: "whitesmoke", minHeight:"100vh"}}>
      {courses.map((course,i) => (
        <Course course={course} key={i} />
      ))}
    </div>
  );
}

function Course(props) {
  return (
    <Box sx={{ margin:"20px" }}>
      <Card style={{ minWidth: "40vh", minHeight: "40vh",maxWidth: "40vh", maxHeight: "40vh",}}>
        <CardContent>
          <Typography variant="h3">{props.course.title}</Typography>
          <Typography variant="h5">{props.course.description}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ShowCourses;
