class AdminMailer < ActionMailer::Base
  default from: "10and5hospitality@gmail.com"

  #----------------------------------
  # Emails to Admin
  #----------------------------------
  def new_evaluator_application(params, user)
    @applicant = params[:user]
    @user = user
    # mail to: @user.email, subject: "New evaluator application."
    mail to: "amcritchie@gmail.com", subject: "New evaluator application."
  end

  def evaluation_submitted(user, evaluation)
    @user = user
    mail to: "amcritchie@gmail.com", subject: "Evaluation submitted."
  end
end