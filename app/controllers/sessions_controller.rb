class SessionsController < ApplicationController
  skip_before_filter :ensure_authenticated_user

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(email: params[:user][:email].downcase)
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      if @user.admin
        redirect_to admin_path
      else
        redirect_to root_path
      end
    else
      @restaurant = Restaurant.find_by(email: params[:user][:email].downcase)
      if @restaurant && @restaurant.authenticate(params[:user][:password])
        session[:user_id] = @restaurant.id
        redirect_to root_path
      else
        render :new
      end
    end
  end

  def authenticate
    @user = User.find_by(email: params[:email].downcase)
    respond_to do |format|
      if @user && @user.authenticate(params[:password])
        session[:user_id] = @user.id
        session[:user_type] = 'user'
        format.json { render json: @user }
      else
        @restaurant = Restaurant.find_by(email: params[:email].downcase)
        if @restaurant && @restaurant.authenticate(params[:password])
          session[:user_id] = @restaurant.id
          session[:user_type] = 'restaurant'
          format.json { render json: @restaurant }
        else
          format.json { render json: {error: "Username / password is invalid."} }
        end
      end
    end
  end


  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end