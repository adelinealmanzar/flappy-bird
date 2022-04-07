Rails.application.routes.draw do
  
  resources :scores, only: [:show, :index, :create]
  # resources :difficulties, only: [:show, :index]
  resources :players, only: [:show, :index, :create]
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
