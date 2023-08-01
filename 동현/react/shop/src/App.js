import {React} from 'react';
import NavBar from './components/NavBar';
import { Container } from '@mui/system';
import {Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Detail from './components/detail';

function App() {
  return (
    <>
    <NavBar></NavBar>
    <Container fixed className="App">
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}/>
        <Route path='/detail' element={<Detail></Detail>}/>
      </Routes>      
    </Container>
    </>
  );
}

export default App;
