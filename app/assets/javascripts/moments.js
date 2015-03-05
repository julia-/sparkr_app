$(document).ready(function(){
    Dropzone.autoDiscover = false;
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
   event.preventDefault();
 };

$(document).ready(function(){

  $('.container').on('click', '.delete', deleteMoment); 

});