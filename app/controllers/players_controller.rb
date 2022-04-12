class PlayersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_res
	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_res

    def index
        players = Player.all
        render json: players
    end
    
    def show
        player = Player.find_by(id: session[:player_id])
        if player
            render json: player
        else
            render json: { error: "Player not authorized" }, status: :unauthorized
        end
        
    end
        
    def create
        player = Player.create!(player_params) #may need to add if player.valid? conditional
        render json: player, status: :created
    end

    private

    def player_params
        params.permit(:username, :password, :password_confirmation)
    end

    def render_not_found_res
        render json: { error: "Player not found" }, status: :not_found
    end

    def render_unprocessable_entity_res(invalid)
		render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
	end
end
