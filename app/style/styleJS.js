$(() => {
  // On double click the title/text of a list item en/disable it
  $(document).on('dblclick', '.list-item input, .list-item input', function () {
    $(this).prop({
      readOnly: false,
    });

    $('.list-item-title input, .list-item-text input').blur(function () {
      $(this).prop({
        readOnly: true,
      });
    });
  });

  // Pressing enter on list item title/text disables it
  $(document).on('keydown', (e) => {
    if (e.which === 13) {
      $('.list-item-title, .list-item-text').prop({
        readOnly: true,
      });
    }
  });
});
