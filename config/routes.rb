Rails.application.routes.draw do

  root 'home#index'

  # Must be before resources :users so get /users directs to admin
  get '/admin' => 'admin#home'
  get '/admin/restaurants' => 'admin#restaurants'
  get '/admin/evaluations' => 'admin#evaluations'
  get '/admin/users' => 'admin#users'
  get '/users/application' => 'users#application'
  get '/users/:id/confirm_email' => 'users#confirm_email'
  get '/users/:id/accept_application' => 'users#accept_application'
  post '/users/activate_user' => 'users#activate_user'
  post '/users/deactivate_user' => 'users#deactivate_user'
  get '/users/:id/decline_application' => 'users#decline_application'

  resources :users do
    # resources :restaurants
    # post 'restaurants/new' => 'restaurants#create'
  end

  get "login" => "sessions#new", as: :login
  get "request_password_reset" => "users#request_password_reset"
  post "request_password_reset" => "users#send_password_reset"
  post "login" => "sessions#create"
  post "authenticate" => "sessions#authenticate"
  post "unique_email" => "users#unique_email"
  delete "logout" => "sessions#destroy", as: :logout


  resources :restaurants
  post 'restaurants/new' => 'restaurants#create'

  post 'questions/new' => 'questions#create'
  post 'questions/destroy' => 'questions#destroy'

  resources :departments, only: [:create, :destroy, :index]
  resources :keys, only: [:create, :destroy, :index]

  resources :standards, only: [:create, :destroy, :index, :update]

  resources :evaluations
  get 'evaluations/:id/assign_to/:user_id' => 'evaluations#assign_user'
  get 'evaluations/:id/decline/:user_id' => 'evaluations#decline_user'

  get 'restaurant/:id' => 'restaurants#show'
  get 'admin/restaurant/:id' => 'restaurants#show_info'

  # Needed for admin load and restaurant page load.
  post 'restaurant/get_info' => 'restaurants#get_info'
  post '/get_info' => 'restaurants#get_info'

  get 'restaurant/:id/action_plan/:application_id' => 'restaurants#action_plan'
  post 'restaurant/:id/action_plan/get_info' => 'restaurants#get_info'



  get 'applications/:id' => 'evaluation_applications#show'
  post 'applications/get_info' => 'evaluation_applications#get_info'

  post 'evaluations/apply' => 'evaluation_applications#apply'
  post 'application/approve' => 'evaluation_applications#approve'
  post 'application/deny' => 'evaluation_applications#deny'

  post 'application/get_score' => 'evaluation_applications#get_score'
  post 'application/update_score' => 'evaluation_applications#update_score'
  post 'application/submit' => 'evaluation_applications#submit'

  post 'application/accept' => 'evaluation_applications#accept'
  post 'application/reopen' => 'evaluation_applications#reopen'

  # post 'restaurants/new' => 'restaurants#create'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
