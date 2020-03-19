Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "groups#index"
  
  resources :users, only: [:index, :edit, :update]
  resources :messages, only: [:destroy]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create, :edit, :update]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end

end
 