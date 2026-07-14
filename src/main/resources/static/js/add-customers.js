// ==========================
// User Details
// ==========================

var role = localStorage.getItem("role") || "ADMIN";
document.getElementById("role").innerHTML = role;
document.getElementById("avatar-initial").innerHTML = role.charAt(0).toUpperCase();
document.getElementById("year").innerHTML = new Date().getFullYear();

// ==========================
// Get Customer Id (Edit Mode)
// ==========================

const params = new URLSearchParams(window.location.search);
const customerId = params.get("id");

// If Edit Mode
if (customerId) {

    loadCustomer(customerId);

}

// ==========================
// Logout
// ==========================

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/";

}

// ==========================
// Validation
// ==========================

function setInvalid(id, invalid) {

    var el = document.getElementById(id);

    el.classList.toggle("invalid", invalid);

}

// ==========================
// Success Message
// ==========================

function showSuccess(message) {

    const toast = document.getElementById("successToast");

    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        ${message}
    `;

    toast.style.display = "flex";

}

// ==========================
// Error Message
// ==========================

function showError(message) {

    document.getElementById("errorMessage").innerText = message;

    document.getElementById("errorToast").style.display = "flex";

    setTimeout(() => {

        document.getElementById("errorToast").style.display = "none";

    },3000);

}

// ==========================
// Load Customer For Edit
// ==========================

async function loadCustomer(id){

    try{

        const response = await fetch("/api/customers/" + id,{

            headers:{
                "X-Auth-Token":localStorage.getItem("token")
            }

        });

        if(!response.ok){

            showError("Unable to load customer.");

            return;

        }

        const customer = await response.json();

        document.getElementById("firstName").value = customer.firstName;
        document.getElementById("lastName").value = customer.lastName;
        document.getElementById("email").value = customer.email;
        document.getElementById("phone").value = customer.phone;
        document.getElementById("dob").value = customer.dob;
        document.getElementById("status").value = customer.status;

        // Change Page Title

        document.querySelector(".page-title").innerHTML = "Edit Customer";

        document.querySelector(".form-card-head h5").innerHTML = "Update Customer";

        document.querySelector(".btn-save").innerHTML =
        '<i class="fa-solid fa-pen"></i> Update Customer';

    }
    catch(error){

        console.log(error);

        showError("Server Error");

    }

}

// ==========================
// Save / Update Customer
// ==========================

document.getElementById("addCustomerForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const customer = {

        firstName: document.getElementById("firstName").value.trim(),

        lastName: document.getElementById("lastName").value.trim(),

        email: document.getElementById("email").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        dob: document.getElementById("dob").value,

        status: document.getElementById("status").value

    };

    try{

        // Decide POST or PUT

        const url = customerId
                    ? "/api/customers/" + customerId
                    : "/api/customers";

        const method = customerId
                       ? "PUT"
                       : "POST";

        const response = await fetch(url,{

            method:method,

            headers:{

                "Content-Type":"application/json",

                "X-Auth-Token":localStorage.getItem("token")

            },

            body:JSON.stringify(customer)

        });

        if(response.ok){

            if(customerId){

                sessionStorage.setItem(
                    "customerSuccess",
                    "Customer Updated Successfully"
                );

            }else{

                sessionStorage.setItem(
                    "customerSuccess",
                    "Customer Added Successfully"
                );

            }

            window.location.href="/customers";

        }else{

            const error = await response.text();

            showError(error);

        }

    }
    catch(error){

        console.log(error);

        showError("Unable to connect to the server.");

    }

});