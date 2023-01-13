// variables for display
const aboutSection = document.getElementById("about");
const loginSection = document.getElementById("login");
const registerSection = document.getElementById("register");
const dashboardSection = document.getElementById("dashboard");

// variables for buttons 
const registerButton = document.getElementById("register-btn");
const loginButton = document.getElementById("login-btn");
const logoutButton = document.getElementById("logout-btn");
const registerButton1 = document.getElementById("register-btn1");
const loginButton1 = document.getElementById("login-btn1");



// action for display 
function showAbout() {
    loginSection.style.display = "none";
    registerSection.style.display = "none";
    dashboardSection.style.display = "none";
    aboutSection.style.display = "block";
}

function showLogin() {
    loginSection.style.display = "block";
    registerSection.style.display = "none";
    dashboardSection.style.display = "none";
    aboutSection.style.display = "none";
}

function showRegister() {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
    dashboardSection.style.display = "none";
    aboutSection.style.display = "none";
}

function showDashboard() {
    loginSection.style.display = "none";
    registerSection.style.display = "none";
    dashboardSection.style.display = "block";
    aboutSection.style.display = "none";   
} 
    
    

// register and login buttons 
registerButton.addEventListener("click",function(){
    showRegister();
});

loginButton.addEventListener("click",function(){
    showLogin();
});


registerButton1.addEventListener("click", function(){
    showRegister();
})


loginButton1.addEventListener("click", function(){
    showLogin();
})

// Dashboard logout button

logoutButton.addEventListener("click",function(){
    showAbout();
});



// Registration

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", e => {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm-email").value;
    
    // Validation data
   
    if(email !== confirmEmail){
        alert("Adresy email nie są takie same");
        return;
    }

    if(username.length < 6 || username.length > 16){
        alert("Nazwa użytkownika musi mieć od 6 do 16 znaków");
        return;
    }

    if(!username.match(/^[A-za-z0-9]+$/)){
        alert("Nazwa użytkownika może zawierać tylko litery i cyfry");
        return;
    }

    if (password.length < 6) {
        alert("Hasło musi zawierać co najmniej 6 znaków");
        return;
    }


    

    // Sending data to server
    fetch("/register",{
        method: "POST", 
        body: JSON.stringify({username, password, email}),
        headers: {"Content-Type" : "application/json"}
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.success){
            alert("Rejestracja zakończona sukcesem");
            showDashboard;
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            localStorage.setItem("email", email);
        } else {
            alert("Błąd podczas rejestracji")
        }
    })
    .catch(error => {
        console.log("Błąd wysyłania danych", error);
    })
    
    
});














if (localStorage.getItem("loggedIn")){
    showDashboard();
} else {
    showAbout();
}






