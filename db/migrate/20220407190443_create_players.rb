class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.string :username
      t.string :password
      t.string :password_confirmation

      t.timestamps
    end
  end
end
