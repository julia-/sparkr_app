u1 = User.create(:name => 'Amy', :username => 'amesimmons', :password => 'chicken', :password_confirmation => 'chicken', :email => 'amy@amy.com', :dob => '12/12/1990', :description => 'Hi I am Amy', :gender= > 'F', :location => 'Sydney', :profile_pic => 'https://pbs.twimg.com/profile_images/562928882378997760/XLgyqnOy.jpeg')

u2 = User.create(:name => 'Bob', :username => 'bob', :password => 'chicken', :password_confirmation => 'chicken', :email => 'bob@bob.com', :dob => '12/1/1990', :description => 'Hi I am Bob', :gender= > 'M', :location => 'Sydney', :profile_pic => 'http://www.qtcanberra.com.au/files/2014/07/Bob.jpg')

m1 = Moment.create()

