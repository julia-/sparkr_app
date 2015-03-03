class UsersController < ApplicationController

 # before_action :check_if_admin, :only => [:index, :destroy]

  def index
    @users = User.all
    render json:@users
  end

  def show
    render json:@current_user.as_json(:include => :moments)
  end

  def match
    matches = @current_user.matches
   render json:matches
  end
 
  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      flash[:success] = "You've successfully signed up to Sparkr!"
      redirect_to(root_path)
    else
      render "pages/home"
    end
  end

  def new
    @user = User.new
  end

  def destroy
  end

  def edit
    @user = User.find_by :id => session[:user_id]
  end

  def update
    user = User.find_by :id => session[:user_id]
    user.update user_params
    redirect_to root_path
  end

  private 
  def user_params
    params.require(:user).permit(:name, :email, :username, :password, :password_confirmation, :dob, :description, :gender, :location, :profile_pic, :remote_profile_pic_url, :is_admin)
  end

  def check_if_admin
    redirect_to(root_path)
  end

end
