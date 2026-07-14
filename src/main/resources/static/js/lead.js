const token = localStorage.getItem("token");

async function loadLeads() {

    try {

        const response = await fetch("/api/leads", {
            headers: {
                "X-Auth-Token": token
            }
        });

        if (!response.ok) {
            throw new Error("Unable to load leads");
        }

        const leads = await response.json();

        let html = "";

        leads.forEach(lead => {

            html += `
            <tr>
                <td>${lead.leadId}</td>
                <td>${lead.prospectName}</td>
                <td>${lead.contactInfo}</td>
                <td>${lead.referralSource}</td>
                <td>
                    <span class="status-pill ${lead.leadStatus.toLowerCase()}">
                        ${lead.leadStatus}
                    </span>
                </td>
                <td>${lead.assignedAgent}</td>
                <td>
				<button class="action-btn edit" onclick="editLead(${lead.leadId})">
				    <i class="fa-solid fa-pen"></i> Edit
				</button>

                    <button class="action-btn delete"
                        onclick="deleteLead(${lead.leadId})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </td>
            </tr>`;
        });

        document.getElementById("leadBody").innerHTML = html;
		updateEntryCount();

    } catch (error) {
        console.error(error);
    }
}

function editLead(id) {
    window.location.href = "/lead-form?id=" + id;
}

async function deleteLead(id){

    if(!confirm("Delete this lead?")){
        return;
    }

    try{

        const response = await fetch("/api/leads/" + id,{

            method:"DELETE",

            headers:{
                "X-Auth-Token":token
            }

        });

        if(response.ok){

            sessionStorage.setItem(
                "leadSuccess",
                "Lead Deleted Successfully"
            );

            await loadLeads();

        }else{

            alert("Unable to delete lead.");

        }

    }catch(error){

        console.log(error);

        alert("Server Error");

    }

}
 loadLeads();

function updateEntryCount(){

    const rows = document.querySelectorAll("#leadBody tr");

    let visible = 0;

    rows.forEach(row=>{

        if(row.style.display !== "none"){

            visible++;

        }

    });

    const entry = document.getElementById("entryCount");

    if(entry){

        entry.innerHTML =
            "Showing " + visible + " of " + rows.length + " leads";

    }

}


const searchInput = document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("keyup", function(){

        const value = this.value.toLowerCase().trim();

        const rows = document.querySelectorAll("#leadBody tr");

        let found = 0;

        rows.forEach(row=>{

            if(row.innerText.toLowerCase().includes(value)){

                row.style.display = "";
                found++;

            }else{

                row.style.display = "none";

            }

        });

        updateEntryCount();

        const noData = document.getElementById("noData");

        if(noData){

            noData.style.display = found === 0 ? "table-row" : "none";

        }

    });

}