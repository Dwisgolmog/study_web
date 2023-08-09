import React from 'react'
import { Container } from '@mui/system';
import { Grid,Button, Grow } from '@mui/material';
import '../App.css'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {Alert} from '@mui/material';
import {TextField} from '@mui/material';
import {Tab,Tabs} from '@mui/material';


function Detail(props) {
    let {id} = useParams();
    let imageId = parseInt(id)+1;

    let product = props.shoes.find(item => item.id == id);

    let [alert,setAlert] = useState(true);
    const [inputValue,setInputValue] = useState();
    const [showAlert,setShowAlert] = useState(false);
    const [tabValue,setTabValue] = useState(0);

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
                                <Button sx={{height:'6vw', width:'13vw'}} variant="outlined">주문하기</Button>
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
                <TabPanel value={tabValue}/>
            </Container>
        </div>
    );
}

function TabPanel({value}){
    return [<div>첫번째</div>,<div>두번째</div>,<div>세번째</div>][value];
}

export default Detail
