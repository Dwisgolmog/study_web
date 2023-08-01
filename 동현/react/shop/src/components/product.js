import React from 'react';
import { Grid } from '@mui/material';
import '../App.css';

function ProductCard(props){
    return(
        <>
        <Grid item xs={4} sm={4} md={4}>
            <img src={`https://codingapple1.github.io/shop/shoes${props.index}.jpg`} />
            <div>{props.product.title}</div>
            <p>{props.product.content}</p>
            <p>{props.product.price}</p>
        </Grid>          
        </>
    );
}

export default ProductCard