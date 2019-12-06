window.onload = function () {
  const $form = $('form#js-form')
  const $msgSuccess = $('#js-sucesso')
  const $btnSubmit = $('#js-form-submit')
  const url = 'https://script.google.com/macros/s/AKfycbxRCsDwB88yfzA-J0EXC4ge3AbCnztFnehxVzGvnYzDaN8bPqo/exec'

  $btnSubmit.on('click', function(e) {
    e.preventDefault();
    const jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form.serialize()
    })
      .done(function () {
        $form.hide()
        $msgSuccess.show()
      })
  })
}