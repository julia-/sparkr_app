$(document).ready(function(){
    console.log('dropzone in');

    Dropzone.autoDiscover = false;

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

  var mediaDropzone;
  mediaDropzone = new Dropzone("#media-dropzone");
  return mediaDropzone.on("success", function(file, responseText) {
    var imageUrl;
    console.log(responseText);
    imageUrl = responseText.content.url;
  });

});

var deleteMoment = function (event){
   var $moment = $(this).closest('.moment');
   var id = $moment.data('moment-id'); // id just a number not an jquery object
   $.ajax('/moments/' + id, {
     type: 'POST',
     data: {
       _method: 'DELETE'
     }
   }).done(function(){
     $moment.remove()
   });
 };

$(document).ready(function(){

  $('.moments-container').on('click', '.delete', deleteMoment); 

});