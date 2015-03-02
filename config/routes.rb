Rails.application.routes.draw do
  
  root :to => 'pages#home'

  resources :users

  get '/users/:id/match' => 'users#match', as: :match

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
  
end
