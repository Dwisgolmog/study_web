import {React,useState} from 'react';
import NavBar from './components/NavBar';
import { Container } from '@mui/system';
import {Routes, Route, UNSAFE_DataRouterStateContext} from 'react-router-dom';
import HomePage from './components/HomePage';
import Detail from './components/detail';
import Event from './Page/Event';
import data from './data';
import './App.css';
import Cart from './Page/Cart';

function App() {
  const [shoes] = useState(data);



  return (
    <>
    <NavBar></NavBar>
    <Container fixed className="App">
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}/>

        <Route path='/detail/:id' element={<Detail shoes={shoes}></Detail>}/>

        <Route path='/event' element={<Event></Event>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰 받기</div>}/>
        </Route>

        <Route path='*' element={<div>없는페이지 입니다.</div>}/>
        
        <Route path='/cart' element={<Cart></Cart>} ></Route>
      </Routes>      
    </Container>
    </>
  );
}

export default App;
