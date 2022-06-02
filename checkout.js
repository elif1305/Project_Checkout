const taxRate = 0.18;
const shippingPrice = 15.0;


//! bonus bilgi:
window.addEventListener('load', ()=>{
    //* set item to localstorage
    localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);   // sayfa yuklendiginde bu degerleri al ve locak storage ta tut demek. 
                                                            // f12 => application => local storage tan bakabilirsin
                                // sen silene kadar gitmez.

     //* set item to sessionstorage
    //  sessionStorage.setItem("taxRate", taxRate);
    //  sessionStorage.setItem("shippingPrice", shippingPrice);
     // kullanici browseri kapattiginda bilgiler gider.
     // cagirirken getstorage kullanarak cagiriyoruz.
})


// normalde foreach ile yapilacak olan olayi biz capturing ile daha kolay yapiyoruz.Bu nedenle asagida capturing ile cozumu olacak.

//* Capturing Method

//? div e tanimlanan eventlistener olayi dolayli olarak div icindeki elementlere eklenmis olur.

//! 1. step : tiklanan yerleri belirleme
// let productsDiv = document.querySelector(".products");
// productsDiv.addEventListener("click", (event)=>{
//     if (event.target.className == 'minus'){          // eger tagin birden fazla class i varsa 'minus' yerine butun classlarin yazilmasi gerekir.
//         console.log("minus button click");
//     } else if (event.target.classList.contains('plus')){
//         console.log('plus button clicked');
//     }else if (event.target.classList.contains('remove-product')){
//         console.log('remove button clicked');
//     }
//     else{
//         console.log("other elements clicked");
//     }
//    // console.log(event.target);                              // event.target bize tiklanan yeri verir. event ile hedeflenen yeri verir.mausun tiklaidigi yer
// })


//! 2. step  : arti eksi butonlarini ekleme

// let productsDiv = document.querySelector(".products");
// productsDiv.addEventListener("click", (event)=>{
//     if (event.target.className == 'minus'){  
//         if ( event.target.nextElementSibling.innerText > 1){  // - ye dusmemesi icin
//         event.target.nextElementSibling.innerText-- ;   
//         }else{
//             if (confirm("product will be deleted?")){           // eger kullanici ok derse silecek , yani confirm i onaylayacak 
//                 event.target.parentElement.parentElement.parentElement.remove();
//             }
//         }
//     } else if (event.target.classList.contains('plus')){
//         event.target.previousElementSibling.innerText++ ;
//         //console.log('plus button clicked');
//     }else if (event.target.classList.contains('remove-product')){
//         event.target.parentElement.parentElement.parentElement.remove();
//        // console.log('remove button clicked');
//     }
//     else{
//         //console.log("other elements clicked");
//     }
   
// })


//! 2. step : hesabin eklenmesi

let productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click", (event)=>{
    if (event.target.className == 'minus'){  
        if ( event.target.nextElementSibling.innerText > 1){  // - ye dusmemesi icin
        event.target.nextElementSibling.innerText-- ; 
        calculateProductAndCartTotal(event.target.parentElement.parentElement.parentElement);  
        }
        else{
            if (confirm("product will be deleted?")){           // eger kullanici ok derse silecek , yani confirm i onaylayacak 
                
                event.target.parentElement.parentElement.parentElement.remove();
                calculateCartTotal();
            }
        }
    } else if (event.target.classList.contains('plus')){
        event.target.previousElementSibling.innerText++ ;
        calculateProductAndCartTotal(event.target.parentElement.parentElement.parentElement);
        //console.log('plus button clicked');
    }else if (event.target.classList.contains('remove-product')){
        event.target.parentElement.parentElement.parentElement.remove();
        calculateCartTotal();
       // console.log('remove button clicked');
    }
    else{
        //console.log("other elements clicked");
    }
   
})


// calculate card and product totals fonction 
const calculateProductAndCartTotal = (productInfoDiv) =>{
// product calculation
console.log(productInfoDiv);
let price = productInfoDiv.querySelector("strong").innerText
let quantity = productInfoDiv.querySelector("#product-quantity").innerText
let productTotalDiv = productInfoDiv.querySelector(".product-line-price");
productTotalDiv.innerText = (price * quantity).toFixed(2);


//card calculation
calculateCartTotal()
} 


// calculate cart totals function
const calculateCartTotal = () =>{
    let productsTotalPriceDivs = document.querySelectorAll(".product-line-price");
    // console.log(productsTotalPriceDivs);
    let subtotal = 0;
    productsTotalPriceDivs.forEach(productsTotalPriceDiv=> {
        subtotal += parseFloat(productsTotalPriceDiv.innerText)
    })
    console.log(subtotal);
    let taxPrice = subtotal * localStorage.getItem("taxRate");
    console.log(taxPrice);

    let shippingPrice = (subtotal > 0 ? parseFloat(localStorage.getItem("shippingPrice")) : 0);
    

    let cartTotal = subtotal + taxPrice + shippingPrice;

    document.querySelector('#cart-subtotal p:nth-child(2)'). innerText = subtotal.toFixed(2);

    document.querySelector('#cart-tax p:nth-child(2)'). innerText = taxPrice.toFixed(2);
    
    document.querySelector('#cart-shipping p:nth-child(2)'). innerText = shippingPrice.toFixed(2);
    
    document.querySelector('#cart-total p:nth-child(2)'). innerText = cartTotal.toFixed(2);

    
} 