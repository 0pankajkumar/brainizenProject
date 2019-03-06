$(document).ready(function(){
    $('#purpose').on('change', function() {
      if ( this.value == '1')
      {
        $("#domain1").show();
      }
      else
      {
      	$("#domain1").hide();
      }
      if ( this.value == '2')
      {
        $("#domain2").show();
      }
      else
      {
      	$("#domain2").hide();
      }
    });
    
});


