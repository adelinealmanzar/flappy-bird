class ScoresController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_res
	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_res
    before_action :authorize

    def index
        scores = Score.all
        render json: scores
    end
    
    def show
        score = Score.find(params[:id])
        render json: score
    end
        
    def create
        score = Score.create!(score_params)
        render json: score, status: :created
    end

    private

    def score_params
        params.permit(:score, :victory, :difficulty_id, :player_id)
    end

    def render_not_found_res
        render json: { error: "Score not found" }, status: :not_found
    end

    def render_unprocessable_entity_res(invalid)
		render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
	end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :player_id #may need to be difficulty_id
    end
end
