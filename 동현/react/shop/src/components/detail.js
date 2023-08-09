import React from 'react'
import { Container } from '@mui/system';
import { Grid,Button, Grow } from '@mui/material';
import '../App.css'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {Alert} from '@mui/material';
import {TextField} from '@mui/material';


function Detail(props) {
    let {id} = useParams();
    let imageId = parseInt(id)+1;

    let product = props.shoes.find(item => item.id == id);

    let [alert,setAlert] = useState(true);
    const [inputValue,setInputValue] = useState();
    const [showAlert,setShowAlert] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{ 
            setAlert(false);
        },2000);
        return()=>{
        }
    },[])

    useEffect(()=>{
        if(inputValue == null || inputValue == ''){
            setShowAlert(false);
        }else{
            if(isNaN(inputValue)){
                setShowAlert(true);
            }else{
                setShowAlert(false);
            }
        }
    },[inputValue])

    //input값 변수에 저장
    const onChangeInput = (e) =>{setInputValue(e.target.value)}

    return (
        <div className='detail'>
            {
                alert == true ? <Alert variant="outlined" severity="info">2초후에 해당 창이 사라집니다.</Alert>
                : null
            }
            
            <img src={`https://codingapple1.github.io/shop/shoes${imageId}.jpg`} style={{ width: '70%' }}/>
            <Container>
                <Grid container className='item'>
                    <Grid item xs={12}>
                        
                        <Grow in={showAlert} timeout={2000}><Alert sx={{m:2}} variant="filled" severity="error">경고:숫자만 입력해주세요</Alert></Grow>
                        
                        <TextField label="수량" variant="outlined" onChange={onChangeInput} />
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
