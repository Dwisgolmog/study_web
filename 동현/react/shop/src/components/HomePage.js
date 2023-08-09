import React, { useState } from 'react';
import bg from '../img/bg.png'
import { Button, Grid,Fade} from '@mui/material';
import { Container } from '@mui/system';
import data from '../data';
import ProductCard from './product';
import axios from 'axios';

function HomePage() {
    const [shoes] = useState(data);
    const [moreShoes,setMoreShoes] = useState(null);
    const [bool,setBool] = useState(false);
    const [num,setNum] = useState(2);
    const [loding,setLoding] = useState(false);
    // const [lodingUi,setlodingUi] = useState(false);

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
                    {loding && (<div>로딩중</div>)}
                    {   
                        num < 4 ? 
                        <Button onClick={()=>{
                            setLoding(true);
                            axios.get(`https://codingapple1.github.io/shop/data${num}.json`)
                            .then((result)=>{
                                if(moreShoes == null){
                                    setMoreShoes(result.data);
                                }else{
                                    let copy = [...moreShoes,...result.data];
                                    setMoreShoes(copy);
                                }
                                setBool(true);
                                setNum(num+1);
                                setLoding(false);
                            })
                            .catch(()=>{
                                console.log('통신 실패');
                                setLoding(false);
                                
                            })
                        }} variant='outlined' sx={{m:2}}>더보기</Button>
                        : null
                    }

                </Grid>
            </Container>
        </>
    );
}

export default HomePage