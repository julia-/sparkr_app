
    // debugger;
$(function() {
  var mediaDropzone;
  mediaDropzone = new Dropzone("#media-dropzone");
  return mediaDropzone.on("success", function(file, responseText) {
    var imageUrl;
    imageUrl = responseText.file_name.url;
  });
});

var maxFiles = function(){
  if($('#current_user_moments li').length == "3"){
    return 0;
  }else if($('#current_user_moments li').length == "2"){
    return 1;
  }else if($('#current_user_moments li').length == "1"){
    return 2;
  }else if($('#current_user_moments li').length == "0"){
    return 3;
  }
};

var limit = maxFiles()

  // debugger;
  // ask jack about this function - event delegation, 
  // so it runs once the moments are on the page
Dropzone.options.mediaDropzone = {

  maxFiles: limit,
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

var deleteMoment = function (event){
   var $moment = $(this).closest('.moment');
   var id = $moment.data('moment-id'); // id just a number not an jquery object
   var $singleMomentForm = $('.single-moment-form');
   $.ajax('/moments/' + id, {
     type: 'POST',
     data: {
       _method: 'DELETE'
     }
   }).done(function(){
     $moment.remove();
     $singleMomentForm.appendTo('.moments-container');
     $singleMomentForm.show();

   });
 };

$(document).ready(function(){
  $('.moments-container').on('click', '.delete', deleteMoment);  
});