class RestaurantMailer < ActionMailer::Base
  default from: "10and5hospitality@gmail.com"

  def restaurant_created(restaurant)
    @restaurant = restaurant
    mail to: @restaurant.email, subject: "Your 10&5 account is ready.", :template_path => '/restaurant_mailer'
  end

  def completed_evaluation(evaluation)
    # @user = user
    @evaluation = evaluation
    @restaurant = evaluation.evaluation.restaurant
    additional_emails = (@restaurant.additional_emails) ? @restaurant.additional_emails.split(', ') : []
    mail to: @restaurant.email, cc: additional_emails, subject: "10&5 Hospitality evaluation complete.", :template_path => '/restaurant_mailer'
  end

  def base_url
    if Rails.env.production?
      'http://www.10and5hospitality.com/'
    else
      'http://localhost:3000'
    end
  end

  helper_method :base_url
end
