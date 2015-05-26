class AdminMailer < ActionMailer::Base
  default from: "10and5hospitality@gmail.com"

  #----------------------------------
  # Emails to Admin
  #----------------------------------
  def new_evaluator_application(params)
    @applicant = params[:user]
    p '_?_'*200
    p @applicant
    p '_?_'*200
    p @applicant[:devices]
    p '_?_'*200
    mail to: "amcritchie@gmail.com", subject: "New evaluator application."
  end

  def evaluation_submitted(user, evaluation)
    @user = user
    mail to: "amcritchie@gmail.com", subject: "Evaluation submitted."
  end
end