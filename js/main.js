// -------------------- owl-carosel ---------------------
$(document).ready(function () {
    var owl = $('#high-speed-slider');
    owl.owlCarousel({
        items: 1,
        loop: true,
        margin: 60,
        center: true,
    });
});
$(document).ready(function () {
    var owl = $('#img-slider');
    owl.owlCarousel({
        items: 1,
        loop: true,
        margin: 60,
        center: true,
        nav: true,
        navText: [
            "<i class='bi bi-chevron-left'></i>",
            "<i class='bi bi-chevron-right'></i>",
        ]
    });
});

//  ---------------------- register-user ---------------------------

const URL = "http://localhost:3002/users";
const proCartURL = "http://localhost:3002/productsCart"
const proURL = "http://localhost:3002/products"
const URLchekoutCart = "http://localhost:3002/checkoutCart"
fetch(URL)
    .then(res => res.json())
    .then(data => {
        for (i = 0; i < data.length; i++) {
            var abc = data[i].fname;
        }
    })
    .catch(err => {
        console.log("err");

    })

    var fnamenode = document.getElementById("fname");
    var lnamenode = document.getElementById("lname");
    var addressnode = document.getElementById("address");
    var statenode = document.getElementById("state");
    var citynode = document.getElementById("city");
    var zip_codenode = document.getElementById("zip_code");
    var emailnode = document.getElementById("email");
    var mobilenode = document.getElementById("mobile_no");
    var passnode = document.getElementById("pass");
    var cpassnode = document.getElementById("cpass");

    // var fname = fnamenode.value ;
    
