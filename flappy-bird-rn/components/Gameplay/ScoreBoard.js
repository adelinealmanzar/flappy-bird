import React from 'react'
import { Modal, Text, StyleSheet, View, Pressable, Image } from 'react-native'

function ScoreBoard({ score, modalVisible, restart, player, setRenderGameplay }) {
  const sortedScores = player?.scores.sort((a, b) => b.score - a.score)

  function renderDifficulty(difficultyNum) {
    switch(difficultyNum) {
      case 1:
        return "EASY"
      case 2:
        return "MEDIUM"
      case 3:
        return "HARD"
    }
  }

  const gameOverImg = { uri: "https://i.ibb.co/BnWhHYB/gameover-text.jpg" }

  return (
    <>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setRenderGameplay(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Image source={gameOverImg} styles={styles.gameOver} /> */}
            <Text style={styles.scoreText}>Score: {score}</Text>
            <View>
              <Text style={styles.highscoresText}>Previous High Scores</Text>
              {sortedScores.map( playthrough => <Text style={styles.modalText} key={playthrough.id}>|  {renderDifficulty(playthrough.difficulty_id)}  |   {playthrough.score}</Text>)}
            </View>
            <Pressable
              style={styles.restartButton}
              onPress={() => restart()}
            >
              <Text style={styles.textStyle}>Restart</Text>
            </Pressable>
            <Pressable
              style={styles.chooseButton}
              onPress={() => setRenderGameplay(false)} //render homepage
            >
              <Text style={styles.textStyle}>Choose Level</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      backgroundColor: "#e9fcde",
      borderRadius: 10,
      padding: 35,
      width: 340,
      // height: 400,
      bottom: -60,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderStyle: 'solid',
      borderWidth: 2
    },
    restartButton: {
      borderRadius: 20,
      padding: 15,
      elevation: 2,
      marginTop: 15,
      backgroundColor: "black"
    },
    chooseButton: {
      borderRadius: 20,
      padding: 15,
      elevation: 2,
      marginTop: 15,
      backgroundColor: "#84d444"
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
      color: "black"
    },
    scoreText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
      color: "black",
      fontSize: 40
    },
    highscoresText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
      color: "black",
      fontSize: 20
    },
    gameOver: {
      width: 20,
      height: 50,
      resizeMode: 'stretch'
    }
})

export default ScoreBoard