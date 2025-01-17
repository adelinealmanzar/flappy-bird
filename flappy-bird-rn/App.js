import React, { useState, useEffect } from 'react'
import Gameplay from './components/Gameplay/Gameplay'
import HomePage from './components/HomePage'

function App() {
  const [player, setPlayer] = useState(null)
  const [renderGameplay, setRenderGameplay] = useState(false)
  const [levelMS, setLevelMS] = useState(30)
  const [currentDifficultyLvl, setCurrentDifficultyLvl] = useState(null)
  const [ score, setScore ] = useState(0)
  const [renderLogin, setRenderLogin] = useState(true)
  const [ isGameOver, setIsGameOver ] = useState(false)

  useEffect(() => {
    fetch('https://cryptic-headland-19872.herokuapp.com/me')
    .then(r => {
      if (r.ok) {
        r.json()
        .then(player => setPlayer(() => player))
      } else {
        r.json()
        .then(data => console.log('in fetch error', data))
      }
    })
  }, [isGameOver])


  //TODO: add logout option in end module
  function handleLogout() {
    setPlayer(null)
  }
  
  return (
    <>
      {renderGameplay ? <Gameplay
        player={player}
        levelMS={levelMS}
        setRenderGameplay={setRenderGameplay}
        currentDifficultyLvl={currentDifficultyLvl}
        score={score} setScore={setScore}
        setRenderLogin={setRenderLogin}
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
      /> :
      <HomePage
        setPlayer={setPlayer}
        setRenderGameplay={setRenderGameplay}
        setLevelMS={setLevelMS}
        setCurrentDifficultyLvl={setCurrentDifficultyLvl}
        renderLogin={renderLogin}
        setRenderLogin={setRenderLogin}
      />}
    </>
  )
}

export default App