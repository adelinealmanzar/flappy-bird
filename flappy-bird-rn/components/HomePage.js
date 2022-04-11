import React, { useState } from 'react'
import { Dimensions, StyleSheet, ImageBackground } from 'react-native'
import Login from './Login'
import Start from './Start'

const screenWidth = Dimensions.get("screen").width //get screen width on whichever mobile phone
const screenHeight = Dimensions.get("screen").height //get screen height on whichever mobile phone


function HomePage({ setPlayer, setRenderGameplay, setLevelMS, setCurrentDifficultyLvl }) {
  const [renderLogin, setRenderLogin] = useState(true)

  const titleImage = { uri: "https://i.ibb.co/QH6KmKR/flappybirdy-regular.png"}
  const backgroundImage = { uri: "https://i.ibb.co/V3Wj4Qp/fb-game-background.png"}
  const birdImage = { uri: "https://i.ibb.co/PcCqNRP/flappy-bird.png" }

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
        <ImageBackground source={birdImage} resizeMode="stretch" style={styles.bird} />
        <ImageBackground source={titleImage} resizeMode="stretch" style={styles.title} />
        {renderLogin ? <Login setPlayer={setPlayer} setRenderLogin={setRenderLogin}/> : <Start setRenderGameplay={setRenderGameplay} setLevelMS={setLevelMS} setCurrentDifficultyLvl={setCurrentDifficultyLvl}/>}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
      width: screenWidth,
      height: screenHeight,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  bird: {
      width: 50,
      height: 60,
      position: 'absolute',
      overflow: 'hidden',
      left: 50,
      bottom: screenHeight - screenHeight/2.8,
      transform: [{ rotate: '-15deg'}]
  },
  title: {
      position: 'absolute',
      overflow: 'hidden',
      alignSelf: 'center',
      width: 300,
      height: 60,
      bottom: screenHeight - screenHeight/4
  }
})

export default HomePage