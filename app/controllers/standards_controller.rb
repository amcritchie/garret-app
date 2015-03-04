class StandardsController < ApplicationController

  def index
    @standards = Standard.all
  end

  def create
    @standards = Standard.new(
        name: params[:name],
        details: params[:details]
    )
    if @standards.save
      redirect_to root_path
    end
  end

  def destroy
    @standards = Standard.find(params[:id])
    @standards.delete
    # flash[:error] = "Favorite Removed"
    render nothing: true
  end

end