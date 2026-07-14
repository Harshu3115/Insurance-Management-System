// ========================================
// User Information
// ========================================

const token = localStorage.getItem("token");

const role = localStorage.getItem("role") || "ADMIN";

const roleElement = document.getElementById("role");
if(roleElement){
    roleElement.innerHTML = role;
}

const avatar = document.getElementById("avatar-initial");
if(avatar){
    avatar.innerHTML = role.charAt(0).toUpperCase();
}

const year = document.getElementById("year");
if(year){
    year.innerHTML = new Date().getFullYear();
}


// ========================================
// Logout
// ========================================

function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href="/";

}


// ========================================
// Get Policy Id
// ========================================

const params = new URLSearchParams(window.location.search);

const policyId = params.get("id");


// ========================================
// Load Customers
// ========================================

async function loadCustomers(){

    try{

        const response = await fetch("/api/customers",{

            headers:{
                "X-Auth-Token":token
            }

        });

		if(!response.ok){

		    showError("Unable to load customers.");

		    return;

		}

		const customers = await response.json();

        const select = document.getElementById("customer");

        select.innerHTML =
            '<option value="">Select Customer</option>';

        customers.forEach(customer=>{

            select.innerHTML += `
                <option value="${customer.customerId}">
                    ${customer.firstName} ${customer.lastName}
                </option>
            `;

        });

        if(policyId){

            loadPolicy(policyId);

        }

    }catch(error){

        console.log(error);

        showError("Unable to load customers.");

    }

}


// ========================================
// Load Policy For Edit
// ========================================

async function loadPolicy(id){
	
	console.log("Loading policy:", id);
	
	

    try{

        const response = await fetch("/api/policies/"+id,{

            headers:{
                "X-Auth-Token":token
            }

        });
		
		console.log(response.status);

		if(!response.ok){

		    showError("Unable to load policy.");

		    return;

		}
		
		const policy = await response.json();

        document.getElementById("policyNumber").value =
            policy.policyNumber;

        document.getElementById("policyName").value =
            policy.policyName;

        document.getElementById("policyType").value =
            policy.policyType;

        document.getElementById("insurer").value =
            policy.insurer;

        document.getElementById("sumInsured").value =
            policy.sumInsured;

        document.getElementById("premiumAmount").value =
            policy.premiumAmount;

        document.getElementById("premiumFrequency").value =
            policy.premiumFrequency;

        document.getElementById("coverageTerm").value =
            policy.coverageTerm;

        document.getElementById("startDate").value =
            policy.startDate;

        document.getElementById("endDate").value =
            policy.endDate;

        document.getElementById("status").value =
            policy.status;

			if(policy.customer){

			    document.getElementById("customer").value =
			        policy.customer.customerId;

			}

        document.querySelector(".page-title").innerHTML =
            "Edit Policy";

        document.querySelector(".form-card-head h5").innerHTML =
            "Update Policy";

        document.querySelector(".btn-save").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Policy';

    }catch(error){

        console.log(error);

    }

}


// ========================================
// Success Message
// ========================================

function showSuccess(message){

    const toast = document.getElementById("successToast");

    toast.innerHTML =
        '<i class="fa-solid fa-circle-check"></i> ' + message;

    toast.style.display="flex";

}


// ========================================
// Error Message
// ========================================

function showError(message){

    document.getElementById("errorMessage").innerHTML =
        message;

    document.getElementById("errorToast").style.display =
        "flex";

    setTimeout(()=>{

        document.getElementById("errorToast").style.display =
            "none";

    },3000);

}


// ========================================
// Save Policy
// ========================================

document.getElementById("addPolicyForm")
.addEventListener("submit",async function(e){

    e.preventDefault();
	if(document.getElementById("customer").value===""){

	    showError("Please select a customer.");

	    return;

	}
    const policy = {

        policyNumber:
            document.getElementById("policyNumber").value,

        policyName:
            document.getElementById("policyName").value,

        policyType:
            document.getElementById("policyType").value,

        insurer:
            document.getElementById("insurer").value,

			sumInsured: Number(
			    document.getElementById("sumInsured").value
			),

			premiumAmount: Number(
			    document.getElementById("premiumAmount").value
			),

        premiumFrequency:
            document.getElementById("premiumFrequency").value,

        coverageTerm:
            document.getElementById("coverageTerm").value,

        startDate:
            document.getElementById("startDate").value,

        endDate:
            document.getElementById("endDate").value,

        status:
            document.getElementById("status").value,

        customer:{

            customerId:
                document.getElementById("customer").value

        }

    };

    try{

        const url = policyId
                    ? "/api/policies/"+policyId
                    : "/api/policies";

        const method = policyId
                       ? "PUT"
                       : "POST";

        const response = await fetch(url,{

            method:method,

            headers:{

                "Content-Type":"application/json",

                "X-Auth-Token":token

            },

            body:JSON.stringify(policy)

        });

        if(response.ok){

            sessionStorage.setItem(

                "policySuccess",

                policyId
                ? "Policy Updated Successfully"
                : "Policy Added Successfully"

            );

			showSuccess(

			    policyId
			    ? "Policy Updated Successfully"
			    : "Policy Added Successfully"

			);

			setTimeout(()=>{

			    window.location.href="/policies";

			},1500);

        }else{

            const error = await response.text();

            showError(error);

        }

    }catch(error){

        console.log(error);

        showError("Server Error");

    }

});


// ========================================
// Start
// ========================================

loadCustomers();