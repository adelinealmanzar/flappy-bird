import React from 'react'
import { ImageBackground } from 'react-native'

function Obstacles({ obstacleWidth, obstacleHeight, randomHeight, gap, obstaclesLeft, screenHeight }) {
  const bottomPipeImg = { uri: "https://i.ibb.co/zfMYK93/flappybird-pipe.png" }
  const topPipeImg = { uri: "https://i.ibb.co/4VPnnpw/flappybird-pipe-top.png" }

  return (
    <>
      <ImageBackground source={topPipeImg} resizeMode="stretch" style={{
          width: obstacleWidth,
          height: screenHeight/2,
          position: 'absolute',
          backgroundColor: 'green',
          left: obstaclesLeft,
          bottom: randomHeight + obstacleHeight + gap,
      }}></ImageBackground>
      <ImageBackground source={bottomPipeImg} resizeMode="stretch" style={{
        width: obstacleWidth,
        height: obstacleHeight,
        position: 'absolute',
        backgroundColor: 'green',
        left: obstaclesLeft,
        bottom: randomHeight
      }}></ImageBackground>
    </>
  )
}

export default Obstacles