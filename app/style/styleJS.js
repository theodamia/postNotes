$(document).on('dblclick', '.npt-text', function(e) {

    $('.npt-text').prop({
      readOnly: false
    });

    $('.npt-text').blur(function() {
      $(this).prop({
        readOnly: true
      });
    });

    $(".npt-text").keypress(function(e) {
      if(e.which == 13) {
        $('.npt-text').prop({
          readOnly: true
        });
      }
    });
});
