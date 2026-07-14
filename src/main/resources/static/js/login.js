
document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const loginData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    try {

		const response = await fetch("http://localhost:8080/api/login", {
		    method: "POST",
		    headers: {
		        "Content-Type": "application/json"
		    },
		    body: JSON.stringify(loginData)
		});

        const data = await response.json();

        if (response.ok && data.token) {

            // Save Token
            localStorage.setItem("token", data.token);

            // Save Role
            localStorage.setItem("role", data.role);

            
            window.location.href = "/dashboard";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});
