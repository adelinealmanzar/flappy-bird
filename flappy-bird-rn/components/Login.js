import React, { useState } from 'react'
import { TextInput, StyleSheet, Button } from 'react-native'

function Login({ setPlayer, setRenderLogin }) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [renderSignup, setRenderSignup] = useState(true)

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
                r.json().then((authedPlayer) => {
                    setPlayer(authedPlayer)
                    setRenderLogin(false) //display start screen on successful response
                })
            } else {
                // r.json().then(data => setErrorMsg(() => data[routeString === '/login' ? 'error' : 'errors']))
                // setShowErrorMsg(true)
                // setPassword("")
                console.log('TODO: render error messages here')
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