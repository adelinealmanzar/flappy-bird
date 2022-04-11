class AddPlayerToScores < ActiveRecord::Migration[6.1]
  def change
    add_column(:scores, :player_id, :integer)
  end
end
