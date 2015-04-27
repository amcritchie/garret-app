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

  def update
    p '-_-'*200
    p params
    p '==='
    p params[:id]
    p '-0-'*200
    @standard = Standard.find(params[:id])
    p @standard
    p '-W-'*200
    @standard.update(
        name: params[:name],
        details: params[:details]
    )
    # @standards = Standard.new(
    #     name: params[:name],
    #     details: params[:details]
    # )
    if @standard.save
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