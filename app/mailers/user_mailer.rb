class UserMailer < ActionMailer::Base
  default from: "10and5hospitality@gmail.com"

  # #----------------------------------
  # # Emails to Admin
  # #----------------------------------
  # def new_evaluator_application(user)
  #   @user = user
  #   mail to: "amcritchie@gmail.com", subject: "New evaluator application.", :template_path => '/user_mailer/admin'
  # end
  #
  # def evaluation_submitted_admin(user, evaluation)
  #   @user = user
  #   mail to: "amcritchie@gmail.com", subject: "Evaluation submitted.", :template_path => '/user_mailer/admin'
  # end

  #----------------------------------
  # Emails to Evaluator
  #----------------------------------
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

  def evaluation_reopened(user, evaluation)
    @user = user
    mail to: "amcritchie@gmail.com", subject: "Evaluation submitted.", :template_path => '/user_mailer/evaluator'
  end

  #----------------------------------
  # Emails to Restaurant
  #----------------------------------

  # def sample_email(user)
  #   @user = user
  #   p '_=_'*800
  #   mg_client = Mailgun::Client.new ENV['api_key']
  #   message_params = {:from    => ENV['gmail_username'],
  #                     :to      => 'alexmcray@aol.com',
  #                     :subject => 'Sample Mail using Mailgun API',
  #                     :text    => 'This mail is sent using Mailgun API via mailgun-ruby'}
  #   mg_client.send_message ENV['domain'], message_params
  # end
end
