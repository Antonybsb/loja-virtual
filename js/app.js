$(document).ready(function () {
  carousel.eventos.init()
})

const slider = $('.slider')
const slider2 = $('.slider2')
var carousel = {}

carousel.eventos = {
  init: () => {
    carousel.metodos.carregarAlimentos()
    carousel.metodos.carregarMedicamentos()

    process()
  }
}

carousel.metodos = {
  carregarAlimentos: () => {
    var filtro = PRODUTOS['alimentos']
    filtro.forEach(produto => {
      const formattedPrice = produto.price.replace('.', ',')
      $('#itensCarousel').append(
        carousel.templates.itemAlimento({ ...produto, price: formattedPrice })
      )
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
  }
}

carousel.templates = {
  itemAlimento: produto => `
  <div class="card-alimentos">
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
