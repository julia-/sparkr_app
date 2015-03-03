Rails.application.routes.draw do
  
  root :to => 'pages#home'

  resources :users
  resources :moments

  get '/users/:id/match' => 'users#match', as: :match

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
  get '/messages' => 'pages#messaging_index'

  resources :conversations do
    resources :messages
  end
  
end
