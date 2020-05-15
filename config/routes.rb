Rails.application.routes.draw do
  root 'static_pages#home'
  get '/', to: 'static_pages#home'
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get '/tasks', to: 'tasks#show'
  post '/tasks',  to: 'tasks#delete'
  get '/tasks/add-task', to: 'tasks#add'
  post '/tasks/add-task', to: 'tasks#create'

  post '/tasks/edit-task', to: 'tasks#edit'
  post '/tasks/edit-id', to: 'tasks#edit_id'
  get 'tasks/edit', to: 'tasks#edit_view'

  get '/tasks/add-list', to: 'tasks#add_list'
  post '/tasks/add-list', to: 'tasks#create_list'
  post '/tasks/delete-list', to: 'tasks#delete_list'
  get '*unmatched_route', to: 'static_pages#error'
 
  
end
