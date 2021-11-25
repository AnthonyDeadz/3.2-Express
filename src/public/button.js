calculation()

function addProduct(id) {
  const product = JSON.parse(
    document.getElementById(id).getAttribute('product-data')
  )
  fetch('http://127.0.0.1:3000/products/', {
    method: 'POST',
    body: JSON.stringify(product),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))

  const btn = document.getElementById(id).querySelector('.add-to-cart')
  btn.innerHTML = 'In Cart'
  btn.classList.add('buy')
  calculation()
}

function deleteItem(id) {
  const product = JSON.parse(
    document.getElementById(id).getAttribute('product-data')
  )
  fetch('http://127.0.0.1:3000/products/delete', {
    method: 'DELETE',
    body: JSON.stringify(product),
    headers: { 'Content-Type': 'application/json' },
  })

  document.getElementById(id).remove()
  const btn = document.getElementById(id).querySelector('.add-to-cart')
  btn.innerHTML = 'Add to Cart'
  btn.classList.remove('buy')
  calculation()
}

function calculation() {
  const allPrice = [...document.querySelectorAll('.list-item-price')]
  const sum = allPrice
    .map((element) => +element.textContent)
    .reduce((sum, current) => sum + current, 0)
  const cost = document.querySelector('.total')
  cost.textContent = '$' + sum
}

function increase(id) {
  const value = document.getElementById(id).querySelector('.input-value')
  let inc = 1
  inc = +inc + 1
  value.textContent = inc
  const price = document.getElementById(id).querySelector('.list-item-price')
  const product = JSON.parse(
    document.getElementById(id).getAttribute('product-data')
  )
  price.textContent = inc * product.price
  calculation()
}

function decrease(id) {
  let value = document.getElementById(id).querySelector('.input-value')
  let dec = value.textContent
  dec = +dec - 1
  if (dec <= 0) {
    dec = 1
  }
  value.textContent = dec
  const price = document.getElementById(id).querySelector('.list-item-price')
  const product = JSON.parse(
    document.getElementById(id).getAttribute('product-data')
  )
  price.textContent = dec * product.price
  calculation()
}
