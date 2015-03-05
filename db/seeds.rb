User.destroy_all
Moment.destroy_all
Like.destroy_all
Match.destroy_all
Message.destroy_all
Firework.destroy_all

# Create users
u1 = User.create(:name => 'Amy', :username => 'amesimmons', :password => 'chicken', :password_confirmation => 'chicken', :email => 'amy@amy.com', :dob => '12/12/1990', :description => 'Hi I am Amy', :gender => 'F', :location => 'Clifton Gardens, Sydney', :profile_pic => '', :latitude => "-33.8292248", :longitude => "151.2440601")
u2 = User.create(:name => 'Bob', :username => 'bob', :password => 'chicken', :password_confirmation => 'chicken', :email => 'bob@bob.com', :dob => '12/1/1990', :description => 'Hi I am Bob', :gender => 'M', :location => 'Mosman', :profile_pic => '', :latitude => "-33.8322525", :longitude => "151.2218552")
u3 = User.create(:name => 'May', :username => 'may', :password => 'chicken', :password_confirmation => 'chicken', :email => 'may@may.com', :dob => '12/3/1990', :description => 'Hi I am May', :gender => 'F', :location => 'Neutral Bay', :profile_pic => '', :latitude => "-33.8268596", :longitude => "151.226020")
u4 = User.create(:name => 'Julia', :username => 'julia', :password => 'chicken', :password_confirmation => 'chicken', :email => 'julia@julia.com', :dob => '12/3/1992', :description => 'Hi I am Julia', :gender => 'F', :location => 'Paris', :profile_pic => '', :latitude => "-33.84", :longitude => "151.25")



# MOSMAN
# -33.8292248,
# 151.2440601

# NEUTRAL BAY
# -33.8322525,
# 151.2218552

# CREMORNE
# -33.8268596,
# 151.226020

# CLIFTON GARDENS
# -33.84,
# 151.25












