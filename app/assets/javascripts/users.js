var sparkrApp = {

  userIndex: 0,
  momentIndex: 0,

  addDropZones: function () {
    sparkrApp.handlebarsCompile();
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

    if ( $("#profile-dropzone").length != 0 ) {
      var profileDropzone;
      profileDropzone = new Dropzone("#profile-dropzone");
      profileDropzone.on("success", function(file, responseText) {
        var imageUrl;
        console.log(responseText);
        imageUrl = responseText.profile_pic.url;
        console.log(imageUrl);
        sparkrApp.showUser();
        profileDropzone.removeAllFiles();
      });
    }

    Dropzone.options.mediaDropzone = {

      maxFiles: 3,
      accept: function(file, done) {
        console.log("uploaded");
        done();
      },
      init: function() {
        this.on("maxfilesexceeded", function(file){
            alert("Sorry, only three moments allowed!");
        });
      }
    };
    console.log( $("#media-dropzone").length )
    if ( $("#media-dropzone").length != 0 ) {
      var mediaDropzone;
      mediaDropzone = new Dropzone("#media-dropzone");
      console.log("WHAT", mediaDropzone);
      console.log("MEDIA DROPZONE")
      mediaDropzone.on("success", function(file, responseText) {
        var imageUrl;
        console.log(responseText);
        imageUrl = responseText.content.url;
        sparkrApp.showUser();
        mediaDropzone.removeAllFiles();
      });
    }
  },

  handlebarsCompile: function () {
    if ( $('#userTemplate').length != 0 ) {
      sparkrApp.usersHTML = Handlebars.compile( $('#userTemplate').html() );
      sparkrApp.loadUsers();
    }

    if ( $("#current_userTemplate").length != 0) {
      sparkrApp.currentUserHTML = Handlebars.compile( $('#current_userTemplate').html() );
      sparkrApp.showUser();
    }

    if ( $("#matchTemplate").length != 0 ) {
      sparkrApp.matchesHTML = Handlebars.compile( $('#matchTemplate').html() );
      sparkrApp.loadMatches();
    }

    if ( $('#user_moment').length != 0 ) {
      sparkrApp.showMoments(0,0);
    }
  },

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
      sparkrApp.renderCurrentUserMoments();
    });
  },

  renderCurrentUserMoments: function() { 
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

  showMoments: function(userIndex, momentIndex) {  
    $.getJSON('/users/momentshow').done(function(users) {
      if (userIndex < users.length) {
        var userOnShow = users[userIndex].name;
        sparkrApp.user_id = users[userIndex].id;
        var momentOnShow = users[userIndex].moments[momentIndex].content.large.url
        sparkrApp.moment_id = users[userIndex].moments[momentIndex].id;
        $('#user_moment').empty();
        var $user = $('<p/>').text = userOnShow;
        var $moment = $('<img/>').attr('src', momentOnShow);
        $('#user_moment').append($user);
        $('#user_moment').append($moment);
      } else {
        alert("You have seen all the users' moments.");
      };
    });
  }
};

$(document).ready(function (){

  sparkrApp.handlebarsCompile();

    $('#not_like').on('click', function (event) {
      event.preventDefault();
      sparkrApp.showMoments(sparkrApp.userIndex += 1, sparkrApp.momentIndex);
    });

    $('#like').on('click', function (event) {
      event.preventDefault();
      $.ajax('/likes', {
        type: 'POST',
        data: {
          "like[user_id]": sparkrApp.user_id,
          "like[moment_id": sparkrApp.moment_id
        }
      }).done(function (result) {
        if (result.spark === true){
          alert('You have a match with '+ result.user.name);
        } else {
          if (sparkrApp.momentIndex == 2) {
            sparkrApp.momentIndex = 0;
            sparkrApp.showMoments(sparkrApp.userIndex += 1, sparkrApp.momentIndex);
          } else {
            sparkrApp.showMoments(sparkrApp.userIndex, sparkrApp.momentIndex +=1);
          };
        };
      });
    });
});




$(document).ready(function(){
    console.log('dropzone in');

    Dropzone.autoDiscover = false;
    sparkrApp.addDropZones();

});







