class KeysController < ApplicationController

  def index
    @keys = Key.all
  end

  def create
    @key = Favorite.new(
        name: params[:name]
    )
    if @key.save
      # flash[:success] = "User Favorited"
      redirect_to root_path
    end
  end

  def destroy
    favorite = Favorite.where(favoriter: current_user.id, favorited: params[:user_id])
    favorite.delete_all
    # flash[:error] = "Favorite Removed"
    render nothing: true
  end

end