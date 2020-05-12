Rails.application.routes.draw do
  get 'pages/home'
  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :show]
    end
  end
end
