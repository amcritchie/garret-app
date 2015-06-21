class AdminMailer < ActionMailer::Base
  default from: "10and5admin@gmail.com"

  def new_evaluator_application(params, user)
    @applicant = params[:user]
    @user = user
    mail to: "10and5hospitality@gmail.com", subject: "New user application."
  end

  def new_evaluation_application(user, application ,message)
    @user = user
    @application = application
    @message = message
    mail to: "10and5hospitality@gmail.com", subject: "New evaluation application."
  end

  def evaluation_submitted(user, evaluation)
    @user = user
    @evaluation = evaluation
    mail to: "10and5hospitality@gmail.com", subject: "Evaluation submitted."
  end

  def base_url
    if Rails.env.production?
      'http://www.10and5hospitality.com'
    else
      'http://localhost:3000'
    end
  end

  helper_method :base_url
end