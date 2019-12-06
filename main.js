window.onload = function () {
  const $form = $('form#js-form')
  const $msgSuccess = $('#js-msg-sucesso')
  const $btnSubmit = $('#js-form-submit')
  const $contribItau = $('#js-via-itau')
  const $contribBB = $('#js-via-bb')
  const $contribSantander = $('#js-via-santander')
  const $contribCartao = $('#js-via-cartao')
  const $contribBoleto = $('#js-via-boleto')
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
        const formaPagamento = $form.find('select[name="forma_pagamento"]').val()

        if (formaPagamento === 'itau') {
          $contribItau.show()
        }

        if (formaPagamento === 'brasil') {
          $contribBB.show()
        }

        if (formaPagamento === 'santander') {
          $contribSantander.show()
        }

        if (formaPagamento === 'cartao') {
          $contribCartao.show()
        }

        if (formaPagamento === 'boleto') {
          $contribBoleto.show()
        }

      })
  })
}