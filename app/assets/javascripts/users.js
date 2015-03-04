var sparkrApp = {

  userIndex: 0,
  momentIndex: 0,

  compiled: 0,

  addDropZones: function () {
    sparkrApp.handlebarsCompile();
    Dropzone.options.profileDropzone = {
      maxFiles: 1,
      accept: function(file, done) {
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
        imageUrl = responseText.profile_pic.url;
        sparkrApp.showUser();
        profileDropzone.removeAllFiles();
      });
    }

    Dropzone.options.mediaDropzone = {

      maxFiles: 3,
      accept: function(file, done) {
        done();
      },
      init: function() {
        this.on("maxfilesexceeded", function(file){
            alert("Sorry, only three moments allowed!");
        });
      }
    };
    if ( $("#media-dropzone").length != 0 ) {
      var mediaDropzone;
      mediaDropzone = new Dropzone("#media-dropzone");
      mediaDropzone.on("success", function(file, responseText) {
        var imageUrl;
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

    if ( $("#current_userTemplate").length != 0 && $('.logged_in').length > 0) {
      sparkrApp.currentUserHTML = Handlebars.compile( $('#current_userTemplate').html() );
      sparkrApp.showUser();
    }

    if ( $("#matchTemplate").length != 0 && $('.logged_in').length > 0 ) {
      sparkrApp.matchesHTML = Handlebars.compile( $('#matchTemplate').html() );
      sparkrApp.loadMatches();
    }

    if ( $('#user_moment').length != 0 ) {
      sparkrApp.loadMomentUsers();
    }

    if ( sparkrApp.compiled < 2 ) {
      $('#not_like').on('click', function (event) {
        event.preventDefault();
        sparkrApp.showMoments(sparkrApp.userIndex += 1, sparkrApp.momentIndex);
      });

      $('#like').on('click', function (event) {
        event.preventDefault();
        $.ajax('/likes', {
          type: 'POST',
          data: {
            like: {
              user_id: sparkrApp.user_id,
              moment_id: sparkrApp.moment_id
            }
          }
        }).done(function (result) {
          if (result.spark === true){
            var $div = $("<div class='got_a_match'/>").text('You have a match with '+ result.user.name);
            $('.container').append($div);
          }  
          if (sparkrApp.momentIndex == 2) {
            sparkrApp.momentIndex = 0;
            sparkrApp.showMoments(sparkrApp.userIndex += 1, sparkrApp.momentIndex);
          } else {
            sparkrApp.showMoments(sparkrApp.userIndex, sparkrApp.momentIndex +=1);
          }
        });
      });
      sparkrApp.compiled++;
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
    var userid = $('meta[name="user-id"]').attr('content');
    $.getJSON('/users/' + userid).success(function(user){
      // debugger;
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
    var end = 3;
    if (sparkrApp.current_user_moments.length < 3){
      end = sparkrApp.current_user_moments.length;
    }
    for (var i = 0; i < end; i++) {
      var moment = sparkrApp.current_user_moments[i];
      var li = sparkrApp.momentHTML(moment);  
      $('#current_user_moments').append(li);

    };
  },

  loadMatches: function() {
    var userid = $('meta[name="user-id"]').attr('content');
    $.getJSON('/users/' + userid + '/match').done(function(result) {
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

  loadMomentUsers: function() {
    $.getJSON('/users/momentshow').done(function(result) {
      sparkrApp.momentUsers = result;
      sparkrApp.showMoments(0,0);
    });

  },


  showMoments: function(userIndex, momentIndex) {  
    if (userIndex < sparkrApp.momentUsers.length) {
      var userOnShow = sparkrApp.momentUsers[userIndex].name;
      sparkrApp.user_id = sparkrApp.momentUsers[userIndex].id;
      var momentOnShow = sparkrApp.momentUsers[userIndex].moments[momentIndex].content.large.url
      sparkrApp.moment_id = sparkrApp.momentUsers[userIndex].moments[momentIndex].id;
      $('#user_moment').empty();
      var $u = $('<p/>').text = userOnShow;
      var $m = $('<img/>').attr('src', momentOnShow);
      $('#user_moment').append($u);
      $('#user_moment').append($m);
    } else {
      console.log("You have seen all the users' moments.");
      sparkrApp.userIndex = 0;
      sparkrApp.momentIndex = 0;
      sparkrApp.loadMomentUsers();
    };
  }

};


$(document).ready(function(){
    Dropzone.autoDiscover = false;
    sparkrApp.addDropZones();
});







