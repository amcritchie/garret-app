class DepartmentsController < ApplicationController

  def index
    @departments = Department.all
  end

  def create
    @department = Department.new(
        name: params[:name]
    )
    if @department.save
      redirect_to root_path
    end
  end

  def destroy
    # favorite = Favorite.where(favoriter: current_user.id, favorited: params[:user_id])
    # favorite.delete_all
    p '-=' *800
    p params[:id]
    @department = Department.find(params[:id])
    @department.delete
    # flash[:error] = "Favorite Removed"
    render nothing: true
  end

end