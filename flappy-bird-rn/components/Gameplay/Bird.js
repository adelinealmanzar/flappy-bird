import React from 'react'
import { ImageBackground } from 'react-native'

function Bird({ birdBottom, birdLeft }) {
  const birdWidth = 50
  const birdHeight = 60

  const image = { uri: "https://i.ibb.co/PcCqNRP/flappy-bird.png" }

  return (
    <ImageBackground source={image} resizeMode="stretch" style={{
        width: birdWidth,
        height: birdHeight,
        position: 'absolute',
        overflow: 'hidden',
        bottom: birdBottom - (birdHeight/2),
        left: birdLeft - (birdWidth/2) //center point from the left
    }}></ImageBackground>
  )
}

export default Bird