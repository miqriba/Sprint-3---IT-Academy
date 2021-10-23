// Detalls de la refactorització:

// addToCart --> applyPromotionsCart --> calculateSubtotals --> calculateTotal

/* Ho he canviat: calcular els descomptes al final de tot no tenia cap sentit perquè significava que havia de calcular els subtotals i total una altra vegada tenint en compte els descomptes. Per tant applyPromotionsCart ha passat a segon lloc i així no crido les funcions calculateSubtotals i calculateTotal dues vegades per sistema.



Al final del document es troben les versions de les funcions per als primers 6 exercicis abans de refactoritzar.*/

var products = [
  {
    name: "Cooking oil",
    price: 10.5,
    type: "grocery",
  },
  {
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
  },
  {
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];
// let cartList = [];
var cart = [];
var subtotal = {
  grocery: {
    value: 0,
    discount: 0,
  },
  beauty: {
    value: 0,
    discount: 0,
  },
  clothes: {
    value: 0,
    discount: 0,
  },
};
let total = 0;

// --⬇️ REFACTORITZAT ⬇️--

function addToCart(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cartList array
  // addToCartList(id);

  let trobat = false;
  for (const a of cart) {
    // si ja hi es ++ quantity
    if (products[id - 1].name === a.name) {
      trobat = true;
      a.quantity++;
      // console.log(
      //   `S'ha trobat l'element ${
      //     products[id - 1].name
      //   } en el cart, ara n'hi ha ${a.quantity}.`
      // );
      break;
    }
  }
  if (!trobat) {
    // si no hi es en cart l'afegim
    // console.log(
    //   `No s'ha trobat l'element ${products[id - 1].name} en el cart. L'afegeim.`
    // );
    cart.push(products[id - 1]);
    cart[cart.length - 1].quantity = 1;
    cart[cart.length - 1].subtotal = 0;
    cart[cart.length - 1].subtotalWithDiscount = 0;
  }
  // -- Refactorització: he decidit que després d'afegir cada producte individual es calculen els descomptes, subtotal i total automàticament, ja que això és el que esperaria de qualsevol web.
  applyPromotionsCart();
  calculateSubtotals();
  calculateTotal();
}

function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  // - Si l'usuari compra 3 o més ampolles d'oli, el preu del producte descendeix a 10 euros.
  // - En comprar-se 10 o més mescles per a fer pastís, el seu preu es rebaixa a 2/3.
  for (const a of cart) {
    switch (a.name) {
      case "Cooking oil":
        if (a.quantity >= 3) {
          a.subtotalWithDiscount = a.quantity * 10;

          // console.log(`S'ha aplicat el descompte per a ${a.name}`);
        }
        break;
      case "Instant cupcake mixture":
        if (a.quantity >= 10) {
          a.subtotalWithDiscount = (a.quantity * a.value * 2) / 3;

          // console.log(`S'ha aplicat el descompte per a ${a.name}`);
        }
        break;
    }
  }
}

function calculateSubtotals() {
  // Primer resetejem tots els subtotals:
  for (const b in subtotal) {
    subtotal[b].value = 0;
    subtotal[b].discount = 0;
  }
  // Aquesta vegada ja estava més comode amb els objectes i els for.. of i for.. in i no m'ha calgut el switch statement:
  for (const a of cart) {
    for (const b in subtotal) {
      if (a.type == b) {
        // si el producte té un descompte, hem de sumar NOMÉS el preu amb descompte i NO el preu sense descomptar: els sumem a subtotal.value i només fem servir value, no discount.
        if (a.subtotalWithDiscount) {
          subtotal[b].discount += a.subtotalWithDiscount;
          subtotal[b].value += a.subtotalWithDiscount;
          // console.log(
          //   `En aquest cas hi havia un subtotal del producte ${a.name} amb descompte que s'ha afegit als subtotals del tipus ${a.type}`
          // );
        } else {
          a.subtotal = a.price * a.quantity;
          subtotal[b].value += a.subtotal;
          // console.log(
          //   `S'ha afegit el valor del producte ${a.name} del cart a l'array de subtotals sota el tipus ${b}.`
          // );}
        }
      }
    }
  }
  console.log(subtotal);
  console.log(cart);
}

function calculateTotal() {
  // Calculate total price of the cart either using the "cartList" array
  total = 0;
  for (let x in subtotal) {
    // CUIDADO: discount i value no son excloients: que en un tipus (grocery) hi hagi discount no vol dir que no hi hagi d'haver value.
    // Com que hem inclos els valors tenint en compte descomptes i tot simplement en subtotal.value, ara només cal sumarlos:
    total += subtotal[x].value;
  }
  console.log(`Total: ${total} $`);
}

