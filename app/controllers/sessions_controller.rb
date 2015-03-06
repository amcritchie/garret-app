class SessionsController < ApplicationController
  skip_before_filter :ensure_authenticated_user

  def new
    @user = User.new
  end

  def create
    p '____+___' * 90
    @user = User.find_by(email: params[:user][:email].downcase)
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      p '___!_' *80
      p @user.admin
      if @user.admin
        redirect_to admin_path
      else
        redirect_to root_path
      end
    else
      render :new
    end
  end

  def authenticate
    @user = User.find_by(email: params[:email].downcase)
    respond_to do |format|
      if @user && @user.authenticate(params[:password])
        session[:user_id] = @user.id
        format.json { render json: @user }
      else
        format.json { render json: {error: "Username / password is invalid."} }
      end
    end
  end


  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end