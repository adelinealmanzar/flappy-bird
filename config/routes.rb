Rails.application.routes.draw do
  
  resources :scores, only: [:show, :index, :create]
  # resources :difficulties, only: [:show, :index]
  resources :players, only: [:show, :index, :create]

  post '/login', to: 'sessions#create'
  get '/me', to: 'players#show'
  delete '/logout', to: 'sessions#destroy'
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
