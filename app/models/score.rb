class Score < ApplicationRecord
    belongs_to :difficulty

    validates :score, presence: true
end
