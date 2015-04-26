class HomeController < ApplicationController
  def index
    @user = User.new
    @restaurant = Restaurant.new
    @all_questions = Question.all
    @evaluations = Evaluation.all
    @departments = Department.all
    @questions = {
        fine_dining: Question.where(standards: 'fine_dining'),
        fast_casual: Question.where(standards: 'fast_casual')
    }
    @new_evaluations = Evaluation.where(status: 'open')
    if current_user
      @pending_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'pending')
      @open_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'open')
    end
  end
end