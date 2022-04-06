import React from 'react'
import { View } from 'react-native'

function Obstacles({ color, obstacleWidth, obstacleHeight, randomHeight, gap, obstaclesLeft }) {

  return (
    <>
        <View style={{
            position: 'absolute',
            backgroundColor: color,
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstaclesLeft,
            bottom: randomHeight + obstacleHeight + gap
        }}/>

        <View style={{
            position: 'absolute',
            backgroundColor: color,
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstaclesLeft,
            bottom: randomHeight
        }}/>
    </>
  )
}

export default Obstacles