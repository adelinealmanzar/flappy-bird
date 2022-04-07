import React from 'react'
import { View, ImageBackground } from 'react-native'

function Bird({ birdBottom, birdLeft }) {
  const birdWidth = 50
  const birdHeight = 60

  const image = { uri: "https://i.ibb.co/PcCqNRP/flappy-bird.png" }

  return (
    <View style={{
        position: 'absolute',
        overflow: 'hidden',
        bottom: birdBottom - (birdHeight/2),
        left: birdLeft - (birdWidth/2) //center point from the left
    }}>
      <ImageBackground source={image} resizeMode="stretch" style={{
        width: birdWidth,
        height: birdHeight
      }}></ImageBackground>
    </View>
  )
}

export default Bird