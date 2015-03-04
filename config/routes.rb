Rails.application.routes.draw do
  resources :users do
    # resources :restaurants
    # post 'restaurants/new' => 'restaurants#create'
  end

  resources :restaurants
  post 'restaurants/new' => 'restaurants#create'

  post 'questions/new' => 'questions#create'
  post 'questions/destroy' => 'questions#destroy'

  resources :departments, only: [:create, :destroy, :index]
  resources :keys, only: [:create, :destroy, :index]

  resources :standards, only: [:create, :destroy, :index]

  resources :evaluations

  post 'evaluations/apply' => 'evaluation_applications#apply'
  post 'application/approve' => 'evaluation_applications#approve'
  post 'application/deny' => 'evaluation_applications#deny'

  post 'application/get_score' => 'evaluation_applications#get_score'
  post 'application/update_score' => 'evaluation_applications#update_score'
  post 'application/submit' => 'evaluation_applications#submit'

  # post 'restaurants/new' => 'restaurants#create'

  root 'home#index'

  get "login" => "sessions#new", as: :login
  post "login" => "sessions#create"
  post "authenticate" => "sessions#authenticate"
  post "unique_email" => "users#unique_email"
  delete "logout" => "sessions#destroy", as: :logout

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
