import React from 'react'
import { View, ImageBackground } from 'react-native'

function Obstacles({ obstacleWidth, obstacleHeight, randomHeight, gap, obstaclesLeft, screenHeight }) {
  const bottomPipeImg = { uri: "https://i.ibb.co/zfMYK93/flappybird-pipe.png" }
  const topPipeImg = { uri: "https://i.ibb.co/4VPnnpw/flappybird-pipe-top.png" }

  return (
    <>
        <View style={{
            position: 'absolute',
            backgroundColor: 'green',
            left: obstaclesLeft,
            bottom: randomHeight + obstacleHeight + gap,
        }}>
          <ImageBackground source={topPipeImg} resizeMode="stretch" style={{
            width: obstacleWidth,
            height: screenHeight/2
          }}></ImageBackground>
        </View>

        <View style={{
            position: 'absolute',
            backgroundColor: 'green',
            left: obstaclesLeft,
            bottom: randomHeight
        }}>
          <ImageBackground source={bottomPipeImg} resizeMode="stretch" style={{
          width: obstacleWidth,
          height: obstacleHeight
          }}></ImageBackground>
        </View>
    </>
  )
}

export default Obstacles