const URLuser = "http://localhost:3002/users";
const URLcheckout = "http://localhost:3002/productsCart";
var checkoutAddress = document.getElementById("checkout-address");
var checkoutCity = document.getElementById("checkout-city");
var checkoutState = document.getElementById("checkout-state");
var checkoutZip = document.getElementById("checkout-zip");
$(document).ready(function () {
    if (uid != "") {
        let dName = document.getElementById("d-name");
        let demail = document.getElementById("d-email");
        let dmobile = document.getElementById("d-mobile");
        let daddress = document.getElementById("d-address");
        let login = false;
        fetch(URLuser)
            .then(res => res.json())
            .then(data => {
                for (i = 0; i < data.length; i++) {
                    let userdata = data[i];
                    if (userdata.id == uid) {
                        // user-details-page
                        dName.innerHTML = `${userdata.fname} ${userdata.lname}`;
                        dmobile.innerHTML = `${userdata.mobile_no}`;
                        demail.innerHTML = `${userdata.email}`;
                        daddress.innerHTML = `${userdata.address},${userdata.city},
                        ${userdata.state},${userdata.zip_code}`;
                        console.log(userdata.address)
                        checkoutAddress.innerHTML =` hello`
                        login = true;
                    }
                    else {
                        let login = false;
                    }
                }
                if (login == false) {
                    alert("somthing wents wrong ");
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    else {
        console.log("something wets wrooooong")
    }
    let checkoutTable = document.getElementById("checkout-table");
    let checkoutTotal = document.getElementById("checkout-total");
    // if (uid != "") {
        if (uid != "") {
            let login = false;
            fetch(URLuser)
                .then(res => res.json())
                .then(data => {
                    for (i = 0; i < data.length; i++) {
                        let userdata = data[i];
                        if (userdata.id == uid) {
                            checkoutAddress.value =`${userdata.address}`
                            checkoutCity.value =`${userdata.city}`
                            checkoutState.value =`${userdata.state}`
                            checkoutZip.value =`${userdata.zip_code}`
                            login = true;
                        }
                        else {
                            let login = false;
                        }
                    }
                    if (login == false) {
                        alert("somthing wents wrong ");
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            console.log("something wets wrooooong")
        }

    let login1 = false;
    fetch(URLcheckout)
        .then(res => res.json())
        .then(data => {
            console.log("hiii")
            console.log(data)
            for (i = 0; i < data.length; i++) {
                let pro_data = data[i];
                if (pro_data.user_id == uid) {
                    checkoutTable.innerHTML +=
                        `
                        <tr>
                        <td><img class='cart-img' src='${pro_data.pro_image}'</td>
                        <td>${pro_data.pro_name}</td>
                        <td>${pro_data.pro_quanity}</td>
                        <td class="cart-list-price" id='item-price${i}'>$${pro_data.ProUpdatedPrice}</td></tr>
                        `
                    login1 = true;
                    checkoutTotal.innerHTML = `
                        <tr>
                            <td colspan="3">Total</td>
                            <td id="total">$${sum}</td>
                        </tr>
                        `
                }
                else {
                    let login1 = false;
                }
            }
            if (login1 == false) {
                alert("somthing wents wrong ");
            }
        })
        .catch(err => {
            console.log(err)
        })
});

function updateAddress(){
    console.log("up me")
    fetch(URLuser + '/' + uid, {
        method: 'PATCH',
        body: JSON.stringify({
            "address": checkoutAddress.value,
            "state": checkoutState.value,
            "city": checkoutCity.value,
            "zip_code": checkoutZip.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}