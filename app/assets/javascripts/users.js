var sparkrApp = {

  loadUsers: function() {
   $.getJSON('/users').done(function(result) {
      sparkrApp.users = result;
      sparkrApp.renderUsers(); 
  });
 },

  renderUsers: function() {
    $('#users').empty();
    for (var i = 0; i < sparkrApp.users.length; i++) {
      var user = sparkrApp.users[i];
      var li = sparkrApp.usersHTML(user);
      $('#users').append(li);
    };
  },

  showUser: function() {
    $.getJSON('/users/:id').done(function(user){
      $('#current_user').empty();
      var li = sparkrApp.currentUserHTML(user);
      $('#current_user').append(li);     
    });
  },

  renderMoments: function() {
    $.getJSON('/users/:id/moments').done(function (result) {
      $('#current_user_moments').empty();
      for (var i = 0; i < result.length; i++) {
      var moment = result[i];
      var li = sparkrApp.momentHTML(moment);  
      $('#current_user_moments').append(li);
      };
    });
  }



};


$(document).ready(function (){
  sparkrApp.usersHTML = Handlebars.compile( $('#userTemplate').html() );
  sparkrApp.loadUsers();

  sparkrApp.currentUserHTML = Handlebars.compile( $('#current_userTemplate').html() );
  sparkrApp.showUser();

  sparkrApp.momentHTML = Handlebars.compile( $('#momentTemplate').html() );
  sparkrApp.renderMoments();


});