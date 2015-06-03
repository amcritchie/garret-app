class RestaurantMailer < ActionMailer::Base
  default from: "10and5hospitality@gmail.com"

  # evaluator_application
  def completed_evaluation(evaluation)
    # @user = user
    @evaluation = evaluation
    @restaurant = evaluation.evaluation.restaurant
    additional_emails = @restaurant.additional_emails.split(', ')
    mail to: "amcritchie@gmail.com", cc: additional_emails, subject: "10 and 5 hospitality email confirmation.", :template_path => '/restaurant_mailer'
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