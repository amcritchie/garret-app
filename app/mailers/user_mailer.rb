class UserMailer < ActionMailer::Base
  default from: "10and5hospitality@gmail.com"

  # evaluator_application
  def received_evaluator_application(user)
    @user = user
    mail to: user.email, subject: "10&5 hospitality email confirmation.", :template_path => '/user_mailer/evaluator_application'
  end
  def evaluator_application_accepted(user)
    @user = user
    mail to: user.email, subject: "Welcome to the 10&team!", :template_path => '/user_mailer/evaluator_application'
  end
  def evaluator_application_denied(user)
    @user = user
    mail to: user.email, subject: "10&5 hospitality application.", :template_path => '/user_mailer/evaluator_application'
  end

  # evaluation_application
  def received_evaluation_application(user, evaluation)
    @user = user
    @evaluation = evaluation
    mail to: user.email,subject: "10&5 hospitality email confirmation.", :template_path => '/user_mailer/evaluation_application'
  end
  def evaluation_application_accepted(user, evaluation)
    @user = user
    @evaluation = evaluation
    mail to: user.email, subject: "10&5 hospitality application.", :template_path => '/user_mailer/evaluation_application'
  end
  def evaluation_application_denied(user, evaluation)
    @user = user
    @evaluation = evaluation
    mail to: user.email, subject: "10&5 hospitality application.", :template_path => '/user_mailer/evaluation_application'
  end

  # evaluation_submitted
  def evaluation_submitted(user, evaluation)
    @user = user
    @evaluation = evaluation
    mail to: user.email, subject: "Evaluation submitted.", :template_path => '/user_mailer/evaluation_submitted'
  end
  def evaluation_accepted(user, evaluation)
    @user = user
    mail to: user.email, subject: "Evaluation accepted.", :template_path => '/user_mailer/evaluation_submitted'
  end
  def evaluation_reopened(user, evaluation, message)
    @user = user
    @evaluation = evaluation
    @message = message
    mail to: user.email, subject: "Evaluation reopened.", :template_path => '/user_mailer/evaluation_submitted'
  end

  # account_activation
  def account_activate(user)
    @user = user
    mail to: user.email, subject: "Account activated.", :template_path => '/user_mailer/account_activation'
  end
  def account_deactivate(user, message)
    @user = user
    @message = message
    mail to: user.email, subject: "Account deactivated.", :template_path => '/user_mailer/account_activation'
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
