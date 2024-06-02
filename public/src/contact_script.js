document.addEventListener("DOMContentLoaded", function () {
    // Handle form submission
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Send message data to server
        fetch("/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => {
            if (response.ok) {
                // alert("Message sent successfully!");
                document.getElementById("name").value = ""; 
                document.getElementById("email").value = ""; 
                document.getElementById("message").value = ""; 
            } else {
                alert("Failed to send message. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again later.");
        });
    });
});
