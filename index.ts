import './style.css'

const productInCart: Product[] = []

class Card {
  constructor(product: Product) {
    const parent: HTMLDivElement = document.querySelector('.cards-container')
    const cardsTemplate: HTMLTemplateElement =
      parent.querySelector('.cards-template')
    const newCard: DocumentFragment = document.importNode(
      cardsTemplate.content,
      true
    )

    const img: HTMLImageElement = newCard.querySelector('.card-img')
    img.src = product.img
    const name: HTMLDivElement = newCard.querySelector('.product-name')
    name.textContent = product.name
    const price: HTMLDivElement = newCard.querySelector('.price')
    price.textContent = product.price + ''
    const addButton: HTMLButtonElement = newCard.querySelector('.add-to-cart')

    addButton.addEventListener('click', () => {
      addButton.classList.add('buy')
      addButton.innerHTML = 'In Cart'
      productInCart.push(product)
    })

    parent.appendChild(newCard)
  }
}

interface Product {
  img: string
  name: string
  price: number
}

const allProduct: Product[] = [
  {
    img: '//henderson.ru.airee.cloud/uimages/catalog/product/JT1-0219-N/JT1-0219-N-GREY-5-2.jpg',
    name: 'Costume 1 - there is some kind of description ',
    price: 599,
  },

  {
    img: '//henderson.ru.airee.cloud/uimages/catalog/product/JT1-0219-N/JT1-0219-N-GREY-5-2.jpg',
    name: 'Costume 1 - there is some kind of description ',
    price: 599,
  },

  {
    img: '//henderson.ru.airee.cloud/uimages/catalog/product/JT1-0219-N/JT1-0219-N-GREY-5-2.jpg',
    name: 'Costume 1 - there is some kind of description ',
    price: 599,
  },

  {
    img: '//henderson.ru.airee.cloud/uimages/catalog/product/JT1-0219-N/JT1-0219-N-GREY-5-2.jpg',
    name: 'Costume 1 - there is some kind of description ',
    price: 599,
  },

  {
    img: '//henderson.ru.airee.cloud/uimages/catalog/product/JT1-0219-N/JT1-0219-N-GREY-5-2.jpg',
    name: 'Costume 1 - there is some kind of description ',
    price: 599,
  },

  {
    img: '//henderson.ru.airee.cloud/uimages/catalog/product/JT1-0219-N/JT1-0219-N-GREY-5-2.jpg',
    name: 'Costume 1 - there is some kind of description ',
    price: 599,
  },

  {
    img: '//henderson.ru.airee.cloud/uimages/catalog/product/JT1-0219-N/JT1-0219-N-GREY-5-2.jpg',
    name: 'Costume 1 - there is some kind of description ',
    price: 599,
  },

  {
    img: '//henderson.ru.airee.cloud/uimages/catalog/product/JT1-0219-N/JT1-0219-N-GREY-5-2.jpg',
    name: 'Costume 1 - there is some kind of description ',
    price: 599,
  },
]

allProduct.forEach((product: Product) => new Card(product))

function calculation() {
  const allPrice: Element[] = [...document.querySelectorAll('.list-item-price')]
  const sum: number = allPrice
    .map((element) => +element.textContent)
    .reduce((sum, current) => sum + current, 0)
  const coast: HTMLDivElement = document.querySelector('.total')
  coast.textContent = '$' + sum
}

class Counter {
  public valueInput: HTMLInputElement
  public wrapper: HTMLDivElement
  public pricePerProduct: number

  set value(val: number) {
    this.valueInput.value = isNaN(val) ? '1' : val + ''
  }

  get value(): number {
    return +this.valueInput.value
  }

  constructor(wrapper: HTMLDivElement, pricePerProduct: number) {
    this.wrapper = wrapper
    this.pricePerProduct = pricePerProduct

    const counterTemplate: HTMLTemplateElement =
      document.querySelector('.counter-template')
    const counteContent: DocumentFragment = document.importNode(
      counterTemplate.content,
      true
    )

    this.valueInput = counteContent.querySelector('.input-value')
    const decreaseButton: HTMLInputElement =
      counteContent.querySelector('.button-decrease')
    const increaseButton: HTMLInputElement =
      counteContent.querySelector('.button-increase')

    this.valueInput.onblur = (event: Event) => {
      this.value = +(event.target as HTMLInputElement).value
      if (this.value <= 0) {
        this.value = 1
      }
      this.updatePrice()
      calculation()
    }
    increaseButton.onclick = () => this.increase()
    decreaseButton.onclick = () => this.decrease()

    wrapper.querySelector('.counter-parent').appendChild(counteContent)
  }

  updatePrice() {
    const price: HTMLDivElement = this.wrapper.querySelector('.list-item-price')
    price.textContent = +this.value * this.pricePerProduct + ''
  }

  increase() {
    this.value++
    this.updatePrice()
    calculation()
  }

  decrease() {
    this.value--
    if (this.value <= 0) {
      this.value = 1
    }
    this.updatePrice()
    calculation()
  }
}

function openPopup() {
  const popupParent: HTMLDivElement = document.querySelector('.pop-up-parent')
  const template: HTMLTemplateElement =
    document.querySelector('.pop-up-template')
  const newPopup: DocumentFragment = document.importNode(template.content, true)

  popupParent.appendChild(newPopup)

  productInCart.forEach((product: Product) => {
    const popupListParent: HTMLDivElement =
      document.querySelector('.pop-up-list')
    const templateList: HTMLTemplateElement =
      document.querySelector('.list-template')
    const newListItem: DocumentFragment = document.importNode(
      templateList.content,
      true
    )

    const item: HTMLDivElement = newListItem.querySelector('.list-item')

    const itemName: HTMLDivElement =
      newListItem.querySelector('.list-item-title')
    itemName.textContent = product.name
    const itemPrice: HTMLDivElement =
      newListItem.querySelector('.list-item-price')
    itemPrice.textContent = product.price + ''

    const itemDelete: HTMLButtonElement =
      newListItem.querySelector('.delete-button')

    itemDelete.addEventListener('click', () => {
      return ((arg) => {
        item.remove()
        calculation()
        alert('The item has been deleted from your cart')
        productInCart.splice(productInCart.indexOf(arg), 1)
        const buttons = document.querySelectorAll('.add-to-cart')
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove('buy')
          buttons[i].innerHTML = 'Add to Cart'
        }
      })(product)
    })

    const forCounter: HTMLDivElement = newListItem.querySelector('.list-item')
    new Counter(forCounter, product.price)

    popupListParent.appendChild(newListItem)
  })

  const buy: HTMLButtonElement = document.querySelector('.buy-all-button')
  buy.addEventListener('click', () => {
    if (productInCart == []) {
      alert('You need to add items first')
    } else {
      alert('The courier has been sent to your location')
    }
  })

  const close: HTMLButtonElement = document.querySelector('.close-pop-up')
  close.addEventListener('click', () => {
    document.querySelector('body').style.overflow = 'auto'
    document.querySelector('.pop-up').remove()
  })
}

const open: HTMLLIElement = document.querySelector('.pop-up-open')
open.addEventListener('click', () => {
  document.querySelector('body').style.overflow = 'hidden'
  openPopup()
  calculation()
})
