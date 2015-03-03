class UsersController < ApplicationController

 # before_action :check_if_admin, :only => [:index, :destroy]

  def index
    @users = User.all
    render :json => @users, :include => :moments
  end

  def show
    render :json => @current_user, :include => :moments
  end

  def match
    matches = @current_user.matches
   render json:matches
  end

  def momentshow
    # binding.pry
    all_user = User.all.map {|u| u.id}
    matches = @current_user.matches.map {|u| u.id}
    users_id = all_user - matches - [@current_user.id]
    users_list = User.where(:id => users_id) 
    render :json => users_list, :include => :moments
  end
 
  # def create
  #   if !params[:file]
  #     @current_user.update( user_params )
  #     redirect_to root_path
  #   else
  #     @current_user.update( profile_pic: params[:file] )  
  #     respond_to do |format|
  #       format.json{ render :json => @current_user }
  #     end
  #   end
  # end
  def new
    @user = User.new
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

  def edit
    @user = User.find_by :id => session[:user_id]
  end

  def update
    user = User.find_by :id => session[:user_id]
    user.update user_params
    redirect_to root_path
  end

  def destroy
  end

  private 
  def user_params
    params.require(:user).permit(:name, :email, :username, :password, :password_confirmation, :dob, :description, :gender, :location, :profile_pic, :is_admin, :latitude, :longitude)
  end

  # def check_if_admin
  #   redirect_to(root_path)
  # end

end
