class UsersController < ApplicationController
  # before_action :check_if_admin, :only => [:index, :destroy]

  def index
    @users = User.all
    render json:@users
  end

  def show
    render json: @currentuser
  end
 
  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      redirect_to(root_path)
    else
      redirect_to(root_path)
    end
  end

  def new
    @user = User.new
  end

  def destroy
  end

  private 
  def user_params
    params.require(:user).permit(:name, :email, :username, :password, :password_confirmation, :dob, :description, :gender, :location, :profile_pic)
  end

  def check_if_admin
    redirect_to(root_path)
  end

end
