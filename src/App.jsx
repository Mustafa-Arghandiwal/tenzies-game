import Tenzi from "./Tenzi"
import { useState, useEffect } from "react"
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { nanoid } from "nanoid"




function App() {
  
  function generateRandomArr() {
          let arr = []
      for(let i=1; i<=10; i++) {
          let randNum = Math.floor((Math.random() * 6)+1)
          arr.push({num: randNum, frozen: false, id: nanoid()})
      }
      return arr
      }
      function generateRandomNumber() {
          return Math.floor(Math.random() * 6) + 1
      }
  
      const [randArr, setRandArr] = useState(generateRandomArr())
      
  
      function handleClickRoll() {
  
          setRandArr(prevRandArr => {
             return prevRandArr.map(obj => {
                  if(!obj.frozen) {
                      return {
                          ...obj,
                          num: generateRandomNumber()
                      }
                  } else {
                      return obj
                  }
              })
          })
      }
  
      function handleClickNewGame() {
          setRandArr(generateRandomArr())
      }
      
      const [won, setWon] = useState(false)
  
      useEffect(() => {
          for(let obj of randArr) {
              if(obj.num !== randArr[0].num || !obj.frozen) {
                  setWon(false)
                  return
              }
  
          }
          setWon(true)
      }, [randArr])
      
  
      function handleClickFreeze(index) {
          setRandArr(prevRandArr => {
               return prevRandArr.map((obj, objIndex)=> {
                  if(index === objIndex) {
                      return {
                          ...obj,
                          frozen: !obj.frozen
                      }
                  } else {
                      return obj
                  }
              })
          })
          
      }
  
      
      
  
      const tenziEls = randArr.map((obj, index)=> {
          
          return <Tenzi key={obj.id} index={index} num={obj.num} frozen={obj.frozen} freeze={handleClickFreeze}/>
      })


      const {width, height} = useWindowSize()
  

  return (
    <div className="bg-[#242424] min-h-screen grid place-items-center font-poppins">
      {won && <Confetti />}
      <div className="min-w-96 w-[40vw] px-4 py-10  bg-slate-100 rounded-md flex flex-col items-center gap-20">
            <div className="flex flex-col items-center gap-5">
            <h1 className="text-5xl font-semibold">Tenzies</h1>
            <p className="max-w-[80%] text-center">Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>

            </div>
            <div className="grid grid-cols-5 gap-7 place-items-center ">
                {tenziEls}
            </div>
            <button onClick={won ? handleClickNewGame : handleClickRoll}  
            className={`rounded-md  px-5 cursor-pointer active:scale-95
            drop-shadow-lg active:drop-shadow-none py-2 bg-indigo-700 text-white duration-75 transition-all
            `}>{won ? "New Game" : "Roll"}</button>

            
    </div>

    </div>
  )
}

export default App
