class CreateDifficulties < ActiveRecord::Migration[6.1]
  def change
    create_table :difficulties do |t|
      t.string :difficulty
      t.integer :player_id

      t.timestamps
    end
  end
end
