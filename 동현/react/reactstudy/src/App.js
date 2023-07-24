/* eslint-disable */
// waring 메세지를 없애줌

import './App.css';
import {useState} from 'react';

function App() {
  //Destructuring
  //state의 사용 이유
  //일반 변수를 사용하는것과 달리 state는 내용의 변경이 있을시 html이 자동 재렌더링이 됌
  let [title,setTitle] = useState(['man shirt','study react','mapleStory']);
  let [good,setGood] = useState([0,1,2]);

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>Blog <span onClick={()=>{title[0] = 'Women shirt'; setTitle([...title])}}>ChangeWomen</span></h4>
      </div>
  
      {title.map((e, index) =>
        <div className='list' key={index}>
          <h4>{e} <span onClick={() => { setGood(good[index] + 1) }}>👍</span> {good[index]}</h4>
          <p>Date</p>
        </div>
      )}      
    </div>
  );
}

export default App;
