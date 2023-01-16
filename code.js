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


    // Username display
    const usernameDisplay = document.getElementById("username-display");
    const storedUsername = localStorage.getItem("username");
    usernameDisplay.innerHTML = storedUsername;
} 
    
if (localStorage.getItem("loggedIn")){
    showDashboard();
} else {
    showAbout();
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




// Registration form and sending data to localStorage

    // Validate registration 
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]{6,16}$/;
    return usernameRegex.test(username);
}

    // Users array 
const users = [];

function isUsernameUnique(username) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return false;
        }
    }
    return true;
}

function isEmailUnique(email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return false;
        }
    }
    return true;
}


// Form action 
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", e => {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm-email").value;
    
        //  Checking the uniqueness of the username and email address
    if (!isUsernameUnique(username)) {
        alert("Nazwa użytkownika jest już zajęta");
        return;
    }

    if (!isEmailUnique(email)) { 
        alert("Adres email jest już zarejestrowany");
        return;
    }


        //  Validation data
    if (username) {
        const usernameValue = username.value;
        if (!validateUsername(username)) {
            alert("Nazwa użytkownika musi mieć od 6 do 16 znaków i składać się tylko z liter i cyfr");
            return;
        }
    }
   
    if (email !== confirmEmail) {
        alert("Adresy email nie są takie same");
        return;
    }
  
    if (password.length < 6) {
        alert("Hasło musi mieć co najmniej 6 znaków");
        return;
    }

    users.push({ username, email });
    

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("email", email);
    showDashboard();   
});


// Login action

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const usernameOrEmail = document.getElementById("username-email").value;
    const password = document.getElementById("login-password").value;


    let user;
    if (localStorage.getItem("username") === usernameOrEmail) {
        user = {
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password")
        }
    } else if (localStorage.getItem("email") === usernameOrEmail) {
        user = {
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password")
        }
    }

    if (user) {
        if (user.password === password) {
            alert("Zalogowano pomyślnie");
            localStorage.setItem("isLoggedIn", true);
            showDashboard();
        } else {
            alert("Niepoprawne hasło");
        }
    } else {
        alert("Niepoprawna nazwa użytkownika lub email");
    }
});



if (localStorage.getItem("isLoggedIn") === "true") {
    showDashboard();
}











// Fetch API 
fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const transactions = data.transactions;
    const transactionTypes = data.transacationTypes;
    transactions.forEach(transaction => {
      console.log(`Data: ${transaction.date}`);
      console.log(`Typ transakcji: ${transactionTypes[transaction.type]}`);
      console.log(`Kwota: ${transaction.amount}`);
      console.log(`Saldo: ${transaction.balance}`);
      console.log(`Opis: ${transaction.description}\n`);
    });
  });

    




















