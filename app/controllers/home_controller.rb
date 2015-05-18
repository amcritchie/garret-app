class HomeController < ApplicationController
  def index
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
      if session[:user_type] == 'restaurant'
        @applications = Evaluation.find_by(restaurant_id: current_user.id)
        if @applications
          @applications = Evaluation.find_by(restaurant_id: current_user.id).evaluation_applications
        end
        @application = EvaluationApplication.where(id: current_user.id)
        @questions = Question.all
        @restaurant = Restaurant.find(current_user.id)
        # Restaurant.find_by(id: session[:user_id])
      else
        @pending_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'pending')
        @open_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'open')

        # User.find_by(id: session[:user_id])
      end

      @pending_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'pending')
      @open_evaluations = EvaluationApplication.where(user_id: current_user.id, status: 'open')


      # @departments = Department.all
    end
  end
end