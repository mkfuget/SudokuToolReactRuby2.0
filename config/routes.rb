Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :puzzletypes, param: :slug
      resources :puzzles, param: :slug
    end
  end

  get '*path', to: 'pages#index', via: :all
end
