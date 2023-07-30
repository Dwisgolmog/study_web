import {React,useState} from 'react';
import NavBar from './components/NavBar';
import { Container } from '@mui/system';
import bg from './img/bg.png';
import { Grid } from '@mui/material';
import data from './data.js';

function App() {
  const [shoes,setShoes] = useState(data);

  return (
    <>
    <NavBar></NavBar>
    <Container fixed className="App">
      <div className='main-bg' style={{backgroundImage : `url(${bg})`}}></div>

      <Container >
        <Grid container className='item'>
          <Grid item xs={4} sm={4} md={4}>
            <img src='https://codingapple1.github.io/shop/shoes1.jpg' />
            <div>{shoes[0].title}</div>
            <p>{shoes[0].content}</p>
            <p>{shoes[0].price}</p>
          </Grid>
          
          <Grid item xs={4} sm={4} md={4}> 
            <img src='https://codingapple1.github.io/shop/shoes2.jpg' />
            <div>{shoes[1].title}</div>
            <p>{shoes[1].content}</p>
            <p>{shoes[1].price}</p>
          </Grid>
          
          <Grid item xs={4} sm={4} md={4}>  
            <img src='https://codingapple1.github.io/shop/shoes3.jpg' />
            <div>{shoes[2].title}</div>
            <p>{shoes[2].content}</p>
            <p>{shoes[2].price}</p>
          </Grid>
        </Grid>
      </Container> 
    </Container>
    </>
  );
}

export default App;
