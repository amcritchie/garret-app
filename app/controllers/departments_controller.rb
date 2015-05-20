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
    @department = Department.find(params[:id])
    @department.delete

    render nothing: true
  end

end