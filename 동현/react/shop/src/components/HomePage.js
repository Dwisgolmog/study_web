import React, { useState } from 'react';
import bg from '../img/bg.png'
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import data from '../data';
import ProductCard from './product';

function HomePage() {
    const [shoes] = useState(data);
    return (
        <>
            <div className='main-bg' style={{ backgroundImage: `url(${bg})` }}></div>

            <Container >
                <Grid container className='item'>

                    {shoes.map((product, index) => {
                        return <ProductCard key={index} product={product} index={index + 1}></ProductCard>
                    })}
                </Grid>
            </Container>
        </>
    );
}

export default HomePage