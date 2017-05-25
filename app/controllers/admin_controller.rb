class AdminController < ApplicationController
  skip_before_filter :ensure_authenticated_user

  def home
    return redirect_to :root if current_user.nil?
    if current_user && current_user.admin
      @all_questions = Question.all

      @departments = Department.all
      @keys = Key.all
      @questions = Question.all

      @restaurants = Restaurant.all
      @standards = Standard.all
      @evaluation = Evaluation.new

      # @new_evaluations = Evaluation.where(status: 'open')
      @pending_evaluations = EvaluationApplication.where(status: 'pending').order(:created_at)
      @submitted_evaluations = EvaluationApplication.where(status: 'submitted').order(:created_at)
      @completed_evaluations = EvaluationApplication.where(status: 'complete').order(:created_at)
      @open_evaluations = EvaluationApplication.where(status: 'open').order(:created_at)

      @denied_evaluations = EvaluationApplication.where(status: 'denied').order(:created_at)
      @open_evaluationss = Evaluation.where(status: 'open').order(:created_at)
      @submitted_evaluationss = Evaluation.where(status: 'submitted').order(:created_at)
      @completed_evaluationss = Evaluation.where(status: 'completed').order(:created_at)

      @all_users = User.all
    else
      render_404
    end
  end

  def restaurants
    return redirect_to :root if current_user.nil?
    if current_user && current_user.admin
      @restaurants = Restaurant.all
    else
      render_404
    end
  end

  def evaluations
    return redirect_to :root if current_user.nil?
    if current_user && current_user.admin
      @departments = Department.all
      @all_questions = Question.all

      @pending_evaluations = EvaluationApplication.where(status: 'pending').order(:created_at)
      @open_evaluations = EvaluationApplication.where(status: 'open').order(:created_at)
      @submitted_evaluations = EvaluationApplication.where(status: 'submitted').order(:created_at)
      @completed_evaluations = EvaluationApplication.where(status: 'submitted').order(:created_at)
    else
      render_404
    end
  end

  def users
    return redirect_to :root if current_user.nil?
    if current_user && current_user.admin
      @all_users = User.all
    else
      render_404
    end
  end
end
