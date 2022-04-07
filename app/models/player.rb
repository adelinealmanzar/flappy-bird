class Player < ApplicationRecord
    has_many :difficulties
    has_many :scores, through: :difficulties

    # has_secure_password

    validates :username, presence: true
    validates :password, presence: true
end
