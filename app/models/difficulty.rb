class Difficulty < ApplicationRecord
    has_many :scores
    belongs_to :player
end
