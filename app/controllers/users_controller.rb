class UsersController < ApplicationController
  protect_from_forgery

  def new
    @user = User.new
  end

  def create
  	@user = User.new(user_params)
  	if @user.save
      render json: {data: "#{root_path}"}
    else
      render json: {data: "#{signup_path}"}
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation)
    end


end