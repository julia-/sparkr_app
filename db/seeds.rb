User.destroy_all
Moment.destroy_all
Like.destroy_all
Match.destroy_all
Message.destroy_all
Firework.destroy_all

# Create users
u1 = User.create(:name => 'Amy', :username => 'amesimmons', :password => 'chicken', :password_confirmation => 'chicken', :email => 'amy@amy.com', :dob => '12/12/1990', :description => 'Hi I am Amy', :gender => 'F', :location => 'Sydney', :profile_pic => 'https://pbs.twimg.com/profile_images/562928882378997760/XLgyqnOy.jpeg')
u2 = User.create(:name => 'Bob', :username => 'bob', :password => 'chicken', :password_confirmation => 'chicken', :email => 'bob@bob.com', :dob => '12/1/1990', :description => 'Hi I am Bob', :gender => 'M', :location => 'Sydney', :profile_pic => 'http://www.qtcanberra.com.au/files/2014/07/Bob.jpg')
u3 = User.create(:name => 'May', :username => 'may', :password => 'chicken', :password_confirmation => 'chicken', :email => 'may@may.com', :dob => '12/3/1990', :description => 'Hi I am May', :gender => 'F', :location => 'Sydney', :profile_pic => '')
u4 = User.create(:name => 'Julia', :username => 'julia', :password => 'chicken', :password_confirmation => 'chicken', :email => 'julia@julia.com', :dob => '12/3/1992', :description => 'Hi I am Julia', :gender => 'F', :location => 'Sydney', :profile_pic => '')

# Create moments
m1 = Moment.create(:content => 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/36367_407213551835_165772_n.jpg?oh=4bfbbbc1014a1a64b772f2fee22b664f&oe=55480EA0&__gda__=1431225705_7799d4a482341ed39bc794ae3feaef1e')
m2 = Moment.create(:content => 'https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/10897942_10152502783461836_4350149713569282005_njpg?oh=b111c0a29ecc8e9d5b5af12bf8d19190&oe=558D1BCF&__gda__=1430954530_c091c46155b8c1ad3888e47134de03ac')
m3 = Moment.create(:content => 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/10984992_10152593336496836_5449960080220284390_njpg?oh=f26970b25d32df7478677d54e9720bd0&oe=55873B6E&__gda__=1434243960_63192ad8479f91f4ffd16c4faf64ac2e')
m4 = Moment.create(:content => 'http://www.zoomerradio.ca/wp-content/uploads/2013/05/Bobdylan.jpg')
m5 = Moment.create(:content => 'http://dylanchords.info/pictures/1962_4thstapartment_gibson.jpg')
m6 = Moment.create(:content => 'http://www.fortheyoungdude.com/wp-content/uploads/2011/11/bobdylan1965_avedon.jpg')
m7 = Moment.create(:content => 'http://www.a1smallbusinessmarketing.com/images/prosbo_hires.jpg')
m8 = Moment.create(:content => 'http://www.macmillandictionaryblog.com/wp-content/uploads/2011/07/Small-Talk-image.jpg')
m9 = Moment.create(:content => 'https://lh5.googleusercontent.com/-nmbZ4yKmKyQ/Tz6t5kpwAuI/AAAAAAAAADA/CO0s0VhvPDM/w506-h750/potion.jpg')
m10 = Moment.create(:content => 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Wiktionary_small.svg/350px-Wiktionary_small.svg.png')
m11= Moment.create(:content => 'http://icons.iconarchive.com/icons/graphicpeel/balloons/256/Small-Pink-Balloon-icon.png')
m12 = Moment.create(:content => 'http://www.ka-gold-jewelry.com/images/products-800/merkaba-prana-small/merkaba-prana-small1.jpg')

# Create likes
Like.create(:user_id => u1.id, :moment_id => m4.id)
Like.create(:user_id => u1.id, :moment_id => m5.id)
Like.create(:user_id => u1.id, :moment_id => m6.id)
Like.create(:user_id => u1.id, :moment_id => m11.id)

Like.create(:user_id => u2.id, :moment_id => m1.id)
Like.create(:user_id => u2.id, :moment_id => m2.id)
Like.create(:user_id => u2.id, :moment_id => m3.id)

Like.create(:user_id => u2.id, :moment_id => m7.id)
Like.create(:user_id => u2.id, :moment_id => m8.id)
Like.create(:user_id => u2.id, :moment_id => m9.id)

Like.create(:user_id => u2.id, :moment_id => m10.id)
Like.create(:user_id => u2.id, :moment_id => m11.id)
Like.create(:user_id => u2.id, :moment_id => m12.id)

Like.create(:user_id => u3.id, :moment_id => m1.id)
Like.create(:user_id => u3.id, :moment_id => m2.id)

Like.create(:user_id => u4.id, :moment_id => m4.id)
Like.create(:user_id => u4.id, :moment_id => m5.id)
Like.create(:user_id => u4.id, :moment_id => m6.id)


# Create messages 
msg1 = Message.create(:sender_id => u2.id, :receiver_id => u1.id, :message_content => 'Hi there', :read => true)
msg2 = Message.create(:sender_id => u1.id, :receiver_id => u2.id, :message_content => 'Hi bob', :read => true)
msg3 = Message.create(:sender_id => u2.id, :receiver_id => u1.id, :message_content => 'How are you Amy?', :read => true)
msg4 = Message.create(:sender_id => u1.id, :receiver_id => u2.id, :message_content => 'Good, and you?', :read => false)
msg5 = Message.create(:sender_id => u2.id, :receiver_id => u4.id, :message_content => 'Hello Julia.', :read => true)
msg6 = Message.create(:sender_id => u4.id, :receiver_id => u2.id, :message_content => 'How are you bob?', :read => true)
msg7 = Message.create(:sender_id => u2.id, :receiver_id => u4.id, :message_content => 'Where do you live?', :read => false)


# Associate users with moments
u1.moments << m1 << m2 << m3
u2.moments << m4 << m5 << m6
u3.moments << m7 << m8 << m9
u4.moments << m10 << m11 << m12






