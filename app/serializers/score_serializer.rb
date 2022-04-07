class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :score, :victory, :difficulty_id
end
