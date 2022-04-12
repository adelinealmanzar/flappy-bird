class RemovePlayerFromDifficulties < ActiveRecord::Migration[6.1]
  def change
    remove_column(:difficulties, :player_id)
  end
end
