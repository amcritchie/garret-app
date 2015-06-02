class AdminMailer < ActionMailer::Base
  default from: "10and5hospitality@gmail.com"

  def new_evaluator_application(params, user)
    @applicant = params[:user]
    @user = user
    mail to: "amcritchie@gmail.com", subject: "New evaluator application."
  end

  def new_evaluation_application(user, application ,message)
    @user = user
    @application = application
    @message = message
    mail to: "amcritchie@gmail.com", subject: "New evaluator application."
  end

  def evaluation_submitted(user, evaluation)
    @user = user
    @evaluation = evaluation
    mail to: "amcritchie@gmail.com", subject: "Evaluation submitted."
  end

  def base_url
    if Rails.env.production?
      'https://restaurant-anonymous.herokuapp.com'
    else
      'http://localhost:3000'
    end
  end

  helper_method :base_url
end