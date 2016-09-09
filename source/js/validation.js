  var validation = function(){
    return {
     _length: function(sel, numb){
       $(sel).each(function(){
        var len = $(this).val().length;
        len<=numb ? $(this).closest('.inp-group').addClass('error-field') : $(this).closest('.inp-group').removeClass('error-field');
      })},
      _email: function(sel){
        $(sel).each(function(){
          var value = $(this).val();
          if (!!value) {
          value.match(/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/img) ? $(this).closest('.inp-group').removeClass('error-field') : $(this).closest('.inp-group').addClass('error-field'); 
          } else $(this).closest('.inp-group').addClass('error-field');
        });
      }
    }
  }();
