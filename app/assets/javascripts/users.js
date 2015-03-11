window.runBefore = false;
window.lastRunUrl = false;
window.runFirst = false;

var sparkrApp = {

  userIndex: 0,
  momentIndex: 0,

  addDropZones: function () {
    // sparkrApp.handlebarsCompile();
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
        console.log(imageUrl);
        sparkrApp.showUser();
        profileDropzone.removeAllFiles();
      });
    }

    Dropzone.options.mediaDropzone = {
      maxFiles: 4,
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
        // console.log('dropzone moment success')

        var imageUrl;
        imageUrl = responseText.content.url;

      if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
        sparkrApp.showUser();
        mediaDropzone.removeAllFiles();
      }

      });
    }
    sparkrApp.handlebarsCompile();
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

    $("#not_like").addClass("embedded");
    $("#like").addClass("embedded");

    if ( $("#not_like.embedded").length != 0 && window.runBefore != true) {
      window.runBefore = true;
      $('.container').on('click', '#not_like', function (event) {
        event.preventDefault();
        $('#user_moment').addClass('skip-left');
        setTimeout(function(){
          sparkrApp.momentIndex = 0;
          var usersIdx = (++sparkrApp.userIndex) % sparkrApp.momentUsers.length;
          $('#user_moment').removeClass('skip-left');
          sparkrApp.showMoments(usersIdx, sparkrApp.momentIndex);
        }, 1000);
      });

      $('.container').on('click', '#like', function (event) {
                    // debugger;
        console.log('user id is: ' + sparkrApp.user_id);
        console.log('moment id is: ' + sparkrApp.moment_id);
        // console.log('users moments: ' + User.find(user_id).moments);

        event.preventDefault();
        $('#user_moment').addClass('skip-right');
        var usersIdx;
        var momentid = sparkrApp.moment_id;
        var userid = sparkrApp.user_id;
        console.log('about to like', sparkrApp.moment_id);
        setTimeout(function(){
          // console.log("Set Timeout run")
          console.log("Sparkr App Moment Index: " + sparkrApp.momentIndex)
          if (sparkrApp.momentIndex > 1) {
            usersIdx = (++sparkrApp.userIndex) % sparkrApp.momentUsers.length;
            sparkrApp.momentIndex = 0;
            sparkrApp.showMoments(usersIdx, sparkrApp.momentIndex);

          } else {
            usersIdx = (sparkrApp.userIndex)%sparkrApp.momentUsers.length;
            sparkrApp.showMoments(usersIdx, sparkrApp.momentIndex += 1);
          }
          $('#user_moment').removeClass('skip-right');
          console.log('now liking', momentid);
          $.ajax('/likes', {
            type: 'POST',
            data: {
              like: {
                user_id: userid,
                moment_id: momentid
              }
            }
          }).done(function (result) {
            // debugger;
            console.log('im !!!', result);
            if (result.spark === true){
              var $div = $("<div class='got_a_match'/>").text('You have a match with '+ result.user.name);
              $('.container').append($div);
            }  
          });
        }, 1000);
      });
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
    // console.log("Show User run.");
    var userid = $('meta[name="user-id"]').attr('content');
    $.getJSON('/users/' + userid).success(function(user){
      $('#current_user').empty();
      var li = sparkrApp.currentUserHTML(user);
      $('#current_user').append(li);
      sparkrApp.current_user_moments = user.moments; 
      sparkrApp.current_user_profile_pic = user.profile_pic.medium.url; 
      // debugger;
      sparkrApp.momentHTML = Handlebars.compile( $('#momentTemplate').html() );
      sparkrApp.renderCurrentUserMoments();
      sparkrApp.renderCurrentUserProfile();
    });
  },

  showMatchUser: function(userid) {
    $.getJSON('/users/' + userid).success(function(user){
      $('.content-container').empty();
      var li = sparkrApp.currentUserHTML(user);
      $('.content-container').append(li);
      // redo the following to work with a userid
      // sparkrApp.momentHTML = Handlebars.compile( $('#momentTemplate').html() );
      // sparkrApp.renderMoments(user.moments);
    });
  },

  renderMoments: function(moments) { 
    $('#current_user_moments').empty();
    var end = 3;
    if (moments.length < 3){
      end = moments.length;
    }
    for (var i = 0; i < end; i++) {
      var moment = moments[i];
      var li = sparkrApp.momentHTML(moment);  
      $('#current_user_moments').append(li);

    };
  },

  renderCurrentUserMoments: function() { 
    // console.log("Render Current User Moments");
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

  renderCurrentUserProfile: function() { 
      // debugger;
    $('#current_user_profile').empty();

    var url = sparkrApp.current_user_profile_pic;
    var img = $('<img>').attr('src', url);
    $('#current_user_profile').append(img);

    // var imgUrl = user.profile_pic;
    // debugger;
  //     var profile = user.profile_pic;
  //     var img = sparkrApp.momentHTML(moment);  
      // $('#current_user_moments').append(li);

    // };
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
    console.log("Show Moments Called.")


    console.log("\tUser Index passed in: " + userIndex);
    console.log("\tMoment Index: " + momentIndex);
    // console.log("Show Moments Run.")
    var currentUser = sparkrApp.momentUsers[userIndex];
    var userOnShow = currentUser.name;
    sparkrApp.user_id = currentUser.id;
    var momentOnShow = currentUser.moments[momentIndex].content.large.url;
    // console.log("Moment on show: " + momentOnShow);
    // console.log("Last Run URL: " + window.lastRunUrl + "\n");


    if ( window.lastRunUrl !== momentOnShow) {
      sparkrApp.moment_id = currentUser.moments[momentIndex].id;
      $('#user_moment').empty();
      var $m = $('<img>').attr('src', momentOnShow).addClass('moment-image-discover');
      var $u = $('<div>').addClass('moment-name-discover').text(userOnShow);
      $('#user_moment').append($m).append($u);
    }
    console.log('user id is: ' + sparkrApp.user_id);
    console.log('moment id is: ' + sparkrApp.moment_id);

  }

};

$(document).ready(function(){
    Dropzone.autoDiscover = false;
    // sparkrApp.addDropZones();

    if (window.location.hash === '#edit') {
      $('a[title="Edit"]').trigger('click');
      window.location.hash = '';
    } else {
      $('.nav-home a').trigger('click');
    }

    $('.container').on('click', '.match-profile-btn', function(){
      var userid = $(this).closest('.match-box').data('match-id');
      sparkrApp.showMatchUser(userid);
    });

});



 // Handlebars.registerHelper('dateFormat', function(date) {
 //    var date;
 //    if (d != null) {
 //      switch (date)
 //      {
 //      case "shortDate":
 //        d = d.strftime('%d/%m/%Y');
 //        break;
 //      case "mediumDate":
 //        d = d.toUTCString();
 //        break;
 //      case "longDate":
 //        d = d.strftime('%B %d, %Y')
 //        break;
 //      case "fullDate":
 //        d = d.strftime('%A, %B %d, %Y')
 //        break;
 //      default:
 //        d = d.strftime('%d/%m/%Y %H:%M');
 //      }
 //    }
 //    return d;
 //  });
