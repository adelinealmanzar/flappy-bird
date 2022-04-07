import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import Bird from './components/Bird'
import Obstacles from './components/Obstacles'
import ScoreBoard from './components/ScoreBoard'

const screenWidth = Dimensions.get("screen").width //get screen width on whichever mobile phone
const screenHeight = Dimensions.get("screen").height //get screen height on whichever mobile phone

function App() {
  const [ birdBottom, setBirdBottom ] = useState(screenHeight && screenHeight / 2) // bird will move only up and down with us manipulating the bottom position on screen (starting at middle of screen)
  const [ score, setScore ] = useState(0)
  const [ obstaclesLeft, setObstaclesLeft ] = useState(screenWidth && screenWidth)
  const [ obstaclesLeftTwo, setObstaclesLeftTwo ] = useState(screenWidth && screenWidth + screenWidth/2 + 30)
  const [ obstacleRanHeight, setObstacleRanHeight ] = useState(0)
  const [ obstacleRanHeightTwo, setObstacleRanHeightTwo ] = useState(0)
  const [ isGameOver, setIsGameOver ] = useState(false)
  const [ modalVisible, setModalVisible ] = useState(false)

  const birdLeft = screenWidth / 2 //point at the bottom left of our bird view/div
  const gravity = 3
  let birdBottomTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo

  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200


  //make bird fall with gravity
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
      }, 30) //speed of obstacle movement (for future difficulty)

      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    } else {
      //when obstacle goes off the screen
      setObstaclesLeft(screenWidth) //loop obstacle by restarting on left of screen
      setScore(score => score + 1)
      setObstacleRanHeight(0 - Math.random() * 100)
    }
  }, [obstaclesLeft])

  //move second obstacle to the left
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30) //speed of obstacle movements (for difficulty)

      return () => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } else {
      //when obstacle goes off the screen
      setObstaclesLeftTwo(screenWidth) //loop obstacle
      setScore(score => score + 1)
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

  function restart() {
    // set all states back to default values
    setIsGameOver(false)
    setModalVisible(false)
    setBirdBottom(screenHeight && screenHeight / 2)
    setObstaclesLeft(screenWidth && screenWidth)
    setObstaclesLeftTwo(screenWidth && screenWidth + screenWidth/2 + 30)
    setObstacleRanHeight(0)
    setObstacleRanHeightTwo(0)
    setScore(0)
  }

  /* //LEFT OFF\\
    - fix score (shows 0 even though 1 obstacle passed) for both initial gameplay and restart
      - currently score changes when obstacle leaves screen
    - add collision logic to corner of obstacles (other side of obstacle left, so might be obstacle left + obstacle width)
    - add css/styling to game
  */

  function gameover() {
    setIsGameOver(true)
    setModalVisible(true)
    clearInterval(birdBottomTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
  }

  function jump() {
    if (!isGameOver && (birdBottom < screenHeight)){
      setBirdBottom(birdBottom => birdBottom + 50)
    }
  }

  const backgroundImage = { uri: "https://i.ibb.co/V3Wj4Qp/fb-game-background.png" }

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
          <ScoreBoard score={score} modalVisible={modalVisible} restart={restart}/>
          <Bird
            birdBottom={birdBottom}
            birdLeft={birdLeft}
          />
          <View style={styles.top}></View>
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
  top: {
    backgroundColor: 'blue'
  },
  background: {
    width: screenWidth,
    height: screenHeight
  }
})

export default App