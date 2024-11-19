function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    
    const validUsername = "user123";
    const validPassword = "pass123";

    if (username === validUsername && password === validPassword) {
        
        window.location.href = "currency-converter.html";
        return false; 
    } else {
        errorMessage.textContent = "Invalid login. Please try again.";
        return false; 
    }
}
