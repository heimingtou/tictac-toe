import React from 'react';
import { useState } from 'react';
import './App.css'
const Square=React.memo (function Square({value,onClick,className}){
  return(
    <button className={className} onClick={onClick}>{value}</button>
  );

})
function App() {
  const [endGame,setEndGame]=useState(false);
  const [classN,setClassN]=useState(Array(9).fill("square"))
  
  const [square,setSquare]=useState(Array(9).fill(null))
  const [move,SetMove]=useState(0);
  const [indexXs,setIndex]=useState([]);
   const [indexYs,setIndexY]=useState([]);
   const [player,setPlayer]=useState()
    //const [value, setValue]=useState(null);
  function saveIndex(i,index,nextSquare){
    index.push(i);
    if(move>5)
      {
        nextSquare[index[0]]=null;
        index.shift()
      }
      
      console.log(`${index[0]} ${index[1]} ${index[2]}`)
  }
  function reset(){
    setSquare(Array(9).fill(null))
    setIndexY([])
    setIndex([])
    setEndGame(false)
    setClassN(Array(9).fill("square"))
    SetMove(0);
  }
 const  status=endGame?`WINNER: ${player}`:((move%2==0)?"Player X":"Player O");
  function handClick(i){
    let nextSquare=square.slice();
    let indexX=indexXs.slice()
    let indexY =indexYs.slice()
    if(endGame||square[i]!=null)
      return;
    if(move%2){
      saveIndex(i,indexY,nextSquare)
      nextSquare[i]="O" 
      setPlayer("O");
      
    }
    else{
      saveIndex(i,indexX,nextSquare)
      nextSquare[i]="X";
      
      setPlayer("X")
    }
    setIndexY(indexY)
    setIndex(indexX)
    setSquare(nextSquare);
    SetMove(move+1);
    winNer(nextSquare);
  }
  function winNer(square){
   const lines = [
    [0, 1, 2], // hàng 1
    [3, 4, 5], // hàng 2
    [6, 7, 8], // hàng 3
    [0, 3, 6], // cột 1
    [1, 4, 7], // cột 2
    [2, 5, 8], // cột 3
    [0, 4, 8], // chéo chính
    [2, 4, 6], // chéo phụ
  ];
  for(let [a,b,c]of lines){
    if(square[a]&&square[a]==square[b]&&square[b]==square[c]){
      let newClass=classN.slice();
      newClass[a]="winPlayer"
      newClass[b]="winPlayer"
      newClass[c]="winPlayer"
      setClassN(newClass);
    setEndGame(true)
  }
}
  }
  return (
    <>
    <div className='text'><h2>{status}</h2></div>
     <div className='board-row'>
      <Square onClick={()=>handClick(0)} value={square[0]} className={classN[0]} />
      <Square onClick={()=>handClick(1)} value={square[1]} className={classN[1]}/>
      <Square onClick={()=>handClick(2)} value={square[2]} className={classN[2]}/>
     </div>
     <div className='board-row'>
      <Square onClick={()=>handClick(3)} value={square[3]} className={classN[3]}/>
      <Square onClick={()=>handClick(4)} value={square[4]} className={classN[4]}/>
      <Square onClick={()=>handClick(5)} value={square[5]} className={classN[5]}/>
     </div>
     <div className='board-row'>
      <Square onClick={()=>handClick(6)} value={square[6]} className={classN[6]}/>
      <Square onClick={()=>handClick(7)} value={square[7]} className={classN[7]}/>
      <Square onClick={()=>handClick(8)} value={square[8]} className={classN[8]}/>
     </div>
     <button className="reset" onClick={reset}>Reset</button>
    </>
  )
}

export default App 