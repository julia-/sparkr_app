var sparkrApp = {

  loadUsers: function() {
   $.getJSON('/users').done(function(result) {
      sparkrApp.users = result;
      sparkrApp.renderUsers(); 
  });
 },

  renderUsers: function() {
    $('#users').empty();
    for (var i = 0; i < this.users.length; i++) {
      var user = this.users[i];
      var li = this.sparkrHTML(user);
      $('#users').append(li);
    };
  },

  showUser: function() {
    $.getJSON('/users/:id').done(function(user){
      $('#current_user').empty();
      var li = sparkrApp.sparkrHTML(user);
      $('#current_user').append(li);
      sparkrApp.renderUser();      
    });
  },

  renderUser: function() {
    $.getJSON('/users/:id/moments').done(function (result) {
      console.log(result);
      $('#current_user_moments').empty();
      for (var i = 0; i < result.length; i++) {
      var moment = result[i];
      // debugger;
      var $img = $('<img/>').attr('src', moment.content);  
      $('#current_user_moments').append($img);
      };
    });
  }



};


$(document).ready(function (){
  sparkrApp.sparkrHTML = Handlebars.compile( $('#userTemplate').html() );
  sparkrApp.loadUsers();

  sparkrApp.sparkrHTML = Handlebars.compile( $('#current_userTemplate').html() );
  sparkrApp.showUser();


});