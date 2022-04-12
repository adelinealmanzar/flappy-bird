class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest

  has_many :scores
end
