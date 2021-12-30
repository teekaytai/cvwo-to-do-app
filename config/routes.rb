Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'homepage#index'

  namespace :api do
    get 'todos/index'
    post 'todos/create'
    get 'todos/show', to: 'todos#show'
    delete 'todos/destroy', to: 'todos#destroy'
  end

  get '*path' => 'homepage#index'
end
