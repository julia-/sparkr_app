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
  }
  // showUser: function() {
  //   $.getJSON('/users/:id').done(function(result){
  //     console.log(result);
  //   });
  // },

};


$(document).ready(function (){
  sparkrApp.sparkrHTML = Handlebars.compile( $('#userTemplate').html() );
  sparkrApp.loadUsers();

});