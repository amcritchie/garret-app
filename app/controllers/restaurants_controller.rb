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



    @applications = Evaluation.find_by(restaurant_id: params[:id])
    if @applications
      @applications = Evaluation.find_by(restaurant_id: params[:id]).evaluation_applications
    end
    @application = EvaluationApplication.where(id: params[:id])
    @questions = Question.all
    @restaurant = Restaurant.find(params[:id])
    @departments = Department.all
  end

  def action_plan
    p '-'*80
    p params
    p '-'*80
    @applications = Evaluation.find_by(restaurant_id: params[:id]).evaluation_applications
    @application = EvaluationApplication.find(params[:application_id])
    @questions = Question.all
    @restaurant = Restaurant.find(params[:id])
    @departments = Department.all
  end

  def get_info
    p '-'*80
    p params
    p '-'*80
    # @application = Evaluation.where(restaurant_id: params[:id]).evaluation_applications
    #
    # p '-'*80
    #
    # # @application = EvaluationApplication.find(params[:id])
    # @application = Evaluation.where(restaurant_id: params[:id]).evaluation_applications
    # @evaluation = Evaluation.find(@application[:evaluation_id])
    # @evaluation = @application.evaluation
    # @questions = Question.all
    # # p '--=-==-='
    # # p params[:id]
    # # p '--=-==-='
    # # p EvaluationApplication.find_by(restaurant_id: params[:id])
    # p '--=-==-='
    # p EvaluationApplication.where(evaluation_id: Evaluation.where(restaurant_id: params[:id]))
    # p '--=-==-='
    # @standards = @evaluation.standard
    respond_to do |format|
      # if @application
        # format.json { render json: {score: @application.score, questions: @questions, standards: @application.evaluation.standard.details} }
        format.json { render json: {applications: EvaluationApplication.where(evaluation_id: Evaluation.where(restaurant_id: params[:id]), status: 'submitted'), standards: Standard.all, evaluations: Evaluation.all, questions: Question.all} }
      # else
      #   format.json { render json: {error: "Application not found."} }
      # end
    end
  end

  # GET /users/new
  def new
    @restaurant = Restaurant.new
  end

  # GET /users/1/edit
  def edit
    @restaurant = Restaurant.find(current_user.id)
  end

  # POST /users
  # POST /users.json
  def create

    temp_pass = restaurant_params[:password]
    @restaurant = Restaurant.new(restaurant_params)

    @restaurant.name = @restaurant.name.downcase
    @restaurant.temp_password = temp_pass
    @restaurant.user_id = current_user.id
    @restaurant.url = @restaurant.url.downcase
    @restaurant.address = @restaurant.address.downcase
    @restaurant.city = @restaurant.city.downcase
    @restaurant.state = @restaurant.state.downcase
    @restaurant.zip = @restaurant.zip.downcase

    if @restaurant.save
      redirect_to admin_path
    else
      render :new
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      @restaurant = Restaurant.find(current_user.id)
      if @restaurant.update(restaurant_params)
        @restaurant.update({temp_password: nil})
        format.html { redirect_to root_path, notice: 'User was successfully updated.' }
        format.json { render :root, status: :ok, location: @restaurant }
      else
        format.html { render :edit }
        format.json { render json: @restaurant.errors, status: :unprocessable_entity }
      end
    end
  end

  def unique_email

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
    params.require(:restaurant).permit(:name, :phone_number, :email, :password, :address, :city, :state, :zip, :url )
  end
end
