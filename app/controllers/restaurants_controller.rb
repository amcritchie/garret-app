class RestaurantsController < ApplicationController
  # before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @restaurant = Restaurant.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @restaurant = Restaurant.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create

    @restaurant = Restaurant.new(restaurant_params)


    @restaurant.name = @restaurant.name.downcase
    @restaurant.user_id = current_user.id
    @restaurant.address = @restaurant.address.downcase
    @restaurant.city = @restaurant.city.downcase
    @restaurant.state = @restaurant.state.downcase
    @restaurant.zip = @restaurant.zip.downcase

    if @restaurant.save
      redirect_to root_path
    else
      render :new
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def unique_email
    p '=_='*40
    p params[:email]

    @user = User.find_by(email: params[:email].downcase)
    respond_to do |format|
      if @user
        format.json { render json: {error: "Email is already used."} }
      else
        format.json { render json: {eror: "No error"} }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def restaurant_params
    params.require(:restaurant).permit(:name, :phone_number, :address, :city, :state, :zip )
  end
end
