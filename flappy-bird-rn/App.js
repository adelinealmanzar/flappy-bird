import React, { useState } from 'react'
import Gameplay from './components/Gameplay/Gameplay'
import Login from './components/Login'

function App() {
  const [renderLogin, setRenderLogin] = useState(true)
  
  return (
    <>
        {renderLogin ? <Login /> : <Gameplay />}
    </>
  )
}

export default App