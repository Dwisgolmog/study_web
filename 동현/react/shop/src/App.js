import React from 'react';
import NavBar from './components/NavBar';
import { Container } from '@mui/system';
import bg from './img/bg.png';
import { Grid } from '@mui/material';

function App() {
  return (
    <>
    <NavBar></NavBar>
    <Container fixed className="App">
      <div className='main-bg' style={{backgroundImage : `url(${bg})`}}></div>

      <Container >
        <Grid container className='item'>
          <Grid item xs={4} sm={4} md={4}>
            <img src='https://codingapple1.github.io/shop/shoes1.jpg' />
            <div>title</div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </Grid>
          
          <Grid item xs={4} sm={4} md={4}>
            <img src='https://codingapple1.github.io/shop/shoes2.jpg' />
            <div>title</div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </Grid>
          
          <Grid item xs={4} sm={4} md={4}>  
            <img src='https://codingapple1.github.io/shop/shoes3.jpg' />
            <div>title</div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </Grid>
        </Grid>
      </Container> 
    </Container>
    </>
  );
}

export default App;
