class HomeController < ApplicationController
  def index
    @user = User.new
    @all_users = User.all
    @restaurant = Restaurant.new
    @all_restaurants = Restaurant.all
    @all_questions = Question.all
    @all_questions = Question.all
    @questions = {
        fine_dining: Question.where(standards: 'fine_dining'),
        fast_casual: Question.where(standards: 'fast_casual')
    }
  end
end