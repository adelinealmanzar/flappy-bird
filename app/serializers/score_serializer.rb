class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :score, :victory, :difficulty_id, :player_id
end
