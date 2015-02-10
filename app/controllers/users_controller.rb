class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    # @user.account = params[:account]
    @user.email = @user.email.downcase
    @user.first_name = @user.first_name.downcase
    @user.last_name = @user.last_name.downcase
    @user.address = @user.address.downcase
    @user.city = @user.city.downcase
    @user.state = @user.state.downcase
    @user['status'] = 'pending'
    @user['account'] = 'evaluator'
    @user['admin'] = false

    if @user.save
      session[:user_id] = @user.id
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
    def user_params
      params.require(:user).permit(:username, :password, :first_name, :last_name, :email, :phone_number, :address, :city, :state, :zip )
    end
end
