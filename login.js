
const validUsername = "Trcac";
const validPassword = "trcac123";

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if (username === validUsername && password === validPassword) {
        
        window.location.href = "index.html";
    } else {
        
        document.getElementById('errorMessage').textContent = "Invalid username or password";
    }
});
