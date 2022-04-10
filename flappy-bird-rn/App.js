import React, { useState, createContext, useEffect } from 'react'
import Gameplay from './components/Gameplay/Gameplay'
import Login from './components/Login'
import Constants from "expo-constants"

export const PlayerContext = createContext()

//Remove temp player once get fetches to work
const tempPlayer = {
  "id": 1,
  "username": "flyguy",
  "password_digest": "$2a$12$iPn.7J2zfe0xBo3Jy1KhHuukekgPE4B.JfpS2ZFHZgsNs7GE3pp.i",
  "scores": [
    {
    "id": 1,
    "score": 10,
    "victory": null,
    "difficulty_id": 1
    },
    {
    "id": 2,
    "score": 9,
    "victory": null,
    "difficulty_id": 2
    },
    {
    "id": 3,
    "score": 5,
    "victory": null,
    "difficulty_id": 3
    }
  ]
}

function App() {
  const [renderGameplay, setRenderGameplay] = useState(true)
  const [player, setPlayer] = useState(tempPlayer)

  const { manifest } = Constants
  const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

  useEffect(() => {
    // fetch('/me')
    fetch('http://66.65.82.214/localhost3000/players')
    //uncomment proxy package.json when working
    // fetch(uri)
    .then(r => {
      if (r.ok) {
        r.json()
        // .then(player => setPlayer(() => player))
        .then(players => console.log('in fetch', players[0]))
      } else {
        r.json()
        .then(data => console.log('in fetch error', data)) // TODO: see if need this else
      }
    })
  }, [])

  // console.log('player', player)

  //TODO: add logout option in end module
  function handleLogout() {
    setPlayer(null)
  }
  
  return (
    // <PlayerContext.Provider value={player}>
    <>
      {renderGameplay ? <Gameplay player={player}/> : <Login setPlayer={setPlayer}/>}
    </>
    // </PlayerContext.Provider>
  )
}

export default App