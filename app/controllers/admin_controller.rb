class AdminController < ApplicationController
  skip_before_filter :ensure_authenticated_user

  def home

    @all_questions = Question.all


    @departments = Department.all
    @keys = Key.all
    @questions = Question.all

    @restaurants = Restaurant.all
    @standards = Standard.all
    @evaluation = Evaluation.new

    # @new_evaluations = Evaluation.where(status: 'open')
    @pending_evaluations =  EvaluationApplication.where(status: 'pending').order(:created_at)
    @submitted_evaluations = EvaluationApplication.where(status: 'submitted').order(:created_at)
    @completed_evaluations = EvaluationApplication.where(status: 'complete').order(:created_at)
    @open_evaluations =  EvaluationApplication.where(status: 'open').order(:created_at)

    @denied_evaluations =  EvaluationApplication.where(status: 'denied').order(:created_at)
    @open_evaluationss = Evaluation.where(status: 'open').order(:created_at)
    @submitted_evaluationss = Evaluation.where(status: 'submitted').order(:created_at)
    @completed_evaluationss = Evaluation.where(status: 'completed').order(:created_at)

    @all_users = User.all


  end

  def restaurants
    @restaurants = Restaurant.all
  end

  def evaluations
    @pending_evaluations =  EvaluationApplication.where(status: 'pending').order(:created_at)
    @completed_evaluations = EvaluationApplication.where(status: 'submitted').order(:created_at)
    @open_evaluations =  EvaluationApplication.where(status: 'open').order(:created_at)  end

  def users
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