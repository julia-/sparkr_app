Rails.application.routes.draw do

  root :to => 'pages#home'

  resources :users
  resources :moments

  get '/users/:id/match' => 'users#match', as: :match

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/logout' => 'session#destroy'

  match 'auth/:provider/callback', to: 'session#create_fb', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'session#destroy', as: 'signout', via: [:get, :post]
  
end
