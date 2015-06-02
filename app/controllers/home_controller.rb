class HomeController < ApplicationController
  def index
    # UserMailer.received_evaluation_application(User.find(2), EvaluationApplication.find(37)).deliver
    # UserMailer.evaluation_application_accepted(User.find(2), EvaluationApplication.find(37)).deliver
    # UserMailer.evaluation_application_denied(User.find(2), EvaluationApplication.find(37)).deliver

    @user = User.new
    @restaurant = Restaurant.new
    @all_questions = Question.all
    @evaluations = Evaluation.all
    @departments = Department.all
    @all_standards = Standard.all
    @questions = {
        fine_dining: Question.where(standards: 'fine_dining'),
        fast_casual: Question.where(standards: 'fast_casual')
    }
    @new_evaluations = Evaluation.where(status: 'open')
    if current_user
      if current_user.admin
        redirect_to admin_path
      end
      if session[:user_type] == 'restaurant'
        @applications = Evaluation.find_by(restaurant_id: current_user.id)
        if @applications
          @applications = Evaluation.find_by(restaurant_id: current_user.id).evaluation_applications
        end
        @application = EvaluationApplication.where(id: current_user.id)
        @questions = Question.all
        @restaurant = Restaurant.find(current_user.id)
      else
        @pending_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'pending')
        @open_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'open')
      end
      @pending_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'pending')
      @open_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'open')
      @submitted_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'submitted')
    end
  end
end