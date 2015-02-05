class HomeController < ApplicationController
  def index
    @user = User.new
    @all_users = User.all
  end
end