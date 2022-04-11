import React, { useState, useEffect } from 'react'
import Gameplay from './components/Gameplay/Gameplay'
import HomePage from './components/HomePage'

function App() {
  const [player, setPlayer] = useState(null)
  const [renderGameplay, setRenderGameplay] = useState(false)
  const [levelMS, setLevelMS] = useState(30)

  useEffect(() => {
    fetch('https://stark-bayou-42970.herokuapp.com/me')
    .then(r => {
      if (r.ok) {
        r.json()
        .then(player => setPlayer(() => player))
        .then(players => console.log('in fetch', players && players[0]))
      } else {
        r.json()
        .then(data => console.log('in fetch error', data))
      }
    })
  }, [])


  //TODO: add logout option in end module
  function handleLogout() {
    setPlayer(null)
  }
  
  return (
    <>
      {renderGameplay ? <Gameplay player={player} levelMS={levelMS} setRenderGameplay={setRenderGameplay}/> : <HomePage setPlayer={setPlayer} setRenderGameplay={setRenderGameplay} setLevelMS={setLevelMS} />}
    </>
  )
}

export default App