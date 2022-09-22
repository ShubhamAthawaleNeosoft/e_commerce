const URLproducts = "http://localhost:3002/products";
const URLwishlist = "http://localhost:3002/wishlist";





function cardHover() {
    let card = document.querySelectorAll(".product-card");
    let cardDetails = document.querySelectorAll(".card-details");
    let cardbtn = document.querySelectorAll(".card-btn");
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('mouseover', function handleClickEvent() {
            cardDetails[i].style.display = "none"
            cardbtn[i].style.display = "block"
        });
        card[i].addEventListener('mouseout', function handleClickEvent() {
            cardDetails[i].style.display = "block"
            cardbtn[i].style.display = "none"
        });

    }
}
// function wishlishtcolor() {
//     console.log("wish-Ok_madhe_ahe");
//     let heart = document.querySelectorAll(".bi-heart-fill");
//     for (let i = 0; i < heart.length; i++) {
//         heart[i].addEventListener('click', function handleClickEvent() {
//             heart[i].classList.toggle("text-danger");
//         });
//     }
// }


var alreadyInwishlist = false;
function wishlishtItems(pro_id,index) {
    // console.log(this.class)
    let heart = document.querySelectorAll(".bi-heart-fill");
    heart[index].classList.toggle("text-danger");
    
    fetch(URLwishlist)
        .then(res => res.json())
        .then(data => {
            for (i = 0; i < data.length; i++) {
                let wishlistdata = data[i]
                if (wishlistdata.pid == pro_id) {
                    alert("already in Wishlist")
                    alreadyInwishlist = true;
                    location.reload();
                }
            }
            if (!alreadyInwishlist) {
                fetch(URLproducts)
                    .then(res => res.json())
                    .then(data => {
                        for (i = 0; i < data.length; i++) {
                            let productdata = data[i];
                            console.log(productdata.pid)
                            if (productdata.pid == pro_id) {
                                fetch(URLwishlist, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        pro_name: productdata.name,
                                        pro_image: productdata.image,
                                        pro_price: productdata.discountPrice,
                                        // pro_qty:"1",
                                        pid: pro_id,
                                        user_id: uid
                                    }),
                                    headers: {
                                        "Content-type": "application/json; charset=UTF-8"
                                    }
                                })
                                    .then(response => response.json())
                                    .then(json => console.log(json));

                            }
                            else {
                                console.log("error")
                            }
                        }
                        getWishlistItems();

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => {
            console.log(err)

        })
}

getWishlistItems();
var uid = localStorage.getItem("uid");
// console.log(uid);
function getWishlistItems() {
    // console.log("kyy")
    fetch(URLwishlist)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            // console.log(uid)
            let wishlistTable = document.getElementById("wishlist-products");
            for (i = 0; i < data.length; i++) {
                pro_data = data[i];
                if (pro_data.user_id == uid) {
                    // console.log(pro_data);
                    price = pro_data.pro_price;
                    product_id = pro_data.id;
                    pro_pid = pro_data.pid;
                    wishlistTable.innerHTML +=
                        `
                    <tr>
                    <td><img class='cart-img' src='${pro_data.pro_image}'</td>
                    <td>${pro_data.pro_name}</td>
                    <td class="cart-list-price" id='item-price${i}'>${price}</td>
                    <td>
                        <button type="button" class="btn btn-success btn-lg cart-item-delete" onclick="addCart('${pro_pid}')">Add To Cart</button>
                        <button type="button" class="btn btn-danger btn-lg cart-item-delete" onclick='removeWishlistItem(${product_id})'>Remove</button>
                    </td>
                    
                    </tr>
                    `
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
}

function removeWishlistItem(product_id) {
    fetch(URLwishlist + '/' + product_id, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json));

}

// -------------------------------------------------------------------

var createPhoneElement = document.getElementById("pro_listing");
function createElement(data) {
    for (i = 0; i < data.length; i++) {
        createPhoneElement.innerHTML +=
            `<div class="col-md-4">
    <div class="card shadow product-card">
    <div class="d-flex justify-content-center">
        <img class="item-img" src="${data[i].image}" alt="mobile">
        <span class="bi bi-heart-fill" onclick="wishlishtItems('${data[i].pid}','${i}')"></span>
    </div>
    <a href="./product_details.html">
        <h5 class="item-name">${data[i].name}</h5>
    </a>
    <div class="card-details">
        <span class="sub-heading">Color : ${data[i].color}</span>
        <div class="stars">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>    
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star"></i>
        </div>
        <div class="d-lg-flex justify-content-between pricing">
            <span class="price-bold">${data[i].discountPrice}</span>
            <span class="text-decoration-line-through">$${data[i].orignalPrice}</span>
            <span class="discount">(20% Off)</span>
        </div>
        <p class="quantity">Only Few Left!</p>
    </div>
    <div class="card-btn">
        <div class="d-flex flex-column align-items-center ">
            <button class="btn add-to-cart rounded-pill" javascript:this.preventDefault(); onclick="addCart('${data[i].pid}')">Add To Cart</button>
            <button class="btn buy-btn rounded-pill">Buy Now</button>
        </div>
    </div>
</div> 
    </div>`
        cardHover();
    }
}
function filterRedColorProducts() {
    let checkbox = document.getElementById('redcolor');
    if (checkbox.checked != false) {
        createPhoneElement.innerHTML = ""
        fetch(URLproducts)
            .then(res => res.json())
            .then(data => {
                var output = data.filter(data => data.category == "phones" && data.color == "Red");
                createElement(output);
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        createPhoneElement.innerHTML = ""
        removefilter();
    }

}
function filterBlackColorProducts() {
    let checkbox = document.getElementById('blackcolor');
    if (checkbox.checked != false) {
        createPhoneElement.innerHTML = ""
        fetch(URLproducts)
            .then(res => res.json())
            .then(data => {
                var output = data.filter(data => data.category == "phones" && data.color == "Black");
                createElement(output);
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        createPhoneElement.innerHTML = ""
        removefilter();
    }

}


// function filterColorProduct(){
//     let colorCheckBox = document.querySelectorAll("color-input-box");
//     for(i = 0; i < colorCheckBox.length; i++){
//         if (colorCheckBox.checked[i] != false) {
//             console.log("hii blacky");
//         }
//         else{
//             console.log("byyy blacky");
//         }
//     }

//     // console.log(colorCheckBox.value)
// }

function removefilter() {
    fetch(URLproducts)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            var output = data.filter(data => data.category == "phones");
            createElement(output);
        })
        .catch(err => {
            console.log(err)
        })
}

$(document).ready(function () {

    // ----------------------------phone-product---------------------

    // fetch(URLproducts)
    //     .then(res => res.json())
    //     .then(data => {
    //         // console.log(data);
    //         var output = data.filter(data => data.category == "phones");
    //         createElement(output);
    //     })
    //     .catch(err => {
    //         console.log(err)
    // })
    removefilter();
    // ----------------------------filter-red-product---------------------


    // ----------------------------similar-product---------------------
    var createSimilarElement = document.getElementById("similar-pro");
    fetch(URLproducts)
        .then(res => res.json())
        .then(data => {
            for (i = 10; i < 14; i++) {
                createSimilarElement.innerHTML +=
                    `
                     <div class="col-md-3">
                         <div class="card shadow product-card">
                             <div class="d-flex justify-content-center">
                                 <img class="item-img" src="${data[i].image}" alt="mobile">
                                 <span class="bi bi-heart-fill" onclick="wishlishtItems('${data[i].pid}','${i}')"></span>
                             </div>
                             <a href="./product_details.html">
                                 <h5 class="item-name">${data[i].name}</h5>
                             </a>
                             <div class="card-details">
                                 <span class="sub-heading">Color : ${data[i].color}</span>
                                 <div class="stars">
                                     <i class="bi bi-star-fill"></i>
                                     <i class="bi bi-star-fill"></i>
                                     <i class="bi bi-star-fill"></i>    
                                     <i class="bi bi-star-fill"></i>
                                     <i class="bi bi-star"></i>
                                 </div>
                                 <div class="d-lg-flex justify-content-between pricing">
                                     <span class="price-bold">${data[i].discountPrice}</span>
                                     <span class="text-decoration-line-through">$${data[i].orignalPrice}</span>
                                     <span class="discount">(20% Off)</span>
                                 </div>
                                 <p class="quantity">Only Few Left!</p>
                             </div>
                             <div class="card-btn">
                                 <div class="d-flex flex-column align-items-center ">
                                     <button class="btn add-to-cart rounded-pill" onclick="addCart('${data[i].pid}')">Add To Cart</button>
                                     <button class="btn buy-btn rounded-pill">Buy Now</button>
                                 </div>
                             </div>
                         </div>
                         </div>
        `
                cardHover();
            }
        })
        .catch(err => {
            console.log(err)
        })


    // ----------------------------router-product---------------------

    var createRouterElement = document.getElementById("roter-products");
    fetch(URLproducts)
        .then(res => res.json())
        .then(data => {
            for (i = 0; i < 4; i++) {
                pro_id = data.id
                createRouterElement.innerHTML +=
                    `
                    <div class="col-md-3">
                    <div class="card shadow">
                        <div class="d-flex justify-content-center">
                            <img class="item-img" src="${data[i].image}" alt="router">
                        </div>
                        <h4 class="text-center item-name">${data[i].name}</h4>
                        <div class="stars text-center">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star"></i>
                        </div>
                        <div class="d-flex justify-content-center gap-5">
                            <span class="price-bold">${data[i].discountPrice}</span>
                            <span class="text-decoration-line-through">$${data[i].orignalPrice}</span>
                        </div>
                        <div class="text-center">
                            <button class="btn rounded-pill add-to-cart" onclick="addCart('${data[i].pid}')">Add To Cart</button>
                        </div>
                    </div>
                </div>
    `
            }
        })
        .catch(err => {
            console.log(err)
        })
});


