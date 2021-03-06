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
      UserMailer.received_evaluation_application(current_user, @application).deliver
      AdminMailer.new_evaluation_application(current_user, @application, params[:message]).deliver
      redirect_to root_path
    end
  end

  def approve
    if current_user && current_user.admin
      @application = EvaluationApplication.find(params[:id])
      @evaluation = @application.evaluation
      if @evaluation.status == 'open'
        EvaluationApplication.where(evaluation_id: @evaluation.id).update_all(
            status: 'denied'
        )
        @application.update(
            status: 'open',
            accepted_at: Time.now
        )
        @application.evaluation.update(
            status: 'closed'
        )
        UserMailer.evaluation_application_accepted(current_user, @application).deliver
        redirect_to admin_path
      else
        redirect_to 'evalustion'
      end
    else
      render_404
    end
  end

  def deny
    if current_user && current_user.admin
      @application = EvaluationApplication.find(params[:id])
      @application.update(
          status: 'denied',
          accepted_at: Time.now
      )
      UserMailer.evaluation_application_denied(current_user, @application).deliver
      redirect_to admin_path
    else
      render_404
    end
  end

  def submit
    @application = EvaluationApplication.find(params[:id])
    p '-----submit-----' * 20
    p @application
    p '-----submit-----' * 20
    UserMailer.evaluation_submitted(current_user, @application).deliver
    AdminMailer.evaluation_submitted(current_user, @application).deliver
    @application.update(
        status: 'submitted',
        completed_at: Time.now
    )
    redirect_to root_path
  end

  def accept
    if current_user && current_user.admin
      @application = EvaluationApplication.find(params[:id])
      UserMailer.evaluation_accepted(@application.user, @application).deliver
      RestaurantMailer.completed_evaluation(@application).deliver
      @application.update(
          status: 'complete',
          completed_at: Time.now
      )
      redirect_to root_path
    else
      render_404
    end

  end

  def reopen
    if current_user && current_user.admin
      @application = EvaluationApplication.find(params[:id])
      UserMailer.evaluation_reopened(@application.user, @application, params[:message]).deliver
      @application.update(
          status: 'open',
          completed_at: Time.now
      )
      redirect_to root_path
    else
      render_404
    end

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
    courses = params[:details][:courses]
    beverages = params[:details][:beverages]
    time_spots = params[:details][:time_spots]
    check = params[:details][:check]
    employees = params[:details][:employees]

    @application = EvaluationApplication.find(params[:id])
    @application.update(
        score: params[:score],
        department_descriptions: params[:descriptions],
        crs1: courses[:crs1],
        crs2: courses[:crs2],
        crs3: courses[:crs3],
        bev1: beverages[:bev1],
        bev2: beverages[:bev2],
        arrive_time: time_spots[:arrival_time],
        depart_time: time_spots[:departure_time],
        check_all_items_billed: check[:allItems],
        check_num: check[:check],
        table_num: check[:table],
        check_amount: check[:checkAmount],
        res_valid: employees[:reservationist][:not_valid],
        res_gender: employees[:reservationist][:gender],
        res_name: employees[:reservationist][:name],
        res_other: employees[:reservationist][:other],
        bar_valid: employees[:bartender][:not_valid],
        bar_gender: employees[:bartender][:gender],
        bar_height: employees[:bartender][:height],
        bar_other: employees[:bartender][:other],
        ho1_valid: employees[:host1][:not_valid],
        ho1_gender: employees[:host1][:gender],
        ho1_height: employees[:host1][:height],
        ho1_other: employees[:host1][:other],
        ho2_valid: employees[:host2][:not_valid],
        ho2_gender: employees[:host2][:gender],
        ho2_height: employees[:host2][:height],
        ho2_other: employees[:host2][:other],
        man_valid: employees[:manager][:not_valid],
        man_gender: employees[:manager][:gender],
        man_height: employees[:manager][:height],
        man_other: employees[:manager][:other],
        ser_valid: employees[:server][:not_valid],
        ser_gender: employees[:server][:gender],
        ser_height: employees[:server][:height],
        ser_other: employees[:server][:other],
    )
    p '-----update-----' * 20
    p @application
    p '---'
    p @application['crs2']
    p @application['bev2']
    p '-----update-----' * 20
    render nothing: true
  end

  def create
    @application = EvaluationApplication.new(
        name: params[:name],
        res_valid: true,
        bar_valid: true,
        ho1_valid: true,
        ho2_valid: true,
        man_valid: true,
        ser_valid: true
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