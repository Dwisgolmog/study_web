import './App.css';
import {useState} from 'react';

function App() {
  //Destructuring
  //state의 사용 이유
  //일반 변수를 사용하는것과 달리 state는 내용의 변경이 있을시 html이 자동 재렌더링이 됌
  const name = ['man shirt','study react','mapleStory']
  let [title,setTitle] = useState(name);
  let [good,setGood] = useState([0,1,2]);

  function modifyTitle(){
      const copyTitle = [...title];
      copyTitle[0] = 'Women shirt';
      setTitle(copyTitle);
  }

  function sortTitle(){
    const copyTitle = [...title];
    setTitle(copyTitle.sort());
  }
  return (
  
    <div className="App">
      <div className='black-nav'>
        <h4>Blog <span onClick={modifyTitle}>ChangeWomen</span> <span onClick={sortTitle}>sort Title</span></h4>
      </div>

      {title.map((e, index) =>
        <div className='list' key={index}>
          <h4>{e} <span onClick={() => { setGood(good[index] + 1) }}>👍</span> {good[index]}</h4>
          <p>Date</p>
        </div>
      )}

      <div className='modal'>
        <h4>title</h4>
        <p>Date</p>
        <p>content</p>
      </div>      
    </div>
  );
}

export default App;
