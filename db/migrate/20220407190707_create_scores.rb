class CreateScores < ActiveRecord::Migration[6.1]
  def change
    create_table :scores do |t|
      t.integer :score
      t.boolean :victory
      t.integer :difficulty_id

      t.timestamps
    end
  end
end
