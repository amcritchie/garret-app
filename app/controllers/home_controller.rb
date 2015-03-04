class HomeController < ApplicationController
  def index
    @user = User.new
    @all_users = User.all
    @restaurant = Restaurant.new
    @all_restaurants = Restaurant.all
    @all_questions = Question.all
    @all_questions = Question.all
    @evaluation = Evaluation.new
    @evaluations = Evaluation.all
    @keys = Key.all
    @departments = Department.all
    @standards = Standard.all
    @questions = {
        fine_dining: Question.where(standards: 'fine_dining'),
        fast_casual: Question.where(standards: 'fast_casual')
    }
    @new_evaluations = Evaluation.where(status: 'open')
    @completed_evaluations = EvaluationApplication.where(status: 'submitted')
    if current_user
      @pending_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'pending')
      @pending_evaluations = EvaluationApplication.where(user_id: 5, status: 'pending')
      @open_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'open')
      @open_evaluationss = Evaluation.where(status: 'open')
    end

    @all_pending_evaluations =  EvaluationApplication.where(status: 'pending')
    @open_evaluations =  EvaluationApplication.where(status: 'open')
    @denied_evaluations =  EvaluationApplication.where(status: 'denied')

  end
end