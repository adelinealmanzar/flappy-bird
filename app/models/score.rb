class Score < ApplicationRecord
    belongs_to :difficulty
    belongs_to :player

    validates :score, presence: true
end
