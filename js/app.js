$(document).ready(function () {
  carousel.eventos.init()
})

const slider = $('.slider')
const slider2 = $('.slider2')
var carousel = {}
var MEU_CARRINHO = []

carousel.eventos = {
  init: () => {
    carousel.metodos.carregarAlimentos()
    carousel.metodos.carregarMedicamentos()

    // process()
  }
}

carousel.metodos = {
  // Função para formatar o preço
  formatarPreco: preco => {
    return preco.replace('.', ',')
  },

  carregarAlimentos: () => {
    var filtro = PRODUTOS['alimentos']
    filtro.forEach(produto => {
      produto.price = carousel.metodos.formatarPreco(produto.price)
      $('#itensCarousel').append(carousel.templates.itemAlimento(produto))
    })
    $('#itensCarousel').slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow:
        '<span class="priv_arrow"><i class="fa-solid fa-arrow-left"></i></span>',
      nextArrow:
        '<span class="next_arrow"><i class="fa-solid fa-arrow-right"></i></span>'
    })
  },

  carregarMedicamentos: () => {
    var filtro = PRODUTOS['medicamentos']
    filtro.forEach(produto => {
      produto.price = carousel.metodos.formatarPreco(produto.price)
      $('#itensCarousel2').append(carousel.templates.itemMedicamentos(produto))
    })
    $('#itensCarousel2').slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow:
        '<span class="priv_arrow"><i class="fa-solid fa-arrow-left"></i></span>',
      nextArrow:
        '<span class="next_arrow"><i class="fa-solid fa-arrow-right"></i></span>'
    })
  },

  diminuirQuantidade: id => {
    let quantInput = $(`#quantInput-${id}`)
    let quantAtual = parseInt(quantInput.text())

    if (quantAtual > 0) {
      quantInput.text(quantAtual - 1)
    }
  },

  aumentarQuantidade: id => {
    let quantInput = $(`#quantInput-${id}`)
    let quantAtual = parseInt(quantInput.text())

    quantInput.text(quantAtual + 1)
  },

  adicionarAoCarrinho: id => {
    let quantAtual = parseInt($('#quantInput-' + id).text())

    // Valida se a quantidade atual é maior que zero
    if (quantAtual > 0) {
      // Acessa os produtos de alimentos
      let alimentos = PRODUTOS.alimentos

      // Acessa o elemento pelo id
      let elemento = alimentos.find(e => e.id === id)

      // Se o elemento existe, adicione-o ao carrinho
      if (elemento) {
        // Validar se já existe esse item no carrinho
        let existe = MEU_CARRINHO.find(elem => elem.id === id)

        // Caso já exista no carrinho, só altera a quantidade.
        if (existe !== undefined) {
          let objIndex = MEU_CARRINHO.findIndex(obj => obj.id === id)
          MEU_CARRINHO[objIndex].qntd += quantAtual // Soma a quantidade atual
        } else {
          // Caso ainda não exista o item no carrinho, adiciona ele
          // Adiciona o elemento ao carrinho com a quantidade atual
          elemento.qntd = quantAtual
          MEU_CARRINHO.push(elemento)
        }

        // carousel.metodos.mensagem('Item adicionado ao carrinho', 'green')
        // Atualiza a quantidade na interface para zero
        $('#quantInput-' + id).text(0)

        // Feedback para o usuário
        carousel.metodos.mensagem('Item adicionado ao carrinho', 'green')
      } else {
        // Se o elemento não for encontrado, exiba uma mensagem de erro
        carousel.metodos.mensagem('Produto não encontrado', 'red')
      }
    } else {
      // Se a quantidade atual for zero, exiba uma mensagem de erro ou aviso
      carousel.metodos.mensagem('Selecione uma quantidade válida', 'red')
    }

    carousel.metodos.atualizarBadgeTotal()
  },

  // Atualiza o badge de totais dos botões "Meu carrinho"
  atualizarBadgeTotal: () => {
    var total = 0

    $.each(MEU_CARRINHO, (i, e) => {
      total += e.qntd
    })

    if (total > 0) {
      $('.botao-carrinho').removeClass('hidden')
      $('.container-total-carrinho').removeClass('hidden')
    } else {
      $('.botao-carrinho').addClass('hidden')
      $('.container-total-carrinho').addClass('hidden')
    }

    $('.badge-total-carrinho').html(total)
  },

  //Mensagens
  mensagem: (texto, cor = 'red', tempo = 3500) => {
    console.log('Chamando função mensagem...')
    let id = Math.floor(Date.now() * Math.random()).toString()
    let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`
    console.log('Mensagem criada:', msg)
    $('#container-mensagens').append(msg)

    setTimeout(() => {
      console.log('Removendo classes de animação...')
      $('#msg-' + id).removeClass('fadeInDown')
      $('#msg-' + id).addClass('fadeOutUp')
      setTimeout(() => {
        console.log('Removendo mensagem do DOM...')
        $('#msg-' + id).remove()
      }, 800)
    }, tempo)
  }
}

carousel.templates = {
  itemAlimento: produto => `
  <div class="card-alimentos" id=${produto.id}>
  <img src="${produto.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-subtitle mb-2 text-body-secondary">${produto.name}</h5>
    <p class="card-text">${produto.desc}
    </p>
    <h5 class="card-title" style="color: var(--color-secondary);">R$ ${produto.price}</h5>
  </div>
  <div class="card-footer">
    <div class="row mx-auto py-2">
      <div class="col ">
        <div class="quantidade">
          <span class="btn btn-primary btn-sm" onclick="carousel.metodos.diminuirQuantidade('${produto.id}')"><i class="fa-solid fa-minus"></i></span>
          <span class="btn btn-primary btn-sm" id="quantInput-${produto.id}" >0</span>
          <span class="btn btn-primary btn-sm" onclick="carousel.metodos.aumentarQuantidade('${produto.id}')"><i class="fa-solid fa-plus"></i></span>
          <span class="btn btn-primary btn-sm" onclick="carousel.metodos.adicionarAoCarrinho('${produto.id}')">Comprar</i></span>
        </div>
      </div>
    </div>
  </div>
</div>

  
  `,
  itemMedicamentos: produto => `
    <div class="card-medicamentos">
    <img src="${produto.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-subtitle mb-2 text-body-secondary">${produto.name}</h5>
      <p class="card-text">${produto.desc}
      </p>
      <h5 class="card-title" style="color: var(--color-secondary);">R$ ${produto.price}</h5>
    </div>
    <div class="card-footer">
      <div class="row mx-auto py-2">
        <div class="col ">
          <div class="quantidade">
            <input class="btn btn-primary menos"
              style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"
              type="button" value='-' />
            <input class="btn btn-primary text"
              style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"
              name="quant" class="text" size="1" type="text" value="1" maxlength="5" />
            <input class="btn btn-primary mais"
              style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"
              type="button" value='+' />
            <button class="btn btn-success"
              style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"
              type="submit">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
}
