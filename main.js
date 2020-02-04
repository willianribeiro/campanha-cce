window.onload = function () {
  const $form = $('form#js-form')
  const $selectCota = $('#js-tipo-cota')
  const $sectionContact = $('#js-section-contact')
  const $sectionCotaUnica = $('#js-section-cota-unica')
  const $labelItauCota = $('#js-itau-cota-label')
  const $contribBB = $('#js-via-bb')
  const $labelBB = $('#js-bb-cota-label')
  const $contribSantander = $('#js-via-santander')
  const $labelSantander = $('#js-santander-cota-label')
  const $inputValorContrib = $('#js-valor-contrib')
  const $inputPhone = $('#js-phone')
  const $inputCriadoEm = $('#js-criado-em')
  const $selectFormaPagamento = $('#js-forma-pagamento')
  const $msgSuccess = $('#js-msg-sucesso')
  const $sectionContribItau = $('#js-via-itau')
  const $contribCartao = $('#js-via-cartao')
  const $labelCartao = $('#js-cartao-cota-label')
  const $loader = $('#js-loader')
  const $pageTitle = $('#js-page-title')
  const url = 'https://script.google.com/macros/s/AKfycbxRCsDwB88yfzA-J0EXC4ge3AbCnztFnehxVzGvnYzDaN8bPqo/exec'

  function validateFormData () {
    const cota = $selectCota.val()

    if (cota === 'cota_3000plus') {
      const valueStr = $inputValorContrib.val().split('.').join('').split(',')[0]
      const value = Number(valueStr)

      if (value <= 3000) {
        alert('O valor deve ser maior que R$ 3.000,00')
        $inputValorContrib.focus()
        return false
      }
    }

    return true
  }

  function sendFormData (e) {
    e.preventDefault()
    if (!validateFormData()) {
      return
    }

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
        $pageTitle.text('Formulário enviado com sucesso!')
        const formaPagamento = $selectFormaPagamento.val()

        if (formaPagamento === 'itau') {
          $sectionContribItau.show()
          const label = $selectCota.children("option:selected").html()
          $labelItauCota.text(label)
        } else if (formaPagamento === 'brasil') {
          $contribBB.show()
          const label = $selectCota.children("option:selected").html()
          $labelBB.text(label)
        } else if(formaPagamento === 'santander') {
          $contribSantander.show()
          const label = $selectCota.children("option:selected").html()
          $labelSantander.text(label)
        } else if (formaPagamento === 'cartao') {
          const cota = $selectCota.val()
          const label = $selectCota.children("option:selected").html()
          $contribCartao.show()
          $labelCartao.text(label)
          if (cota === 'cota_300') {
            $('#js-cota-300').show()
          } else if (cota === 'cota_500') {
            $('#js-cota-500').show()
          } else if (cota === 'cota_750') {
            $('#js-cota-750').show()
          } else if (cota === 'cota_1250') {
            $('#js-cota-1250').show()
          } else if (cota === 'cota_3000') {
            $('#js-cota-3000').show()
          } else if (cota === 'cota_3000plus') {
            $('#js-cota-3000plus').show()
          }
        }
      })
  }

  function cotaChanged () {
    const cota = $selectCota.val()

    if (cota === '') {
      $sectionCotaUnica.hide()
      $sectionContact.hide()
      return
    }

    if (cota === 'cota_3000plus') {
      $sectionCotaUnica.show()
    } else {
      $inputValorContrib.val('')
      $sectionCotaUnica.hide()
    }

    $sectionContact.show()
  }

  $form.on('submit', sendFormData)
  $selectCota.on('change', cotaChanged)
  $inputValorContrib.mask('#.##0,00', { reverse: true, placeholder: 'R$ 0,00' })
  $inputPhone.mask('(00) 00000-0000', { placeholder: '(99) 98888-8888' })
}
