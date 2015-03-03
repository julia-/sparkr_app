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
    $.getJSON('/users/:id').success(function(user){
      $('#current_user').empty();
      var li = sparkrApp.currentUserHTML(user);
      $('#current_user').append(li);
      sparkrApp.current_user_moments = user.moments;    
      sparkrApp.momentHTML = Handlebars.compile( $('#momentTemplate').html() );
      sparkrApp.renderMoments();
    });
  },

  renderMoments: function() { 
    $('#current_user_moments').empty();
    var start = sparkrApp.current_user_moments.length - 3;
    if (start < 0) {
      start = 0;
    }
    for (var i = start; i < sparkrApp.current_user_moments.length; i++) {
      var moment = sparkrApp.current_user_moments[i];
      var li = sparkrApp.momentHTML(moment);  
      $('#current_user_moments').prepend(li);
    };
  },

  loadMatches: function() {
   $.getJSON('/users/2/match').done(function(result) {
      sparkrApp.matches = result;
      sparkrApp.renderMatches(); 
  });
 },

  renderMatches: function() {
    $('#matches').empty();
    for (var i = 0; i < sparkrApp.matches.length; i++) {
      var match = sparkrApp.matches[i];
      var li = sparkrApp.matchesHTML(match);
      $('#matches').append(li);
    };
  },  
};

$(document).ready(function (){
  sparkrApp.usersHTML = Handlebars.compile( $('#userTemplate').html() );
  sparkrApp.loadUsers();

  sparkrApp.currentUserHTML = Handlebars.compile( $('#current_userTemplate').html() );
  sparkrApp.showUser();

  sparkrApp.matchesHTML = Handlebars.compile( $('#matchTemplate').html() );
  sparkrApp.loadMatches();

});


$(document).ready(function(){
    console.log('dropzone in');

    Dropzone.autoDiscover = false;

    Dropzone.options.profileDropzone = {

    maxFiles: 1,
    accept: function(file, done) {
      console.log("uploaded");
      done();
    },
    init: function() {
      this.on("maxfilesexceeded", function(file){
          alert("Sorry, only one profile picture allowed!");
      });
    }
  };

  var profileDropzone;
  profileDropzone = new Dropzone("#profile-dropzone");
  return profileDropzone.on("success", function(file, responseText) {
    var imageUrl;
    console.log(responseText);
    imageUrl = responseText.profile_pic.url;
    console.log(imageUrl);
    sparkrApp.showUser();
    profileDropzone.removeAllFiles();
  });

});







