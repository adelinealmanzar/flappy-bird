class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :username, :password

  has_many :scores
end
