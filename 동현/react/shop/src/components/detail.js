import React from 'react'
import { Container } from '@mui/system';
import { Grid,Button } from '@mui/material';
import '../App.css'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'; 

const YellowBtn = styled.button`
    background : ${props => props.bg};
    color : black;
    padding : 10px;
`;

function Detail(props) {
    let {id} = useParams();
    let imageId = parseInt(id)+1;

    let product = props.shoes.find(item => item.id == id);

    return (
        <div className='detail'>
            <YellowBtn bg='yellow'>button</YellowBtn>    
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
