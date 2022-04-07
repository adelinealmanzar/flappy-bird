class PlayersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_res
	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_res

    def index
        players = Player.all
        render json: players
    end
    
    def show
        player = Player.find(params[:id])
        render json: player
    end
        
    def create
        player = Player.create!(player_params)
        render json: player, status: :created
    end

    private

    def player_params
        params.permit(:username, :password)
    end

    def render_not_found_res
        render json: { error: "Player not found" }, status: :not_found
    end

    def render_unprocessable_entity_res(invalid)
		render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
	end
end
