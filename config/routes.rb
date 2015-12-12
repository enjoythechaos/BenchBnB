Rails.application.routes.draw do
  root to: "static_pages#root"
  
  namespace :api, defaults: {format: :json} do
    resources :benches, only: [:index, :create]
  end
end

# Rails.application.routes.draw do
#  namespace :api, defaults: { format: :json } do
#    resources :guests, only: [:show, :index] do
#      resources :gifts, only: :index
#    end
#    resources :gifts, only: :show
#    resources :parties, only: [:show, :index]
#  end
# end
