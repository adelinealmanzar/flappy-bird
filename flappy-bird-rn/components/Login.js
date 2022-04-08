import React, { useState } from 'react'
import { Dimensions, TextInput, View, StyleSheet, Button, ImageBackground } from 'react-native'

const screenWidth = Dimensions.get("screen").width //get screen width on whichever mobile phone
const screenHeight = Dimensions.get("screen").height //get screen height on whichever mobile phone

function Login() {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const backgroundImage = { uri: "https://i.ibb.co/V3Wj4Qp/fb-game-background.png"}
    const birdImage = { uri: "https://i.ibb.co/PcCqNRP/flappy-bird.png" }
    function handleSubmit() {
        console.log(username, password)
    }

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
        <View style={styles.container}>
            <ImageBackground source={birdImage} resizeMode="stretch" style={styles.bird}>

            </ImageBackground>
            <TextInput
                style={styles.input}
                placeholder='Username'
                onChangeText={newUsername => setUsername(newUsername)}
                defaultValue={username}
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={newPassword => setPassword(newPassword)}
                defaultValue={password}
            />
            <Button title='Submit' onPress={() => handleSubmit()}/>
        </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        width: 100,
        marginBottom: 10,
        backgroundColor: '#ebfcdc'
    },
    background: {
        width: screenWidth,
        height: screenHeight
    },
    bird: {
        width: 50,
        height: 60,
        position: 'absolute',
        overflow: 'hidden',
        left: 70,
        bottom: screenHeight/2 + 100
    }
  })

export default Login