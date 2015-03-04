class EvaluationsController < ApplicationController
  # before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @evaluations = Evaluation.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @evaluation = Evaluation.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    restaurant = Restaurant.find_by(name: params['evaluation']['restaurant_id'])
    standards = Standard.find_by(name: params['evaluation']['standard_id'])
    p '=+1'*80
    p restaurant
    p '[][['
    p params
    params['evaluation']['standards_id']
    params['evaluation']
    p standards
    p '=+1'*80
    @evaluation = Evaluation.new(evaluation_params)
    @evaluation.restaurant_id = restaurant.id
    @evaluation.standard_id = standards.id
    @evaluation.status = 'open'

    if @evaluation.save
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
  def evaluation_params
    params.require(:evaluation).permit(:restaurant_id,:standards,:name)
  end
end