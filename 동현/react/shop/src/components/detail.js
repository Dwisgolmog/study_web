import React from 'react'
import { Container } from '@mui/system';
import { Grid,Button } from '@mui/material';
import '../App.css'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {Alert} from '@mui/material';


function Detail(props) {
    let {id} = useParams();
    let imageId = parseInt(id)+1;

    let product = props.shoes.find(item => item.id == id);

    let [dis,setDis] = useState('');
    useEffect(()=>{
        setTimeout(()=>{
            setDis(dis='none');
        },2000);
    })

    return (
        <div className='detail'>
            <Alert style={{display: dis}} variant="outlined" severity="info">2초후에 해당 창이 사라집니다.</Alert>
            <img src={`https://codingapple1.github.io/shop/shoes${imageId}.jpg`} style={{ width: '70%' }}/>
            <Container>
                <Grid container className='item'>
                    <Grid item xs={12}>
                        <h4 className="pt-5">{product.title}</h4>
                        <p>{product.content}</p>
                        <p>{product.price}</p>
                        <Button variant="outlined">주문하기</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Detail
