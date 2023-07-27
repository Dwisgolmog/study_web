import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Header from './components/Head';
import Article from './components/Article';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';

function App() {
  return (
    <Container fixed className="App">
      <Header></Header>
      <Grid container>
        <Grid item xs="2">
          <NavBar></NavBar>
        </Grid>  
        <Grid item xs="10">
          <Article></Article>
        </Grid>   
      </Grid>
    </Container>
  );
}

export default App;
