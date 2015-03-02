Rails.application.routes.draw do
  
  root :to => 'pages#home'

  resources :users
  resources :moments

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
  get '/users/:id/moments' => 'users#moment' 
  
end
