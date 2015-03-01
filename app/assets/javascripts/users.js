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
      // sparkrApp.rendermoments();      
    });
  },

  // rendermoments: function() {
  //   $.ajax('/users/:id', {
  //     type: 'GET'
  //   }).done(function (user){
    
  //    console.log(user);
  //   }); 
  // }

};


$(document).ready(function (){
  sparkrApp.sparkrHTML = Handlebars.compile( $('#userTemplate').html() );
  sparkrApp.loadUsers();

  sparkrApp.sparkrHTML = Handlebars.compile( $('#current_userTemplate').html() );
  sparkrApp.showUser();


});