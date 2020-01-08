window.onload = function () {
  const $form = $('form#js-form')
  const $inputValorContrib = $('#js-valor-contrib')
  const $inputCriadoEm = $('#js-criado-em')
  const $selectParcelas = $('#js-parcelas')
  const $selectFormaPagamento = $('#js-forma-pagamento')
  const $msgSuccess = $('#js-msg-sucesso')
  const $contribItau = $('#js-via-itau')
  const $contribBB = $('#js-via-bb')
  const $contribSantander = $('#js-via-santander')
  const $contribCartao = $('#js-via-cartao')
  const $contribBoleto = $('#js-via-boleto')
  const $loader = $('#js-loader')
  const $pageTitle = $('#js-page-title')
  const url = 'https://script.google.com/macros/s/AKfycbxRCsDwB88yfzA-J0EXC4ge3AbCnztFnehxVzGvnYzDaN8bPqo/exec'

  function preencherParcelas () {
    const value = Number($inputValorContrib.val())
    const formaPagamento = $selectFormaPagamento.val()
    $selectParcelas.find('option').remove()

    if (value <= 0) {
      return
    }

    if (formaPagamento === 'boleto') {
      $selectParcelas.append(new Option(`Parcela única (R$ ${value})`, '1'));
      return
    }

    $selectParcelas.append(new Option(`Parcela única (R$ ${value})`, '1'));
    $selectParcelas.append(new Option(`2 x R$ ${Number(value / 2).toFixed(2)}`, '2'));
    $selectParcelas.append(new Option(`3 x R$ ${Number(value / 3).toFixed(2)}`, '3'));
    $selectParcelas.append(new Option(`4 x R$ ${Number(value / 4).toFixed(2)}`, '4'));
    $selectParcelas.append(new Option(`5 x R$ ${Number(value / 5).toFixed(2)}`, '5'));
    $selectParcelas.append(new Option(`6 x R$ ${Number(value / 6).toFixed(2)}`, '6'));
    $selectParcelas.append(new Option(`7 x R$ ${Number(value / 7).toFixed(2)}`, '7'));
    $selectParcelas.append(new Option(`8 x R$ ${Number(value / 8).toFixed(2)}`, '8'));
    $selectParcelas.append(new Option(`9 x R$ ${Number(value / 9).toFixed(2)}`, '9'));
    $selectParcelas.append(new Option(`10 x R$ ${Number(value / 10).toFixed(2)}`, '10'));
    $selectParcelas.append(new Option(`11 x R$ ${Number(value / 11).toFixed(2)}`, '11'));
    $selectParcelas.append(new Option(`12 x R$ ${Number(value / 12).toFixed(2)}`, '12'));
  }

  function sendFormData (e) {
    e.preventDefault();
    $form.hide()
    $loader.show()
    $inputCriadoEm.val(new Date().toLocaleString('pt-br'))
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form.serialize()
    })
      .done(function () {
        $loader.hide()
        $msgSuccess.show()
        $pageTitle.text('Dados para contribuição')
        const formaPagamento = $form.find('select[name="forma_pagamento"]').val()

        if (formaPagamento === 'itau') {
          $contribItau.show()
        } else if (formaPagamento === 'brasil') {
          $contribBB.show()
        } else if (formaPagamento === 'santander') {
          $contribSantander.show()
        } else if (formaPagamento === 'cartao') {
          $contribCartao.show()
        } else if (formaPagamento === 'boleto') {
          $contribBoleto.show()
        }
      })
  }

  $form.on('submit', sendFormData)
  $inputValorContrib.on('blur', preencherParcelas)
  $selectFormaPagamento.on('change', preencherParcelas)
}