/* eslint-disable */
// waring 메세지를 없애줌

import './App.css';
import {useState} from 'react';

function App() {
  //Destructuring
  //state의 사용 이유
  //일반 변수를 사용하는것과 달리 state는 내용의 변경이 있을시 html이 자동 재렌더링이 됌
  let [title,setTitle] = useState(['man shirt','study react','mapleStory']);
  let [good,setGood] = useState(0);

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>Blog <span onClick={()=>{title[0] = 'Women shirt'; setTitle([...title])}}>ChangeWomen</span></h4>
      </div>
      <div className='list'>
        <h4>{title[0]} <span onClick={()=> {setGood(good+1)}}>👍</span> {good}</h4>
        <p>Date</p>
      </div>
      <div className='list'>
        <h4>{title[1]} <span onClick={()=> {setGood(good+1)}}>👍</span> {good}</h4>
        <p>Date</p>
      </div>
      <div className='list'>
        <h4>{title[2]} <span onClick={()=> {setGood(good+1)}}>👍</span> {good}</h4>
        <p>Date</p>
      </div>
      
    </div>
  );
}

export default App;
