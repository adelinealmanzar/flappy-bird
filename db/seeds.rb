puts 'seeding! 🌱🌱🌱'

player1 = Player.create(username: 'flyguy', password: '0')
player2 = Player.create(username: 'amazonian', password: '0')
player3 = Player.create(username: 'peanut', password: '0')

difficulty1 = Difficulty.create(difficulty: 'easy', player_id: player1.id)
difficulty2 = Difficulty.create(difficulty: 'medium', player_id: player1.id)
difficulty3 = Difficulty.create(difficulty: 'hard', player_id: player1.id)

 #victory is based on whether they got a higher score than opponent, null when solo
score1 = Score.create(score: 10, difficulty_id: difficulty1.id)
score2 = Score.create(score: 10, difficulty_id: difficulty2.id)
score3 = Score.create(score: 10, difficulty_id: difficulty3.id)

puts 'done seeding! 🌱🌱🌱'