function cleanCart() {
  // falta buidar les quantitats
  cartList = [];
  cart = [];
  total = 0;
  for (const x in subtotal) {
    subtotal[x].value = 0;
    subtotal[x].discount = 0;
  }
  console.log("S'ha buidat el carro: ");
  // mostrarCartList();
  mostrarCart();
}
// Exercici 9
function removeFromCart(id) {
  for (const a of cart) {
    a.subtotalWithDiscount = 0;
    if (products[id - 1].name === a.name) {
      if (a.quantity === 1) {
        cart.splice(a);
        console.log(`S'ha suprimit l'element ${a.name} del cart`);
      } else {
        a.quantity--;
        console.log(
          `S'ha reduit la quantitat de l'element ${a.name} del cart de ${
            a.quantity + 1
          } a ${a.quantity}`
        );
      }
    }
  }
  applyPromotionsCart();
  calculateSubtotals();
  calculateTotal();
  console.log(cart);
}

function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
  document.querySelector(".list").innerHTML = "";

  for (const a of cart) {
    if (a.quantity > 1) {
      document.querySelector(
        ".list"
      ).innerHTML += `<li>${a.name} (${a.quantity}) ${a.subtotal} $</li>`;
    } else {
      document.querySelector(
        ".list"
      ).innerHTML += `<li>${a.name} ${a.subtotal} $</li>`;
    }
  }
  document.querySelector(".list").innerHTML += `<h6>Total: ${total} $</h6>`;
}
// function mostrarCartList() {
//   //mostra per consola lestat actual de la cartList
//   console.log("cartList: ");
//   console.log(cartList);
//   // for (i = 0; i < cartList.length; i++) {
//   //   console.log(cartList[i]);
//   // }
// }
function mostrarCart() {
  console.log("Cart: ");
  console.log(cart);
}

// ---⬇️ ABANS DE REFACTORITZAR ⬇️----
//        (Exercicis 1 - 6)

// function addToCart(id) {
// 1. Loop for to the array products to get the item to add to cart
// 2. Add found product to the cartList array
// addToCartList(id);}

// function calculateSubtotals() {
// 1. Create a for loop on the "cartList" array
// 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
// Primer resetejem tots els subtotals:
// for (const x in subtotal) {
//   subtotal[x].value = 0;
// }
// for (const element of cartList) {
//   // ARREGLAR com sentrava en un objecte?
//   // Podria ser més general? que miri els tipus que hi han en el subtotal, no hard coded els if elses
//   switch (element.type) {
//     case "grocery":
//       subtotal.grocery.value += element.price;
//       console.log(
//         `S'ha afegit ${element.price} a grocery, total grocery és ${subtotal.grocery.value}`
//       );
//       break;
//     case "beauty":
//       subtotal.beauty.value += element.price;
//       console.log(
//         `S'ha afegit ${element.price} a beauty, total beauty és ${subtotal.beauty.value}`
//       );
//       break;
//     case "clothes":
//       subtotal.clothes.value += element.price;
//       console.log(
//         `S'ha afegit ${element.price} a clothes, total clothes és ${subtotal.clothes.value}`
//       );
//       break;
//   }
// }
// console.log(subtotal);}

// function addToCartList(id) {
//   // 1. Loop for to the array products to get the item to add to cart
//   //   no he fet loop perquè l'item el puc agafar directament mitjançant products[id - 1]
//   console.log(products[id - 1]);
//   // 2. Add found product to the cartList array
//   // de moment estic afegint el producte sencer com a objecte
//   cartList.push(products[id - 1]);
//   mostrarCartList();
// }

// function generateCart() {
// Using the "cartlist" array that contains all the items in the shopping cart,
// generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
//recorrem cada element del cartList

//   const product = {
//     name: "",
//     price: 0,
//     type: "",
//     quantity: 0,
//     subtotal: 0,
//     subtotalWithDiscount: 0,
//   };
//   cart[product] = [];

//   for (const a of cartList) {
//     let trobat = false;
//     for (i = 0; i < cart.length; i++) {
//       // si ja hi es ++ quantity
//       if (a.name === cart[i].name) {
//         trobat = true;
//         cart[i].quantity++;
//         console.log(
//           `S'ha trobat l'element de cartList ${a} en el cart, ara n'hi ha ${cart[i].quantity}.`
//         );
//         break;
//       }
//     }
//     if (!trobat) {
//       // si no hi es en cart l'afegim
//       console.log(
//         `No s'ha trobat l'element ${a} de cartList en el cart. L'afegeim.`
//       );
//       a.quantity = 1;
//       a.subtotal = 0;
//       a.subtotalWithDiscount = 0;
//       cart.push(a);
//     }
//     mostrarCart();
//   }
// }
