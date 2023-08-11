import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

function Home() {
  return (
    <div sx={{  bgcolor: "#F52BC0"}}>
      
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          mt: "5rem",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          bgcolor: "#b77722c2", 
          color:"#ffff"
        }}
      >
        <div>
          <h1>Who Wants to Be a Millionaire</h1>
          <Link to="/game">
            <Button  variant="contained" sx={{mt:'4rem'}} >Start Game</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Home;
