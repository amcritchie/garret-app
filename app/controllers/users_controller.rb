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
    if current_user && (session[:user_type] == 'user') && (params[:id] == current_user.id.to_s)
    else
      render_404
    end
  end

  def application

  end

  # POST /users
  def create
    @user = User.new(user_params)
    @user.email = @user.email.downcase
    @user.first_name = @user.first_name.downcase
    @user.last_name = @user.last_name.downcase
    @user.address = @user.address.downcase
    @user.city = @user.city.downcase
    @user.state = @user.state.downcase
    @user['status'] = 'pending'
    @user['account'] = 'evaluator'
    @user['admin'] = false
    @user['email_confirmation'] = false

    if @user.save
      AdminMailer.new_evaluator_application(params, @user).deliver
      UserMailer.received_evaluator_application(@user).deliver
      session[:user_id] = @user.id
      redirect_to root_path
    else
      render :new
    end
  end

  def request_password_reset

  end

  def send_password_reset
    p 'send_password_rest' * 100
    render :request_password_reset_sent
  end

  def confirm_email
    @user = User.find(params[:id])
    @user.update(
        email_confirmation: true
    )
  end

  def accept_application
    if current_user && current_user.admin
      @user = User.find(params[:id])
      UserMailer.evaluator_application_accepted(@user).deliver
      @user.update(
          status: 'evaluator'
      )
    else
      render_404
    end
  end

  def activate_user
    if current_user && current_user.admin
      @user = User.find(params[:id])
      UserMailer.account_activate(@user).deliver
      @user.update(
          status: 'evaluator'
      )
      render nothing: true
    else
      render_404
    end
  end

  def deactivate_user
    if current_user && current_user.admin
      @user = User.find(params[:id])
      UserMailer.account_deactivate(@user, params[:message]).deliver
      @user.update(
          status: 'disabled'
      )
      render nothing: true
    else
      render_404
    end
  end

  def decline_application
    if current_user && current_user.admin
      @user = User.find(params[:id])
      UserMailer.evaluator_application_denied(@user).deliver
      @user.update(
          status: 'declined'
      )
    else
      render_404
    end
  end

  # PATCH/PUT /users/1
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to root_path, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def unique_email
    @user = User.find_by(email: params[:email].downcase)
    @restaurant = Restaurant.find_by(email: params[:email].downcase)
    respond_to do |format|
      if @user || @restaurant
        format.json { render json: {error: "Email is already used"} }
      else
        format.json { render json: {eror: "No error"} }
      end
    end
  end

  # DELETE /users/1
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
    params.require(:user).permit(:username, :password, :first_name, :last_name, :email, :phone_number, :address, :city, :state, :zip)
  end
end
