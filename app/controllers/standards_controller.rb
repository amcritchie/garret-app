class StandardsController < ApplicationController

  def index
    @standards = Standard.all
  end

  def create
    @standard = Standard.new(
        name: params[:name],
        details: params[:details]
    )
    if @standard.save
      render json: {status: 200}
    else
      render json: {status: 500, error: 'entity could not be processed'}
    end
  end

  def update
    @standard = Standard.find(params[:id])
    @standard.update(
        name: params[:name],
        details: params[:details]
    )
    if @standard.save
      render json: {status: 200}
    else
      render json: {status: 500, error: 'entity could not be processed'}
    end
  end

  def destroy
    @standards = Standard.find(params[:id])
    @standards.delete
    render nothing: true
  end
end