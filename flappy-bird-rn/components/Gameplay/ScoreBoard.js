import React, { useEffect, useState } from 'react'
import { Modal, Text, StyleSheet, View, Pressable } from 'react-native'

function ScoreBoard({ score, isGameOver, restart, player, setRenderGameplay, setRenderLogin, currentDifficultyLvl }) {
  const [renderScores, setRenderScores] = useState(null)

  useEffect(() => {
    const scoreObj = {
      score: score,
      difficulty_id: currentDifficultyLvl,
      player_id: player.id
    }
    
    if (isGameOver) {
      console.log('gameOver')
      fetch(`https://cryptic-headland-19872.herokuapp.com/scores`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scoreObj),
      })
      .then(r => r.json())
      .then((newScorePlaythrough) => {
        const sortedScores = [...player.scores, newScorePlaythrough].sort((a, b) => b.score - a.score).slice(0, 3)
        setRenderScores(sortedScores)
      })
    }
  }, [isGameOver])

  function testRenderScores() {
    
  }

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

  function handleChooseLevel() {
    setRenderGameplay(false) //render homepage
    setRenderLogin(false) //render start page
  }

  return (
    <>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isGameOver}
        onRequestClose={() => setRenderGameplay(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Image source={gameOverImg} styles={styles.gameOver} /> */}
            <Text style={styles.scoreText}>Score: {score}</Text>
            <View>
              <Text style={styles.highscoresText}>Previous High Scores</Text>
              {renderScores?.map( playthrough => <Text style={styles.modalText} key={playthrough.id}>|  {renderDifficulty(playthrough.difficulty_id)}  |   {playthrough.score}</Text>)}
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={styles.restartButton}
                onPress={() => restart()}
              >
                <Text style={styles.textStyle}>Restart</Text>
              </Pressable>
              <Pressable
                style={styles.chooseButton}
                onPress={() => handleChooseLevel()}
              >
                <Text style={styles.textStyle}>Choose Level</Text>
              </Pressable>
            </View>
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
      paddingRight: 15,
      elevation: 2,
      marginTop: 15,
      backgroundColor: "#84d444",
      borderStyle: 'solid',
      borderWidth: 2
    },
    chooseButton: {
      borderRadius: 20,
      padding: 15,
      marginTop: 15,
      marginLeft: 15,
      backgroundColor: "#d3bb25",
      borderStyle: 'solid',
      borderWidth: 2
    },
    buttons: {
      flexDirection: 'row'
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
    }
})

export default ScoreBoard