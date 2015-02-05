class HomeController < ApplicationController
  def index
    @user = User.new
    @all_users = User.all
    @restaurant = Restaurant.new
    @all_restaurants = Restaurant.all
  end
end