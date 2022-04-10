import React, { useState } from 'react'
import { Dimensions, TextInput, StyleSheet, Button, ImageBackground } from 'react-native'

const screenWidth = Dimensions.get("screen").width //get screen width on whichever mobile phone
const screenHeight = Dimensions.get("screen").height //get screen height on whichever mobile phone

function Login({ setPlayer }) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [renderSignup, setRenderSignup] = useState(true)

    const backgroundImage = { uri: "https://i.ibb.co/V3Wj4Qp/fb-game-background.png"}
    const birdImage = { uri: "https://i.ibb.co/PcCqNRP/flappy-bird.png" }

    function handleLoginSubmit() {
        console.log(username, password)
        const playerObj = { username, password }
        submitFetch(playerObj, '/login')
    }

    function handleSignupSubmit() {
        const playerObj = { username, password, password_confirmation: passwordConfirm}
        submitFetch(playerObj, '/players')
    }

    function submitFetch(playerObj, routeString) {
        //TODO: fix both login and signup seem to not be working/posting to backend
        fetch(routeString, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(playerObj),
          })
        .then(r => {
            if (r.ok) {
                r.json().then((authedPlayer) => setPlayer(authedPlayer))
            } else {
                // r.json().then(data => setErrorMsg(() => data[routeString === '/login' ? 'error' : 'errors']))
                // setShowErrorMsg(true)
                // setPassword("")
                console.log('TODO: render error messages here')
            }
        })
    }

    const titleImage = { uri: "https://i.ibb.co/QH6KmKR/flappybirdy-regular.png"}
  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
        <ImageBackground source={birdImage} resizeMode="stretch" style={styles.bird} />
        <ImageBackground source={titleImage} resizeMode="stretch" style={styles.title} />
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
        {renderSignup && <TextInput
            style={styles.input}
            placeholder='Password Confirmation'
            secureTextEntry={true}
            onChangeText={newPasswordConfirm => setPasswordConfirm(newPasswordConfirm)}
            defaultValue={passwordConfirm}
        />}
        {renderSignup ? <Button title='Submit' onPress={() => handleSignupSubmit()}/> : <Button title='Submit' onPress={() => handleLoginSubmit()}/>}
        {renderSignup ? <Button title="Already have an account? Signin!" onPress={() => setRenderSignup(false)}/> : <Button title="Don't have an account yet? Signup!" onPress={() => setRenderSignup(true)}/>}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    input: {
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        width: 200,
        marginBottom: 10,
        backgroundColor: '#ebfcdc',
        justifyContent: 'center'
    },
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

export default Login