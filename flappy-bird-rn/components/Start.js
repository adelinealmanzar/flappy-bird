import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

function Start({ setRenderGameplay, setLevelMS }) {

    function handlePress(levelMSBtn) {
        setLevelMS(levelMSBtn)
        setRenderGameplay(true)
    }

  return (
    <>
        <Text style={styles.headerStyle}>SELECT LEVEL</Text>
        <View style={styles.view}>
            <Pressable
                style={styles.button}
                onPress={() => handlePress(45)}
            >
                <Text style={styles.textStyle}>EASY</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => handlePress(30)}
            >
                <Text style={styles.textStyle}>MEDIUM</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => handlePress(15)}
            >
                <Text style={styles.textStyle}>HARD</Text>
            </Pressable>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    button: {
      borderRadius: 20,
      padding: 15,
      elevation: 2,
      margin: 10,
      width: 150,
      backgroundColor: "red"
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    headerStyle: {
        marginBottom: 5,
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        fontSize: 23,
        padding: 10
    },
    view: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10
    }
})
export default Start