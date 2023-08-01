import {React,useState} from 'react';
import NavBar from './components/NavBar';
import ProductCard from './components/product';
import { Container } from '@mui/system';
import bg from './img/bg.png';
import { Grid } from '@mui/material';
import data from './data.js';

function App() {
  const [shoes] = useState(data);

  return (
    <>
    <NavBar></NavBar>
    <Container fixed className="App">
      <div className='main-bg' style={{backgroundImage : `url(${bg})`}}></div>

      <Container >
        <Grid container className='item'>
          
          {shoes.map((product,index) => {
            return <ProductCard key={index} product = {product} index = {index+1}></ProductCard>
          })}
        </Grid>
      </Container> 
    </Container>
    </>
  );
}

export default App;
