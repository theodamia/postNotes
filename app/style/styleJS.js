$(function() {
  // On double click the title/text of a list item en/disable it
  $(document).on('dblclick', '.plist__item-title input, .plist__item-text input', function(e) {
    $(this).prop({
      readOnly: false
    });

    $('.plist__item-title, .plist__item-text').blur(function() {
      $(this).prop({
        readOnly: true
      });
    });
  });

  // Pressing enter on list item title/text disables it
  $(document).on('keydown', function(e) {
    if(e.which === 13){
      $('.plist__item-title, .plist__item-text').prop({
        readOnly: true
      });
    }
  });

});
