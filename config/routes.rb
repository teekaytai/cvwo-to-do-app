Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'homepage#index'

  namespace :api do
    resources :todos
  end

  get '*path' => 'homepage#index'
end
