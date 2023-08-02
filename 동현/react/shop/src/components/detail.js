import React from 'react'
import { Container } from '@mui/system';
import { Grid,Button } from '@mui/material';
import '../App.css'
import { useParams } from 'react-router-dom';

function Detail(props) {
    let {id} = useParams();
    let imageId = parseInt(id)+1;
    
    return (
        <div className='detail'>
            <img src={`https://codingapple1.github.io/shop/shoes${imageId}.jpg`} style={{ width: '70%' }}/>
            <Container>
                <Grid container className='item'>
                    <Grid item xs={12}>
                        <h4 className="pt-5">{props.shoes[id].title}</h4>
                        <p>{props.shoes[id].content}</p>
                        <p>{props.shoes[id].price}</p>
                        <Button variant="outlined">주문하기</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Detail
