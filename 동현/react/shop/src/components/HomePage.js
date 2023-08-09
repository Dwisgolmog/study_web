import React, { useState } from 'react';
import bg from '../img/bg.png'
import { Button, Grid,Fade} from '@mui/material';
import { Container } from '@mui/system';
import data from '../data';
import ProductCard from './product';
import axios from 'axios';

function HomePage() {
    const [shoes] = useState(data);
    const [moreShoes,setMoreShoes] = useState();
    const [bool,setBool] = useState(false);

    return (
        <>
            <div className='main-bg' style={{ backgroundImage: `url(${bg})` }}></div>

            <Container>
                <Grid container className='item'>
                    {shoes.map((product, index) => {
                        return <ProductCard key={index} product={product} index={index + 1}></ProductCard>
                    })}
                    {bool && (
                        <Fade in={bool} timeout={1500}>
                            <Grid container className='item'>
                                {moreShoes.map((product, index) => (
                                    <ProductCard key={index} product={product} index={index + 4}></ProductCard>
                                ))}
                            </Grid>
                        </Fade>
                    )}
                </Grid>
                <Grid container justifyContent='center'>
                    <Button onClick={()=>{
                        axios.get('https://codingapple1.github.io/shop/data2.json')
                        .then((result)=>{
                            setMoreShoes(result.data);
                            setBool(true);
                        })
                        .catch(()=>{
                            console.log('통신 실패');
                        })
                    }} variant='outlined' sx={{m:2}}>더보기</Button>
                </Grid>
            </Container>
        </>
    );
}

export default HomePage