document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // LOGIN PAGE
    // =========================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            // Stop form from refreshing the page
            event.preventDefault();

            // Get email entered by user
            const email = document.getElementById("email").value;

            // Save email temporarily in browser
            localStorage.setItem("studentEmail", email);


            // =========================
            // CREATE NAME FROM EMAIL
            // =========================

            // Example:
            // admin@gmail.com → admin
            const nameFromEmail = email.split("@")[0];

            // admin → Admin
            const formattedName =
                nameFromEmail.charAt(0).toUpperCase() +
                nameFromEmail.slice(1);

            // Save name
            localStorage.setItem("studentName", formattedName);


            // Go to dashboard
            window.location.href = "dashboard.html";

        });

    }


    // =========================
    // DASHBOARD PAGE
    // =========================

    const dashboardEmail =
        document.getElementById("dashboardEmail");

    const dashboardName =
        document.getElementById("dashboardName");


    // Get saved email
    const savedEmail =
        localStorage.getItem("studentEmail");

    // Get saved name
    const savedName =
        localStorage.getItem("studentName");


    // Display email
    if (dashboardEmail && savedEmail) {

        dashboardEmail.textContent = savedEmail;

    }


    // Display name
    if (dashboardName && savedName) {

        dashboardName.textContent = savedName;

    }

});


// =========================
// LOGOUT FUNCTION
// =========================

function logout() {

    // Remove saved information
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("studentName");

    // Return to home page
    window.location.href = "index.html";

}
