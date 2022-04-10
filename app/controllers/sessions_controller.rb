class SessionsController < ApplicationController

    def create 
        player = Player.find_by(username: params[:username])
        if player&.authenticate(params[:password])
            session[:player_id] = player.id 
            render json: player, status: :created 
        elsif player
            render json: { error: "Invalid password" }, status: :unauthorized
        else 
            render json: { error: "Invalid email" }, status: :unauthorized
        end
    end

    def destroy 
        session.delete :player_id 
        head :no_content
    end

end

