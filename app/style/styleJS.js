$(function() {
  // On double click the title/text of a list item en/disable it
  $(document).on('dblclick', '.npt-text, .npt-title', function(e) {
    $(this).prop({
      readOnly: false
    });

    $('.npt-text, .npt-title').blur(function() {
      $(this).prop({
        readOnly: true
      });
    });
  });

  // Pressing enter on list item title/text disables it
  $(document).on('keydown', function(e) {
    if(e.which === 13){
      $('.npt-text, .npt-title').prop({
        readOnly: true
      });
    }
  });

});