function sendUsers() {
    fetch(URL, {
        method: "POST",
        body: JSON.stringify({
            fname: fnamenode.value,
            lname: lnamenode.value,
            address: addressnode.value,
            state: statenode.value,
            city: citynode.value,
            zip_code: zip_codenode.value,
            email: emailnode.value,
            mobile_no: mobilenode.value,
            password: passnode.value,
            cpasseord: cpassnode.value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json));
        window.location.href = "login.html";
}

 var border1 ="1px solid red"
 var border2 ="1px solid green"

let errorFname = document.getElementById("error1");
let errorLname = document.getElementById("error2");
let errorAddress = document.getElementById("error3");
let errorState = document.getElementById("error4");
let errorCity = document.getElementById("error5");
let errorZip = document.getElementById("error6");
let errorEmail = document.getElementById("error7");
let errorMobile = document.getElementById("error8");
let errorPassword = document.getElementById("error9");
let errorCPassword = document.getElementById("error10");

function validate1() {
    errorFname.textContent = "";
    let fname = fnamenode.value;
    let regExp=new RegExp("^[A-Za-z]*$");
    // console.log(regExp.test(fname));
    if (fname == '') {
        errorFname.textContent = "this field is required";
        fnamenode.style.border = border1;
        return false;
    }
    else if(regExp.test(fname)==false){
        errorFname.textContent = "name should have only charecter";
        fnamenode.style.border = border1;
        return false;
    }
    else {
        fnamenode.style.border = border2;
        return true;
    }
}
function validate2() {
    errorLname.textContent = "";
    let lname = lnamenode.value;
    let regExp=new RegExp("^[A-Za-z]*$");
    console.log(regExp.test(lname));
    if (lname == '') {
        errorLname.textContent = "this field is required";
        lnamenode.style.border = border1;
        return false;
    }
    else if(regExp.test(lname)==false){
        errorLname.textContent = "name should have only charecter";
        lnamenode.style.border = border1;
        return false;
    }
    else {
        lnamenode.style.border = border2;
        return true;
    }
}
function validate3() {
    errorAddress.textContent = "";
    let address = addressnode.value;
    let regExp=new RegExp("^[A-Za-z]*$");
    console.log(regExp.test(address));
    if (address == '') {
        errorAddress.textContent = "this field is required";
        addressnode.style.border = border1;
        return false;
    }
    else {
        addressnode.style.border = border2;
        return true;
    }
}
function validate4() {
    errorState.textContent = "";
    let state = statenode.value;
    let regExp=new RegExp("^[A-Za-z]*$");
    console.log(regExp.test(state));
    if (state == '') {
        errorState.textContent = "this field is required";
        statenode.style.border = border1;
        return false;
    }
    else {
        statenode.style.border = border2;
        return true;
    }
}
function validate5() {
    errorCity.textContent = "";
    let city = citynode.value;
    let regExp=new RegExp("^[A-Za-z]*$");
    console.log(regExp.test(city));
    if (city == '') {
        errorCity.textContent = "this field is required";
        citynode.style.border = border1;
        return false;
    }
    else {
        citynode.style.border = border2;
        return true;
    }
}

function validate6() {
    errorZip.textContent = "";
    let regExp=new RegExp("^[0-9]*$");
    let zip =zip_codenode.value;
    if (zip == '') {
        errorZip.textContent = "this field is required";
        mobilenode.style.border = border1;
        return false;
    }
    else if(regExp.test(zip)==false){
        errorZip.textContent = "Zip Code only contains digit";
        zip_codenode.style.border = border1;
        return false;
    }
    else {
        zip_codenode.style.border = border2;
        return true;
    }
}

function validate7() {
    errorEmail.textContent = "";
    let email = emailnode.value;
    let ss=email.substring(email.indexOf('@')+1);
    if (email == '') {
        errorEmail.textContent = "this field is required";
        emailnode.style.border = border1;
        return false;
    }
    else if(!email.includes('@')|| ss==''){
        errorEmail.textContent = "Please put valid email id";
        emailnode.style.border = border1;
        return false;
    }
    else {
        emailnode.style.border = border2;
        return true;
    }

}
function validate8() {
    errorMobile.textContent = "";
    let regExp=new RegExp("^[0-9]*$");
    let mobile = mobilenode.value;
    if (mobile == '') {
        errorMobile.textContent = "this field is required";
        mobilenode.style.border = border1;
        return false;
    }
    else if(regExp.test(mobile)==false){
        errorMobile.textContent = "Mobile no only contains digit";
        mobilenode.style.border = border1;
        return false;
    }
    else if(mobile.length!=10){
        errorMobile.textContent = "plese enter valid mobile no";
        mobilenode.style.border = border1;
        return false;
    }
    else {
        mobilenode.style.border = border2;
        return true;
    }
}

function validate9() {
    errorPassword.innerHTML = "";
    let regExp=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
    let pass = passnode.value;
    if (pass == '') {
        errorPassword.textContent = "this field is required";
        passnode.style.border = border1;
        return false;
    }
    else if(regExp.test(pass)==false){
        let spanNode=document.createElement("span");
        spanNode.textContent="the pass should contain at least one";
        let ulNode=document.createElement("ul");
        let liNode1=document.createElement("li");
        liNode1.textContent="Small letter";
        let liNode2=document.createElement("li");
        liNode2.textContent="Capital letter";
        let liNode3=document.createElement("li");
        liNode3.textContent="One symbol";
        let liNode4=document.createElement("li");
        liNode4.textContent="One number";
        ulNode.append(liNode1,liNode2,liNode3,liNode4);
        errorPassword.append(spanNode,ulNode);
        passnode.style.border = border1;
        return false;
    }
    else if(pass.length<5 || pass.length>12){
        errorPassword.textContent = "password should be atleast 5 & atmost 12 chars";
        passnode.style.border = border1;
        return false;
    }
    else {
        passnode.style.border = border2;
        return true;
    }
    //  pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,10}"
}

function validate10() {
    errorCPassword.textContent = "";
    let cpass = cpassnode.value;
    let pass = passnode.value;
    if (cpass == '') {
        errorCPassword.textContent = "this field is required";
        cpassnode.style.border = border1;
        return false;
    }
    else if(cpass!==pass){
        errorCPassword.textContent = "password should be Matched";
        cpassnode.style.border = border1;
        return false;
    }
    else {
        cpassnode.style.border = border2;
        return true;
    }
}

function validateForm(){
    let st1=validate1();
    let st2=validate2();
    let st3=validate3();
    let st4=validate4();
    let st5=validate5();
    let st6=validate6();
    let st7=validate7();
    let st8=validate8();
    let st9=validate9();
    let st10=validate10();
    return st1 && st2 && st3 && st4 && st5 && st6 && st7 && st8 && st9 && st10;

}














function checkuser() {
    // localStorage.removeItem("uid");
    let login_email = document.getElementById("login-email").value;
    let login_pass = document.getElementById("login-pass").value;
    let login = false;
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            for (i = 0; i < data.length; i++) {
                var userdata = data[i];
                if (userdata.email === login_email && userdata.password === login_pass) {
                    localStorage.setItem("uid", userdata.id);
                    window.location.href = "index.html";
                    console.log("sucess");
                    dName.innerHTML = `${userdata.fname} hiiiiiiiiii`
                    console.log(dName);
                    login = true
                }
                else {
                    login = false;
                }
            }
            if (login == false) {
                console.log("regret");
                alert("regret");
            }
        })
        .catch(err => {
            console.log(err)

        })
}


function user_logout() {
    console.log("log out")
    localStorage.removeItem("uid");
    window.location.href = "login.html";

}

// index page header
var uid = localStorage.getItem("uid");

var module = document.getElementById("module");

function show() {
    module.classList.add("show");
}
function closeMenu() {
    module.classList.remove("show");
}


const heart = document.querySelectorAll(".bi-heart-fill");
for (let i = 0; i < heart.length; i++) {
    heart[i].addEventListener('click', function handleClickEvent() {
        heart[i].classList.toggle("text-danger")
    });
}


// var page_body = document.querySelector("body");
// console.log(page_body);
// page_body.addEventListener('click', () => {

// })


var cart = document.getElementById("cart-model");

function showcart() {
    cart.classList.add("cart-show");
}
function closecart() {
    cart.classList.remove("cart-show");

}



