class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
  end

  def create
  	user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      # Log the user in and redirect to the user's show page.
      log_in user
      render json: {data: "#{tasks_path}"}
    else
      # Create an error message.
      render json: {data: "#{root_path}"}
    end
  end

  def destroy
  	log_out
    redirect_to root_url
  end


end
