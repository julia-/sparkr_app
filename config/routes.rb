Rails.application.routes.draw do
  root :to => 'pages#home'
  
  resources :users
  resources :locations
  resources :moments
  resources :likes, only: [:create]


  # get '/users/:id/match' => 'users#match', as: :match

  get '/login' => 'session#new'
  post '/login' => 'session#create'

  resources :conversations do
    resources :messages
  end

  get '/users/momentshow' => 'users#momentshow', as: :momentshow
  get '/users/:id/match' => 'users#match', as: :match
  post '/users/update_profile_pic' => 'users#update_profile_pic'
  get '/messages' => 'pages#messaging_index'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/logout' => 'session#destroy'

  match 'auth/:provider/callback', to: 'session#create_fb', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'session#destroy', as: 'signout', via: [:get, :post]

end
