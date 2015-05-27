class EvaluationApplicationsController < ApplicationController

  def index
    @application = EvaluationApplication.all
  end

  def show
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
    UserMailer.evaluation_submitted(current_user, @application).deliver
    AdminMailer.evaluation_submitted(current_user, @application).deliver
    @application.update(
        status: 'submitted',
        completed_at: Time.now
    )
    redirect_to root_path
  end

  def accept
    @application = EvaluationApplication.find(params[:id])
    UserMailer.evaluation_accepted(@application.user, @application).deliver
    @application.update(
        status: 'complete',
        completed_at: Time.now
    )
    redirect_to root_path
  end

  def reopen
    @application = EvaluationApplication.find(params[:id])
    UserMailer.evaluation_reopened(@application.user, @application, params[:message]).deliver
    @application.update(
        status: 'open',
        completed_at: Time.now
    )
    redirect_to root_path
  end

  def get_info
    @application = EvaluationApplication.find(params[:id])
    @evaluation = Evaluation.find(@application[:evaluation_id])
    @evaluation = @application.evaluation
    @questions = Question.all
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
        format.json { render json: {score: @application.score, standards: @application.evaluation.standard.details, application: @application} }
      else
        format.json { render json: {error: "Application not found."} }
      end
    end
  end

  def update_score
    time_spots = params[:details][:time_spots]
    check = params[:details][:check]
    employees = params[:details][:employees]

    @application = EvaluationApplication.find(params[:id])
    @application.update(
        score: params[:score],
        arrive_time: time_spots[:arrival_time],
        depart_time: time_spots[:departure_time],
        check_all_items_billed: check[:allItems],
        check_num: check[:check],
        table_num: check[:table],
        check_amount: check[:checkAmount],
        res_valid: employees[:reservationist][:valid],
        res_gender: employees[:reservationist][:gender],
        res_height: employees[:reservationist][:height],
        res_hair: employees[:reservationist][:hair],
        res_other: employees[:reservationist][:other],
        bar_valid: employees[:bartender][:valid],
        bar_gender: employees[:bartender][:gender],
        bar_height: employees[:bartender][:height],
        bar_hair: employees[:bartender][:hair],
        bar_other: employees[:bartender][:other],
        host1_valid: employees[:host1][:valid],
        host1_gender: employees[:host1][:gender],
        host1_height: employees[:host1][:height],
        host1_hair: employees[:host1][:hair],
        host1_other: employees[:host1][:other],
        host2_valid: employees[:host2][:valid],
        host2_gender: employees[:host2][:gender],
        host2_height: employees[:host2][:height],
        host2_hair: employees[:host2][:hair],
        host2_other: employees[:host2][:other],
        man_valid: employees[:manager][:valid],
        man_gender: employees[:manager][:gender],
        man_height: employees[:manager][:height],
        man_hair: employees[:manager][:hair],
        man_other: employees[:manager][:other],
        ser_valid: employees[:server][:valid],
        ser_gender: employees[:server][:gender],
        ser_height: employees[:server][:height],
        ser_hair: employees[:server][:hair],
        ser_other: employees[:server][:other],
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
    @application = EvaluationApplication.find(params[:id])
    @application.delete

    render nothing: true
  end

end