var cartTable = document.getElementById("cart-table");
var checkoutBtn = document.getElementById("checkout-btn");
var total = document.getElementById("total");
var alreadyInCart = false
function addCart(pro_id) {

    fetch(proCartURL,)
        .then(res => res.json())
        .then(data => {
            for (i = 0; i < data.length; i++) {
                let cartdata = data[i]
                if (cartdata.pid == pro_id) {
                    alert("already in  cart")
                    alreadyInCart = true;
                    location.reload();
                }
            }
            if (!alreadyInCart) {
                fetch(proURL,)
                    .then(res => res.json())
                    .then(data => {
                        for (i = 0; i < data.length; i++) {
                            let productdata = data[i];
                            console.log(productdata.pid)
                            if (productdata.pid == pro_id) {
                                fetch(proCartURL, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        pro_name: productdata.name,
                                        pro_image: productdata.image,
                                        pro_price: productdata.discountPrice,
                                        ProUpdatedPrice: productdata.discountPrice,
                                        pro_quanity: "1",
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
                        getCartItems();
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

getCartItems()
function pricetotal() {

    // console.log("prictoto");
    totalitem = document.querySelectorAll(".cart-list-price");
    sum = 0;
    for (i = 0; i < totalitem.length; i++) {
        // console.log(totalitem[i].innerHTML);
        var tprice = parseInt(totalitem[i].innerHTML);
        sum += tprice;
    }
    // console.log(" Final Tot: 2nd " +sum);
    total.innerHTML = "$" + sum;
}

function getCartItems() {

    // console.log(pro_id);
    fetch(proCartURL)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            // console.log(uid)
            for (i = 0; i < data.length; i++) {
                pro_data = data[i];
                if (pro_data.user_id == uid) {
                    // console.log(pro_data);
                    price = pro_data.pro_price;
                    updatePrice = pro_data.ProUpdatedPrice;
                    product_id = pro_data.id;
                    cartTable.innerHTML +=
                        `
                <tr>
                <td><button type="button" class="btn btn-danger cart-item-delete" onclick='removeItem(${product_id})'><i class="bi bi-x-lg"></i></button></td>
                <td><img class='cart-img' src='${pro_data.pro_image}'</td>
                <td>${pro_data.pro_name}</td>
                <td>
                    <button type="button" class="action-btn" onclick='decrement(${i},${product_id},${price})'>-</button>
                    <input id='${i}'  type='text' class='cart-quantity' value='${pro_data.pro_quanity}''>
                    <button class="action-btn" onclick='increment(${i},${product_id},${price})'>+</button>
                </td>
                <td class="cart-list-price" id='item-price${i}'>${updatePrice}</td>
                
                </tr>
                `
                }

            }
            pricetotal()
            checkoutBtn.innerHTML =
                `<button type="button" class="btn text-white btn-lg btn-info" onclick="checkout(${sum})">Checkout</button>`

        })
        .catch(err => {
            console.log(err)
        })
}



function increment(i, Pro_id, OrignalPrice) {
    // console.log(i)
    
    let qty = document.getElementById(i).value
    let inpvalue = parseInt(qty);
    let upgraded = inpvalue + 1;
    document.getElementById(i).value = upgraded;
    OrignalPrice = upgraded * OrignalPrice;
    // document.getElementById("item-price" + i).innerHTML = price;
    fetch(proCartURL + '/' + Pro_id, {
        method: 'PATCH',
        body: JSON.stringify({
            pro_quanity: upgraded,
            ProUpdatedPrice: OrignalPrice,
            
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
    pricetotal(price);
    // console.log(upgraded);
}
function decrement(i, Pro_id, OrignalPrice) {
    let qty = document.getElementById(i).value;
    let inpvalue = parseInt(qty);
    if (inpvalue == 1) {
        inpvalue = 1;
        document.getElementById(i).value = inpvalue;
    }
    else {
        let upgraded = inpvalue - 1;
        document.getElementById(i).value = upgraded;
        OrignalPrice = upgraded * OrignalPrice;
        // console.log(price);
        // document.getElementById("item-price" + i).innerHTML = price;
        fetch(proCartURL + '/' + Pro_id, {
            method: 'PATCH',
            body: JSON.stringify({
                pro_quanity: upgraded,
                ProUpdatedPrice: OrignalPrice,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        pricetotal(price);
    }
}

function removeItem(product_id) {
    fetch(proCartURL + '/' + product_id, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json));

}


function togglecard() {
    var filtercard = document.getElementById("filter");
    filtercard.classList.toggle("active")
}

function priceRange() {
    var value = (this.value - this.min) / (this.max - this.min) * 100
    this.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + value + '%, #fff ' + value + '%, white 100%)'
};

function checkout() {
    // console.log("byyy byy bro");
    // console.log(total.innerHTML)
    // console.log(sum);
    fetch(proCartURL)
        .then(res => res.json())
        .then(data => {
            for (i = 0; i < data.length; i++) {
                pro_data = data[i];
                if (pro_data.user_id == uid) {
                    // console.log(pro_data);
                    price = pro_data.pro_price;
                    product_id = pro_data.id;
                }

            }
            pricetotal()
        })
        .catch(err => {
            console.log(err)
        })
        window.location.href="checkout.html"

    }
// checkout()

