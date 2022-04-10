import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar'
import React, { useState, createContext, useEffect } from 'react'
import Gameplay from './components/Gameplay/Gameplay'
import Login from './components/Login'

export const PlayerContext = createContext()

function App() {
  const [renderGameplay, setRenderGameplay] = useState(false)
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    fetch('/me')
    .then(r => {
      if (r.ok) {
        r.json()
        .then(player => setPlayer(() => player))
        .then
      } else {
        r.json()
        .then(data => console.log(data)) // TODO: see if need this else
      }
    })
  }, [])
  
  // function handleLogin(player) {
  //   setPlayer(player)
  // }
  console.log(player)

  //TODO: add logout option in end module
  function handleLogout() {
    setPlayer(null)
  }
  
  return (
    // <PlayerContext.Provider value={player}>
    <>
      {renderGameplay ? <Gameplay /> : <Login setPlayer={setPlayer}/>}
    </>
    // </PlayerContext.Provider>
  )
}

export default App