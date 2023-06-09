

    // SECTION - funcion agregar producto



  async function addProduct(endpoint,prodId) {
     
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({prodId: prodId})
      }
    
      return await fetch(`http://localhost:4040/api/carts/${endpoint}`, options)
    }


    // SECTION - funcion borrar un producto



    async function deleteSingleProduct(endpoint,prodId){
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({prodId: prodId, cartId: endpoint})
      }

      const row = document.getElementById(`${prodId}`)
      row.innerHTML = ""
    
      return await fetch(`http://localhost:4040/api/carts/${endpoint}/products/${prodId}`, options)
    }



    // SECTION - funcion vaciar el carrito



    async function deleteProducts(cartId){
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }
      const msg = document.getElementById('warningMsg')
      const message = document.getElementById('emptyMessage')
      const cart = document.getElementById('cartItems')
      const deleteButton = document.getElementById('empty')

      cart.innerHTML = ""
      deleteButton.innerHTML = ""
      msg.innerHTML = ""
      message.innerHTML= `<p>El carrito esta vacio!</p>`
    
      return await fetch(`http://localhost:4040/api/carts/${cartId}`, options)
    }



      // SECTION - funcion actualizar cantidad



      async function updateProductQty(endpoint,prodId, actVal){
        const msg = document.getElementById('warningMsg')
        const inputVal = document.getElementById('inputVal').value
        const quantityRendered = document.getElementById('productQty')
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({cartId: endpoint, prodId: prodId, qty: inputVal, actVal: actVal})
        }

        if(inputVal < 0){
          msg.innerHTML = 'debes poner al menos una cantidad valida!'
        } else{
          quantityRendered.innerHTML = inputVal
          msg.innerHTML = ''
          return await fetch(`http://localhost:4040/api/carts/${endpoint}/products/${prodId}`, options)
        }

        
      }

