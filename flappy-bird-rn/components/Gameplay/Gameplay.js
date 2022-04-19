import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native'
import Bird from './Bird'
import Obstacles from './Obstacles'
import ScoreBoard from './ScoreBoard'
import { Audio } from 'expo-av'

const screenWidth = Dimensions.get("screen").width //get screen width on whichever mobile phone
const screenHeight = Dimensions.get("screen").height //get screen height on whichever mobile phone

function Gameplay({ player, levelMS, setRenderGameplay, currentDifficultyLvl, score, setScore, setRenderLogin, isGameOver, setIsGameOver }) {
  const [ birdBottom, setBirdBottom ] = useState(screenHeight && screenHeight / 2) // bird will move only up and down with us manipulating the bottom position on screen (starting at middle of screen)
  const [ obstaclesLeft, setObstaclesLeft ] = useState(screenWidth && screenWidth)
  const [ obstaclesLeftTwo, setObstaclesLeftTwo ] = useState(screenWidth && screenWidth + screenWidth/2 + 30)
  const [ obstacleRanHeight, setObstacleRanHeight ] = useState(0)
  const [ obstacleRanHeightTwo, setObstacleRanHeightTwo ] = useState(0)

  const [sound, setSound] = React.useState();

  async function playFlapSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/flaps.wav')
    )
    setSound(sound)

    await sound.playAsync(); }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync() }
      : undefined
  }, [sound])

  const birdLeft = screenWidth / 2 //point at the bottom left of our bird view/div
  const birdWidth = 60
  const gravity = 3
  let birdBottomTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo

  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200

  //make bird fall with 'gravity'
  useEffect(() => {
    // as long as birdBottom is above 0, every 30 ms decrease bird position by gravity/3pxs
    if (birdBottom > 0) {
      birdBottomTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(birdBottomTimerId)
      }
    }

  }, [birdBottom])

  //move first obstacles based on obstacle left
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, levelMS)

      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    } else {
      //when obstacle goes off the screen
      setObstaclesLeft(screenWidth) //loop obstacle by restarting on left of screen
      setObstacleRanHeight(0 - Math.random() * 100)
    }
  }, [obstaclesLeft])

  //move second obstacle to the left
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, levelMS)

      return () => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } else {
      //when obstacle goes off the screen
      setObstaclesLeftTwo(screenWidth) //loop obstacle
      setObstacleRanHeightTwo(0 - Math.random() * 100)
    }
  }, [obstaclesLeftTwo])

  // is collision happens, game over
  useEffect(() => {
    if (
        ((birdBottom < (obstacleRanHeight + obstacleHeight + 30) ||
        birdBottom > (obstacleRanHeight + obstacleHeight + gap -30)) &&
        (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 ))
        || 
        ((birdBottom < (obstacleRanHeightTwo + obstacleHeight + 30) ||
        birdBottom > (obstacleRanHeightTwo + obstacleHeight + gap -30)) &&
        (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 ))
      ) 
      {
      gameover()
    }
  },)

  // if bird passes obstacles, set score
  useEffect(() => {
    if (
      obstaclesLeftTwo > birdLeft - birdWidth &&
      obstaclesLeftTwo < screenWidth/2 - birdWidth + 5 ||
      obstaclesLeft > birdLeft - birdWidth &&
      obstaclesLeft < screenWidth/2 - birdWidth + 5
    )
    {
      setScore (score => score + 1)
    }
  }, [obstaclesLeft, obstaclesLeftTwo])

  function jump() {
    if (!isGameOver && (birdBottom < screenHeight)){
      setBirdBottom(birdBottom => birdBottom + 50)
      playFlapSound()
    }
  }

  function restart() {
    // set all states back to default values
    setIsGameOver(false)
    setBirdBottom(screenHeight && screenHeight / 2)
    setObstaclesLeft(screenWidth && screenWidth)
    setObstaclesLeftTwo(screenWidth && screenWidth + screenWidth/2 + 30)
    setObstacleRanHeight(0)
    setObstacleRanHeightTwo(0)
    setScore(0)
  }

  function gameover() {
    setIsGameOver(true)
    // playSound()
    clearInterval(birdBottomTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
  }

  const backgroundImage = { uri: "https://i.ibb.co/V3Wj4Qp/fb-game-background.png" }
  const gameOverImg = { uri: "https://i.ibb.co/DWtMdvW/IMG-9355.jpg" }

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
          {isGameOver && <Image source={gameOverImg} style={styles.gameOver}></Image>}
          <ScoreBoard
            score={score/2} //account for 2 pixel grace
            isGameOver={isGameOver}
            restart={restart}
            player={player}
            setRenderGameplay={setRenderGameplay}
            setRenderLogin={setRenderLogin}
            currentDifficultyLvl={currentDifficultyLvl}
            setGameOver={setIsGameOver}
          />
          <Bird
            birdBottom={birdBottom}
            birdLeft={birdLeft}
          />
          <Obstacles
            obstacleHeight={obstacleHeight}
            obstacleWidth={obstacleWidth}
            randomHeight={obstacleRanHeight}
            screenHeight={screenHeight}
            gap={gap}
            obstaclesLeft={obstaclesLeft}
          />
          <Obstacles
            obstacleHeight={obstacleHeight}
            obstacleWidth={obstacleWidth}
            randomHeight={obstacleRanHeightTwo}
            screenHeight={screenHeight}
            gap={gap}
            obstaclesLeft={obstaclesLeftTwo}
          />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: screenWidth,
    height: screenHeight
  },
  gameOver: {
    width: 300,
    height: 80,
    resizeMode: 'cover',
    left: 55,
    bottom: -200,
    zIndex: 2,
    borderWidth: 2,
    borderRadius: 10
  }
})

export default Gameplay