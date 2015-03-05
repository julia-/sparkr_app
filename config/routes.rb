Rails.application.routes.draw do

  resources :locations

  root :to => 'pages#home'

  get '/users/momentshow' => 'users#momentshow', as: :momentshow
  resources :users
  
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/logout' => 'session#destroy'

  match 'auth/:provider/callback', to: 'session#create_fb', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'session#destroy', as: 'signout', via: [:get, :post]
  
  resources :locations
  resources :moments
  resources :likes, only: [:create]

  get '/users/:id/match' => 'users#match', as: :match

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  get '/messages' => 'pages#messaging_index'

  resources :conversations do
    resources :messages
  end

  delete '/logout' => 'session#destroy'

  match 'auth/:provider/callback', to: 'session#create_fb', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'session#destroy', as: 'signout', via: [:get, :post]
  
  post '/users/update_profile_pic' => 'users#update_profile_pic'


end
