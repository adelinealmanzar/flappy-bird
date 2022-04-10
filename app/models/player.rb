class Player < ApplicationRecord
    has_secure_password
    
    has_many :difficulties
    has_many :scores, through: :difficulties

    validates :username, presence: true
    validates :password, presence: true
    validates :password_confirmation, presence: true
end
