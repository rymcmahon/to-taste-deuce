Rails.application.routes.draw do
  resources :recipes

  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :show]
    end
  end
end
