var role = localStorage.getItem("role") || "ADMIN";

const roleElement = document.getElementById("role");
if(roleElement){
    roleElement.innerHTML = role;
}

const roleNameElement = document.getElementById("role-name");
if(roleNameElement){
    roleNameElement.innerHTML = role;
}

const avatar = document.getElementById("avatar-initial");
if(avatar){
    avatar.innerHTML = role.charAt(0).toUpperCase();
}

const year = document.getElementById("year");
if(year){
    year.innerHTML = new Date().getFullYear();
}

  function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  }

  document.getElementById("searchInput").addEventListener("keyup", function(){

      let value = this.value.toLowerCase();

      document.querySelectorAll("#policyBody tr").forEach(row=>{

          row.style.display =
              row.innerText.toLowerCase().includes(value)
              ? ""
              : "none";

      });

  });

  const searchInput = document.getElementById("searchInput");

  if(searchInput){

      searchInput.addEventListener("keyup", function(){

          let value = this.value.toLowerCase();

          document.querySelectorAll("#policyBody tr").forEach(row=>{

              row.style.display = row.innerText
                  .toLowerCase()
                  .includes(value)
                  ? ""
                  : "none";

          });

      });

  }

  const statusFilter = document.getElementById("statusFilter");

  if(statusFilter && typeof applyFilters === "function"){

      statusFilter.addEventListener("change", applyFilters);

  }

  setTimeout(function(){
    var t = document.getElementById("successToast");
    if (t) t.style.display = "none";
  }, 4000);


const token = localStorage.getItem("token");

async function loadPolicies(){

    try{

        const response = await fetch("/api/policies",{

            headers:{
                "X-Auth-Token":token
            }

        });

        if(!response.ok){

            throw new Error("Unable to load policies");

        }

        const policies = await response.json();

        let html = "";

        policies.forEach(policy=>{

			html += `
			<tr>

			    <td>${policy.policyId}</td>

			    <td>${policy.policyNumber}</td>

			    <td>${policy.policyName}</td>

			    <td>${policy.policyType}</td>

			    <td>
			        ${policy.customer
			            ? policy.customer.firstName + " " + policy.customer.lastName
			            : "-"}
			    </td>

			    <td>${policy.insurer}</td>

			    <td>₹ ${policy.sumInsured}</td>

			    <td>₹ ${policy.premiumAmount}</td>

			    <td>${policy.coverageTerm}</td>

			    <td>${policy.premiumFrequency}</td>

			    <td>${policy.startDate}</td>

			    <td>${policy.endDate}</td>

			    <td>
			        <span class="status-pill ${policy.status.toLowerCase()}">
			            ${policy.status}
			        </span>
			    </td>

			    <td>

			        <button class="action-btn edit"
			                onclick="editPolicy(${policy.policyId})">

			            <i class="fa-solid fa-pen"></i>

			            Edit

			        </button>

			        <button class="action-btn delete"
			                onclick="deletePolicy(${policy.policyId})">

			            <i class="fa-solid fa-trash"></i>

			            Delete

			        </button>

			    </td>

			</tr>
			`;

        });

        document.getElementById("policyBody").innerHTML = html;

		const entry = document.getElementById("entryCount");

		if(entry){

		    entry.innerHTML =
		        "Showing 1 to " +
		        policies.length +
		        " of " +
		        policies.length +
		        " policies";

		}

    }catch(error){

        console.log(error);

    }

}

loadPolicies();


function editPolicy(id){

    window.location.href = "/policy-form?id=" + id;

}

async function deletePolicy(id){

    if(!confirm("Delete this policy?")){
        return;
    }

    try{

        const response = await fetch("/api/policies/" + id, {

            method: "DELETE",

            headers:{

                "X-Auth-Token": token

            }

        });

        if(response.ok){

            sessionStorage.setItem(
                "policySuccess",
                "Policy Deleted Successfully"
            );

            loadPolicies();

        }else{

            alert("Unable to delete policy.");

        }

    }catch(error){

        console.log(error);

    }

}