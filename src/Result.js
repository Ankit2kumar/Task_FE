import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom'
function Result () {
  const location = useLocation();
  const { score } = location.state || { score: 0 }; 

  return (
    <Container maxWidth="sm" sx={{
      display: 'flex',
      mt:'5rem',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      minWeight:'80vh',
      bgcolor: "#b77722c2", 
      color:"#ffff" 
    }}>
  <div>
    <h1>Your Score is : {score}</h1>
    <Link to="/">
      <Button variant="contained"  sx={{
        mt:"4rem"
      }}>Restart Game</Button>
    </Link>
  </div></Container>
  );
}

export default Result;