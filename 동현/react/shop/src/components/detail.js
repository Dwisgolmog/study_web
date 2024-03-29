import React from 'react'
import { Container } from '@mui/system';
import { Grid,Button, Grow } from '@mui/material';
import '../App.css'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {Alert} from '@mui/material';
import {TextField} from '@mui/material';
import {Tab,Tabs} from '@mui/material';
import { useDispatch } from 'react-redux';
import { inCart } from '../store/cart';

function Detail(props) {
    let dispatch = useDispatch();
    let {id} = useParams();
    let imageId = parseInt(id)+1;

    let product = props.shoes.find(item => item.id == id);

    let [alert,setAlert] = useState(true);
    const [inputValue,setInputValue] = useState();
    const [showAlert,setShowAlert] = useState(false);
    const [tabValue,setTabValue] = useState(0);
    const [pageEnd,setPagaEnd] = useState('detailEnd');

    useEffect(()=>{
        let a = setTimeout(()=>{setPagaEnd('detailEnd')},100)
        setTimeout(()=>{ 
            setAlert(false);
        },3000);
        return()=>{
            clearTimeout(a);
            setPagaEnd('');
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

    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('item'));
        if(data.some(item=>item===id)){
            console.log('상품번호 중복');
        }else{
            data.push(id);
            localStorage.setItem('item',JSON.stringify(data));
        }   
    },[])

    //input값 변수에 저장
    const onChangeInput = (e) =>{setInputValue(e.target.value)}

    return (
        <div className={`detail detailStart ${pageEnd}`}>
            {
                alert === true ? <Grow in={alert} timeout={1000}><Alert variant="outlined" severity="info">3초후에 해당 창이 사라집니다.</Alert></Grow>
                : <Grow in={alert} timeout={1000}><Alert variant="outlined" severity="info">3초후에 해당 창이 사라집니다.</Alert></Grow>
            }
            
            <Container>
                <Grid container className='item'>
                    <Grid item xs={6}><img src={`https://codingapple1.github.io/shop/shoes${imageId}.jpg`} style={{ width: '100%' }}/></Grid>
                    <Grid item xs={6}>
                        <h2 className="pt-5">{product.title}</h2>
                        <p>{product.content}</p>
                        <p>{product.price}</p>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField sx={{height:'6vw',width:'18vw'}} label="수량" variant="outlined" onChange={onChangeInput} />
                            </Grid>
                            <Grid item xs={6}>
                                <Button sx={{height:'6vw', width:'13vw'}} variant="outlined" onClick={()=>{dispatch(inCart(product))}}>주문하기</Button>
                            </Grid>
                        </Grid>
                        <Grow in={showAlert} timeout={2000}><Alert sx={{m:2}} variant="filled" severity="error">경고:숫자만 입력해주세요</Alert></Grow>
                    </Grid>
                </Grid>
                <Grid container>
                    <Tabs value={tabValue} onChange={(e,newValue)=>setTabValue(newValue)}>
                        <Tab label='첫번째'/>
                        <Tab label='두번째'/>
                        <Tab label='세번째'/>
                    </Tabs>
                </Grid>
                <hr style={{marginTop : '-0.1vw'}} />
                <TabPanel value={tabValue} shoes={props.shoes}/>
            </Container>
        </div>
    );
}

function TabPanel({value,shoes}){
    const [bool,setBool] = useState('detailEnd');

    useEffect(()=>{
        let a = setInterval(()=>{setBool('detailEnd')},100);
        return ()=>{
            setBool('');
        }
    },[value])

    return (
        <div className={`detailStart ${bool}`}>
            {[<div>{shoes[0].title}</div>,<div>두번째</div>,<div>세번째</div>][value]}
        </div>
        
        
    )
}

export default Detail
