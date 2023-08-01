import React from 'react'
import { Container } from '@mui/system';
import { Grid,Button } from '@mui/material';
import '../App.css'

function Detail() {
    return (
        <div className='detail'>
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" style={{ width: '70%' }} />
            <Container>
                <Grid container className='item'>
                    <Grid item xs={12}>
                        <h4 className="pt-5">상품명</h4>
                        <p>상품설명</p>
                        <p>120000원</p>
                        <Button variant="outlined">주문하기</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Detail
