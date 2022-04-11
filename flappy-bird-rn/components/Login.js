import React, { useState } from 'react'
import { TextInput, StyleSheet, Button, Text } from 'react-native'

function Login({ setPlayer, setRenderLogin }) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [renderSignup, setRenderSignup] = useState(true)
    const [errorMsgs, setErrorMsgs] = useState(null)

    function handleLoginSubmit() {
        const playerObj = { username, password }
        submitFetch(playerObj, 'https://stark-bayou-42970.herokuapp.com/login')
    }

    function handleSignupSubmit() {
        const playerObj = { username, password, password_confirmation: passwordConfirm}
        submitFetch(playerObj, 'https://stark-bayou-42970.herokuapp.com/players')
    }

    function submitFetch(playerObj, routeString) {
        fetch(routeString, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(playerObj),
          })
        .then(r => {
            if (r.ok) {
                r.json().then((authedPlayer) => {
                    setPlayer(authedPlayer)
                    setRenderLogin(false) //display start screen on successful response
                })
            } else {
                r.json().then(errors => {
                    errors.error && setErrorMsgs([errors.error])
                    errors.errors && setErrorMsgs(errors.errors)
                })
                setPassword("")
            }
        })
    }

  return (
    <>
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
        {errorMsgs && errorMsgs?.map(error => <Text key={errorMsgs.indexOf(error)}>{error}</Text>)}
        {renderSignup ?
            <Button
                title='Submit'
                onPress={() => handleSignupSubmit()}
                // style={styles.linkButtons}
            />
            : <Button
                title='Submit'
                onPress={() => handleLoginSubmit()}
                // style={styles.linkButtons}
            />
        }
        {renderSignup ?
            <Button
                title="Already have an account? Signin!"
                onPress={() => setRenderSignup(false)}
                // style={styles.linkButtons}
            />
            :
            <Button
                title="Don't have an account yet? Signup!"
                onPress={() => setRenderSignup(true)}
                // style={styles.linkButtons}
            />
        }
    </>
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
        backgroundColor: '#e9fcde',
        justifyContent: 'center'
    }
    // linkButtons: {
    //     color: 'black',
    //     backgroundColor: 'white'
    // }
  })

export default Login