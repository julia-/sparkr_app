class UsersController < ApplicationController

  def index
    @users = User.all
    render :json => @users, :include => :moments
  end

  def show
    user_id = params[:id] || @current_user.id
    @user = User.find user_id
    render :json => @user, :include => :moments, :methods => :age
  end

  def match
    matches = @current_user.matches
    render :json => matches, :methods => :age
  end

  def momentshow
    lat_and_long = "" + @current_user.latitude.to_s + ", " + @current_user.longitude.to_s
    nearby_users = User.near(lat_and_long, 30, :order => 'distance')
    nearby_users_id = nearby_users.map {|u| u.id}
    matches = @current_user.matches.map {|u| u.id}
    users_id = nearby_users_id - matches - [@current_user.id]
    users_list = User.where(:id => users_id) 
    users_list = User.all if users_list.empty?
    users_with_moments = users_list.reject { |i| i.moments.length < 3 }
    render :json => users_with_moments, :include => :moments
  end
 
  def update_profile_pic
    if !params[:file]
      @current_user.update( user_params )
      redirect_to root_path
    else
      @current_user.update( profile_pic: params[:file] )  
      respond_to do |format|
        format.json{ render :json => @current_user }
      end
    end
  end

  def new
    @user = User.new
  end
  
  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      redirect_to '/#edit'
    else
      render "pages/home"
    end
  end

  def edit
    @user = User.find_by :id => session[:user_id]
  end

  def update
    user = @current_user
    user.update user_params
    redirect_to root_path
  end

  def destroy
    user = User.find params[:id]
    user.destroy
    redirect_to users_path
  end

  private 
  def user_params
    params.require(:user).permit(:name, :email, :username, :password, :password_confirmation, :dob, :description, :gender, :location, :profile_pic, :is_admin, :latitude, :longitude, :sexual_preference)
  end

end
