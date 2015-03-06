class AdminController < ApplicationController
  skip_before_filter :ensure_authenticated_user

  def home
    @departments = Department.all
    @keys = Key.all
    @questions = Question.all

    @restaurants = Restaurant.all
    @standards = Standard.all
    @evaluation = Evaluation.new

    # @new_evaluations = Evaluation.where(status: 'open')
    @pending_evaluations =  EvaluationApplication.where(status: 'pending')
    @completed_evaluations = EvaluationApplication.where(status: 'submitted')
    @open_evaluations =  EvaluationApplication.where(status: 'open')

    @denied_evaluations =  EvaluationApplication.where(status: 'denied')
    @open_evaluationss = Evaluation.where(status: 'open')

    @all_users = User.all


  end

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