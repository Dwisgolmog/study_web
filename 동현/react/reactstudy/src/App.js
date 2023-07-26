import './App.css';
import {useState} from 'react';

function App() {
  //Destructuring
  //state의 사용 이유
  //일반 변수를 사용하는것과 달리 state는 내용의 변경이 있을시 html이 자동 재렌더링이 됌
  const name = ['man shirt','study react','mapleStory']
  let [title,setTitle] = useState(name); //화면상에 보여줄 게시물의 제목들
  let [good,setGood] = useState([0,1,2]); //화면상에 보여줄 각 게시물들의 따봉 갯수
  const [modal,setModal] = useState(false); //모달창을 보여지게 만들기 위한 변수
  const [titleNumber,setTitleNumber] = useState(0); //모달창 안에 제목을 보여주기 위한 변수
  const [addTitle,setAddTitle] = useState(); //게시물을 추가할 제목을 담을 변수

  function modifyTitle(){
      const copyTitle = [...title];
      copyTitle[0] = 'Women shirt';
      setTitle(copyTitle);
  }

  function sortTitle(){
    const copyTitle = [...title];
    setTitle(copyTitle.sort());
  }

  function up(index){
    const copyGood = [...good];
    copyGood[index] = copyGood[index] + 1;
    setGood(copyGood); 
  }

  
  function deleteCon(index){
    const copyTitle = [...title];
    copyTitle.splice(index,1);
    setTitle(copyTitle);

    const copyGood = [...good];
    copyGood.splice(index,1);
    setGood(copyGood);

  }
  return (
  
    <div className="App">
      <div className='black-nav'>
        <h4>Blog <span onClick={sortTitle}>sort Title</span></h4>
      </div>

      {title.map((e, index) =>
        <div className='list' key={index}>
          <h4 onClick={()=>{modal==false ? setModal(true) : setModal(false); setTitleNumber(index)}}>{e} 
            <span onClick={(e)=>{e.stopPropagation(); up(index)}}>👍</span> {good[index]}
          </h4>
          <p>{new Date()}</p>
          <p><button onClick={(e)=>{e.stopPropagation(); deleteCon(index)}}>Delete</button></p>
        </div>
      )}


      <input onChange={(e) => setAddTitle(e.target.value)} /><button onClick={() => {
        const copyTitle = [...title];
        copyTitle.unshift(addTitle);
        setTitle(copyTitle);

        good.unshift(parseInt(0));
        setGood(good);

      }}>submit</button>


      {
        modal == true ? <Modal modifyTitle={modifyTitle} title={title} index={titleNumber}></Modal> : null
      }
      
    </div>
  );
}

function Modal(props){
  return(
    <div className='modal'>
      <h4>{props.title[props.index]}</h4>
      <p>Date</p>
      <p>content</p>
      <button onClick={props.modifyTitle}>ChangeWomen</button>
    </div> 
  );
}

export default App;
