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
// Lead Id
// ========================================

const params = new URLSearchParams(window.location.search);

const leadId = params.get("id");


// ========================================
// Load Lead For Edit
// ========================================

async function loadLead(id){

    try{

        const response = await fetch("/api/leads/" + id,{

            headers:{
                "X-Auth-Token":token
            }

        });

        if(!response.ok){

            showError("Unable to load lead.");

            return;

        }

        const lead = await response.json();

        console.log(lead);

        document.getElementById("leadId").value =
            lead.leadId;

        document.getElementById("prospectName").value =
            lead.prospectName;

        document.getElementById("contactInfo").value =
            lead.contactInfo;

        document.getElementById("referralSource").value =
            lead.referralSource;

        document.getElementById("leadStatus").value =
            lead.leadStatus;

        document.getElementById("assignedAgent").value =
            lead.assignedAgent;

        const title=document.querySelector(".page-title");
        if(title){
            title.innerHTML="Edit Lead";
        }

        const head=document.querySelector(".form-card-head h5");
        if(head){
            head.innerHTML="Update Lead";
        }

        const btn=document.querySelector(".btn-save");
        if(btn){
            btn.innerHTML='<i class="fa-solid fa-pen"></i> Update Lead';
        }

    }catch(error){

        console.log(error);

        showError("Unable to load lead.");

    }

}


// ========================================
// Success Toast
// ========================================

function showSuccess(message){

    const toast=document.getElementById("successToast");

    if(!toast){

        alert(message);

        return;

    }

    toast.innerHTML=
    `<i class="fa-solid fa-circle-check"></i> ${message}`;

    toast.style.display="flex";

}


// ========================================
// Error Toast
// ========================================

function showError(message){

    const error=document.getElementById("errorMessage");

    if(error){

        error.innerHTML=message;

    }

    const toast=document.getElementById("errorToast");

    if(toast){

        toast.style.display="flex";

        setTimeout(()=>{

            toast.style.display="none";

        },3000);

    }else{

        alert(message);

    }

}


// ========================================
// Save / Update Lead
// ========================================

document.getElementById("addLeadForm")
.addEventListener("submit",async function(e){

    e.preventDefault();

    const saveBtn=document.querySelector(".btn-save");

    saveBtn.disabled=true;

    saveBtn.innerHTML=
    leadId
    ?'<i class="fa-solid fa-spinner fa-spin"></i> Updating...'
    :'<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

    const lead={

        prospectName:
        document.getElementById("prospectName").value.trim(),

        contactInfo:
        document.getElementById("contactInfo").value.trim(),

        referralSource:
        document.getElementById("referralSource").value.trim(),

        leadStatus:
        document.getElementById("leadStatus").value,

        assignedAgent:
        document.getElementById("assignedAgent").value.trim()

    };

    try{

        const url=
        leadId
        ?"/api/leads/"+leadId
        :"/api/leads";

        const method=
        leadId
        ?"PUT"
        :"POST";

        const response=await fetch(url,{

            method:method,

            headers:{

                "Content-Type":"application/json",

                "X-Auth-Token":token

            },

            body:JSON.stringify(lead)

        });

        if(response.ok){

            sessionStorage.setItem(

                "leadSuccess",

                leadId
                ?"Lead Updated Successfully"
                :"Lead Added Successfully"

            );

            showSuccess(

                leadId
                ?"Lead Updated Successfully"
                :"Lead Added Successfully"

            );

            setTimeout(()=>{

                window.location.href="/leads";

            },1500);

        }else{

            let errorMessage="Unable to save lead.";

            try{

                errorMessage=await response.text();

            }catch(e){}

            showError(errorMessage);

            saveBtn.disabled=false;

            saveBtn.innerHTML=
            leadId
            ?'<i class="fa-solid fa-pen"></i> Update Lead'
            :'<i class="fa-solid fa-floppy-disk"></i> Save Lead';

        }

    }catch(error){

        console.log(error);

        showError("Server Error");

        saveBtn.disabled=false;

        saveBtn.innerHTML=
        leadId
        ?'<i class="fa-solid fa-pen"></i> Update Lead'
        :'<i class="fa-solid fa-floppy-disk"></i> Save Lead';

    }

});


// ========================================
// Start
// ========================================

if(leadId){

    loadLead(leadId);

}