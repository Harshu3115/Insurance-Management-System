const token = localStorage.getItem("token");

const message = sessionStorage.getItem("customerSuccess");

if(message){

    const successBox = document.getElementById("successToast");

    successBox.style.display = "flex";

    successBox.innerHTML = `
        
        ${message}
    `;

    sessionStorage.removeItem("customerSuccess");

    setTimeout(function(){

        successBox.style.display = "none";

    },3000);

}

async function loadCustomers() {

    try {

        const response = await fetch("/api/customers", {

            headers: {
                "X-Auth-Token": token
            }

        });

        if (!response.ok) {
            throw new Error("Unable to load customers");
        }

        const customers = await response.json();

        let html = "";

        customers.forEach(customer => {

            html += `
            <tr>

                <td>${customer.customerId}</td>

                <td>${customer.firstName}</td>

                <td>${customer.lastName}</td>

                <td>${customer.email}</td>

                <td>${customer.phone}</td>

                <td>

                    <span class="status-pill ${customer.status.toLowerCase()}">

                        ${customer.status}

                    </span>

                </td>

                <td>

				<button class="action-btn edit"
				        onclick="editCustomer(${customer.customerId})">

				    <i class="fa-solid fa-pen"></i>

				    Edit

				</button>

				<button class="action-btn delete"
				        onclick="deleteCustomer(${customer.customerId})">

				    <i class="fa-solid fa-trash"></i>

				    Delete

				</button>

                </td>

            </tr>
            `;

        });

        document.getElementById("customerBody").innerHTML = html;

        document.getElementById("entryCount").innerHTML =
                "Showing 1 to " + customers.length +
                " of " + customers.length + " entries";

    }

    catch(error){

        console.log(error);

    }

}

loadCustomers();




async function deleteCustomer(id){

    if(!confirm("Delete this customer?"))
        return;

    const response = await fetch("/api/customers/" + id,{

        method:"DELETE",

        headers:{
            "X-Auth-Token":token
        }

    });

    if(response.ok){

        alert("Customer Deleted");

        loadCustomers();

    }else{

        alert("Only ADMIN can delete");

    }

}


function editCustomer(id){

    window.location.href = "/customer-form?id=" + id;

}

async function deleteCustomer(id){

    const result = await Swal.fire({

        title: "Delete Customer?",

        text: "This action cannot be undone.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#c0392b",

        cancelButtonColor: "#6c757d",

        confirmButtonText: "Yes, Delete"

    });

    if(!result.isConfirmed){
        return;
    }

    try{

        const response = await fetch("/api/customers/" + id,{

            method:"DELETE",

            headers:{
                "X-Auth-Token":localStorage.getItem("token")
            }

        });

        if(response.ok){

            Swal.fire({

                icon:"success",

                title:"Deleted!",

                text:"Customer deleted successfully.",

                timer:1500,

                showConfirmButton:false

            });

            loadCustomers();

        }else{

            Swal.fire("Error","Unable to delete customer.","error");

        }

    }catch(error){

        Swal.fire("Error","Server Error","error");

    }

}