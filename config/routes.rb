Rails.application.routes.draw do
  root :to =>'users#sparkr'
  resources :users 
end
