class EvaluationApplicationsController < ApplicationController

  def index
    @application = EvaluationApplication.all
  end

  def show
    p '---'*80
    p params
    @application = EvaluationApplication.find(params[:id])
    @questions = Question.all
  end

  def apply
    @application = EvaluationApplication.new(
        evaluation_id: params[:evaluation_id],
        user_id: current_user.id,
        status: 'pending',
        score: '0'
    )
    if @application.save
      redirect_to root_path
    end
  end

  def approve
    @application = EvaluationApplication.find(params[:id])
    @application.update(
        status: 'open',
        accepted_at: Time.now
    )
    redirect_to admin_path
  end

  def deny
    @application = EvaluationApplication.find(params[:id])
    @application.update(
        status: 'denied',
        accepted_at: Time.now
    )
    redirect_to admin_path
  end

  def submit
    @application = EvaluationApplication.find(params[:id])
    @application.update(
        status: 'submitted',
        completed_at: Time.now
    )
    redirect_to root_path
  end

  def get_info
    @application = EvaluationApplication.find(params[:id])
    @evaluation = Evaluation.find(@application[:evaluation_id])
    @evaluation = @application.evaluation
    @questions = Question.all
    p '--=-==-='
    @standards = @evaluation.standard
    respond_to do |format|
      if @application
        format.json { render json: {score: @application.score, questions: @questions, standards: @application.evaluation.standard.details} }
      else
        format.json { render json: {error: "Application not found."} }
      end
    end
  end

  def get_score
    @application = EvaluationApplication.find(params[:id])
    respond_to do |format|
      if @application
        format.json { render json: {score: @application.score} }
      else
        format.json { render json: {error: "Application not found."} }
      end
    end
  end

  def update_score


    @application = EvaluationApplication.find(params[:id])
    @application.update(
        score: params[:score]
    )
    render nothing: true
  end

  def create
    @application = EvaluationApplication.new(
        name: params[:name]
    )
    if @application.save
      redirect_to root_path
    end
  end

  def destroy
    # favorite = Favorite.where(favoriter: current_user.id, favorited: params[:user_id])
    # favorite.delete_all
    p '-=' *800
    p params[:id]
    @application = EvaluationApplication.find(params[:id])
    @application.delete
    # flash[:error] = "Favorite Removed"
    render nothing: true
  end

end