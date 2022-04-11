puts 'seeding! 🌱🌱🌱'

Player.delete_all
Difficulty.delete_all
Score.delete_all

player1 = Player.create!(username: 'flyguy', password: '0', password_confirmation: '0')
player2 = Player.create!(username: 'amazonian', password: '0', password_confirmation: '0')
player3 = Player.create!(username: 'peanut', password: '0', password_confirmation: '0')

difficulty1 = Difficulty.create(difficulty: 'easy')
difficulty2 = Difficulty.create(difficulty: 'medium')
difficulty3 = Difficulty.create(difficulty: 'hard')

 #victory is based on whether they got a higher score than opponent, null when solo
score1 = Score.create(score: 10, difficulty_id: difficulty1.id, player_id: player1.id)
score2 = Score.create(score: 9, difficulty_id: difficulty2.id, player_id: player1.id)
score3 = Score.create(score: 5, difficulty_id: difficulty3.id, player_id: player1.id)

puts 'done seeding! 🌱🌱🌱'