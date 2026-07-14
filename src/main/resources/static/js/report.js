// =========================================
// User Information
// =========================================

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

const today = document.getElementById("todayLabel");
if(today){
    today.innerHTML = new Date().toLocaleDateString(
        "en-GB",
        {
            weekday:"long",
            day:"2-digit",
            month:"long",
            year:"numeric"
        }
    );
}

// =========================================
// Logout
// =========================================

function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href="/";

}

// =========================================
// Load Report
// =========================================

async function loadReports(){

    try{

        const customerResponse =
        await fetch("/api/customers",{

            headers:{
                "X-Auth-Token":token
            }

        });

        const policyResponse =
        await fetch("/api/policies",{

            headers:{
                "X-Auth-Token":token
            }

        });

        const leadResponse =
        await fetch("/api/leads",{

            headers:{
                "X-Auth-Token":token
            }

        });

		
		console.log("Customer Status:", customerResponse.status);
		console.log("Policy Status:", policyResponse.status);
		console.log("Lead Status:", leadResponse.status);
		
		
        const customers =
        await customerResponse.json();

        const policies =
        await policyResponse.json();

        const leads =
        await leadResponse.json();
		
		
		console.log("Customer Status:", customerResponse.status);
		console.log("Policy Status:", policyResponse.status);
		console.log("Lead Status:", leadResponse.status);

		console.log("Customers:", customers);
		console.log("Policies:", policies);
		console.log("Leads:", leads);

		console.log(document.getElementById("customerCount"));
		console.log(document.getElementById("policyCount"));
		console.log(document.getElementById("leadCount"));
		console.log(document.getElementById("activePolicyCount"));
		
		
        // ===========================
        // Dashboard Cards
        // ===========================

        document.getElementById("customerCount").innerHTML =
        customers.length;

        document.getElementById("policyCount").innerHTML =
        policies.length;

        document.getElementById("leadCount").innerHTML =
        leads.length;

        const activePolicies =
        policies.filter(p=>p.status==="ACTIVE").length;

        document.getElementById("activePolicyCount").innerHTML =
        activePolicies;

        // ===========================
        // Customer Report
        // ===========================

        let customerHtml="";

        customers.forEach(customer=>{

            customerHtml +=`

            <tr>

                <td>${customer.firstName} ${customer.lastName}</td>

                <td>${customer.email}</td>

                <td>${customer.mobile}</td>

                <td>

                    <span class="badge b-active">

                        Active

                    </span>

                </td>

            </tr>

            `;

        });

        document.getElementById("customerReportBody").innerHTML =
        customerHtml;

        // ===========================
        // Policy Report
        // ===========================

        let policyHtml="";

        policies.forEach(policy=>{

            policyHtml +=`

            <tr>

                <td>${policy.policyNumber}</td>

                <td>

                    ${
                        policy.customer
                        ?
                        policy.customer.firstName+" "+policy.customer.lastName
                        :
                        "-"
                    }

                </td>

                <td>

                    ₹ ${policy.premiumAmount}

                </td>

                <td>

                    <span class="badge">

                        ${policy.status}

                    </span>

                </td>

            </tr>

            `;

        });

        document.getElementById("policyReportBody").innerHTML =
        policyHtml;

        // ===========================
        // Lead Report
        // ===========================

        let leadHtml="";

        leads.forEach(lead=>{

            leadHtml +=`

            <tr>

                <td>${lead.prospectName}</td>

                <td>${lead.assignedAgent}</td>

                <td>

                    <span class="badge">

                        ${lead.leadStatus}

                    </span>

                </td>

                <td>

                    ${new Date().toLocaleDateString()}

                </td>

            </tr>

            `;

        });

        document.getElementById("leadReportBody").innerHTML =
        leadHtml;

    }

    catch(error){

        console.log(error);

    }

}

loadReports();

// =========================================
// Search
// =========================================

const searchBtn =
document.getElementById("searchBtn");

if(searchBtn){

    searchBtn.addEventListener("click",function(){

        const reportType =
        document.getElementById("reportType").value;

        alert("Searching : "+reportType);

    });

}

// =========================================
// Export Excel
// =========================================

const excelBtn =
document.getElementById("excelBtn");

if(excelBtn){

    excelBtn.addEventListener("click",function(){

        alert("Excel Export Coming Soon");

    });

}

// =========================================
// Export PDF
// =========================================

const pdfBtn =
document.getElementById("pdfBtn");

if(pdfBtn){

    pdfBtn.addEventListener("click",function(){

        alert("PDF Export Coming Soon");

    });

}

// =========================================
// Print
// =========================================

const printBtn =
document.getElementById("printBtn");

if(printBtn){

    printBtn.addEventListener("click",function(){

        window.print();

    });

}