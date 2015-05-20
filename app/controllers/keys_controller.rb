class KeysController < ApplicationController

  def index
    @keys = Key.all
  end

  def create
    @key = Key.new(
        name: params[:name]
    )
    if @key.save
      redirect_to root_path
    end
  end

  def destroy
    @key = Key.find(params[:id])
    @key.delete

    render nothing: true
  end

end