class UserMailer < ActionMailer::Base
  default from: "10and5hospitality@gmail.com"

  def received_evaluator_application(user)
    @user = user
    mail to: "amcritchie@gmail.com", subject: "10 and 5 hospitality email confirmation.", :template_path => '/user_mailer/evaluator'
  end

  def evaluator_application_accepted(user)
    @user = user
    mail to: "amcritchie@gmail.com", subject: "Welcome to the 10 and 5 team!", :template_path => '/user_mailer/evaluator'
  end

  def evaluator_application_denied(user)
    @user = user
    mail to: "amcritchie@gmail.com", subject: "10 and 5 hospitality application.", :template_path => '/user_mailer/evaluator'
  end

  def evaluation_submitted(user, evaluation)
    @user = user
    mail to: "amcritchie@gmail.com", subject: "Evaluation submitted.", :template_path => '/user_mailer/evaluator'
  end

  def evaluation_accepted(user, evaluation)
    @user = user
    mail to: "amcritchie@gmail.com", subject: "Evaluation submitted.", :template_path => '/user_mailer/evaluator'
  end

  def evaluation_reopened(user, evaluation, message)
    @user = user
    @evaluation = evaluation
    @message = message
    mail to: "amcritchie@gmail.com", subject: "Evaluation submitted.", :template_path => '/user_mailer/evaluator'
  end
end
