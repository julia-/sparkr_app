User.destroy_all
Moment.destroy_all
u1 = User.create(:name => 'Amy', :username => 'amesimmons', :password => 'chicken', :password_confirmation => 'chicken', :email => 'amy@amy.com', :dob => '12/12/1990', :description => 'Hi I am Amy', :gender => 'F', :location => 'Sydney', :profile_pic => 'https://pbs.twimg.com/profile_images/562928882378997760/XLgyqnOy.jpeg')

u2 = User.create(:name => 'Bob', :username => 'bob', :password => 'chicken', :password_confirmation => 'chicken', :email => 'bob@bob.com', :dob => '12/1/1990', :description => 'Hi I am Bob', :gender => 'M', :location => 'Sydney', :profile_pic => 'http://www.qtcanberra.com.au/files/2014/07/Bob.jpg')

m1 = Moment.create(:content => 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/36367_407213551835_165772_n.jpg?oh=4bfbbbc1014a1a64b772f2fee22b664f&oe=55480EA0&__gda__=1431225705_7799d4a482341ed39bc794ae3feaef1e')
m2 = Moment.create(:content => 'https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/10897942_10152502783461836_4350149713569282005_njpg?oh=b111c0a29ecc8e9d5b5af12bf8d19190&oe=558D1BCF&__gda__=1430954530_c091c46155b8c1ad3888e47134de03ac')
m3 = Moment.create(:content => 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/10984992_10152593336496836_5449960080220284390_njpg?oh=f26970b25d32df7478677d54e9720bd0&oe=55873B6E&__gda__=1434243960_63192ad8479f91f4ffd16c4faf64ac2e')
m4 = Moment.create(:content => 'http://www.zoomerradio.ca/wp-content/uploads/2013/05/Bobdylan.jpg')
m5 = Moment.create(:content => 'http://dylanchords.info/pictures/1962_4thstapartment_gibson.jpg')
m6 = Moment.create(:content => 'http://www.fortheyoungdude.com/wp-content/uploads/2011/11/bobdylan1965_avedon.jpg')

# associate users with moments
u1.moments << m1 << m2 << m3
u2.moments << m4 << m5 << m6





