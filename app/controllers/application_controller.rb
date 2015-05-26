class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    if session[:user_type] == 'restaurant'
      Restaurant.find_by(id: session[:user_id])
    else
      User.find_by(id: session[:user_id])
    end
  end

  def render_404
    render file: "#{Rails.root}/app/views/404.html", layout: true, status: 404
  end

  helper_method :current_user

end
