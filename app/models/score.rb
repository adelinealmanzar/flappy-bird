class Score < ApplicationRecord
    belongs_to :difficulty
    belongs_to :players

    validates :score, presence: true
end
