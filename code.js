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
//pobranie danych z API
fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd')
  .then(response => response.json())
  .then(data => {
    //tabela transakcji
    const transactionsTable = document.getElementById("transaction-table");
    let transactionsHTML = "";

    //dane wykresów
    const transactionTypes = data.transacationTypes;
    let transactionTypesData = {};
    let transactionBalancesByDate = {};

    //iteracja po transakcjach
    data.transactions.forEach(transaction => {
      //dodanie transakcji do tabeli
      transactionsHTML += `<tr>
      <td>${transaction.date}</td>
        <td>${transactionTypes[transaction.type]}</td>
        <td>${transaction.amount}</td>
        <td>${transaction.balance}</td>
        <td>${transaction.description}</td>
      </tr>`;

      //dodanie danych do wykresów
      if (!transactionTypesData[transactionTypes[transaction.type]]) {
        transactionTypesData[transactionTypes[transaction.type]] = 0;
      }
      transactionTypesData[transactionTypes[transaction.type]]++;

      if (!transactionBalancesByDate[transaction.date]) {
        transactionBalancesByDate[transaction.date] = 0;
      }
      transactionBalancesByDate[transaction.date] = transaction.balance;
    });

    //wstawienie tabeli do HTML
    transactionsTable.innerHTML = transactionsHTML;

    //przygotowanie danych do wykresów
    let transactionTypesChartData = [];
    for (let type in transactionTypesData) {
      transactionTypesChartData.push({
        label: type,
        data: transactionTypesData[type]
      });
    }

    let transactionBalancesChartData = {
      labels: [],
      datasets: [{
        label: 'Saldo',
        data: []
      }]
    };
    for (let date in transactionBalancesByDate) {
      transactionBalancesChartData.labels.push(date);
      transactionBalancesChartData.datasets[0].data.push(transactionBalancesByDate[date]);
    }
});


  























// Wykres słupkowy 

  //pobranie danych z API
  fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd')
    .then(response => response.json())
    .then(data => {
    //   Przetworzenie danych na procentowy podział transakcji 
        
        let transactions = data.transactions;
        let transactionsByType = {};
        transactions.forEach(transaction => {
            if (transactionsByType[transaction.type]) {
                transactionsByType[transaction.type]++;
            } else {
                transactionsByType[transaction.type] = 1;
            }
        });

    // Stworzenie tablicy do przechowywania procentowego podziału transakcji

        let transactionsPercentages = [];
        for (let type in transactionsByType) {
            let percentage = (transactionsByType[type] / transactions.length) * 100;
            transactionsPercentages.push({
                type: type,
                percentage: percentage
            });
        }
        [{type: 1, percenage: 25}, {type: 2, percentage: 50}, {type: 3, percentage: 25}]
        
      //przetworzenie danych
      var labels = [];
      var balance = [];
      data.transactions.forEach(function(transaction) {
        labels.push(transaction.date);
        balance.push(transaction.balance);
      });

      //tworzenie wykresu słupkowego
      var ctx = document.getElementById("barChart").getContext('2d');
      var chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: "Saldo konta",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: balance
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
        
        
    // Tworzenie wykresu kołowego 
      var ctx = document.getElementById("doughnutChart").getContext('2d');
      var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Wydatki", "Wpływy", "Inne"],
            datasets: [{
                data: [10, 5, 5],
                backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: "top",
            },
            title: {
                display: true, 
                text: "Procentowy podział transakcji wg ich typu"
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }

        
      });
    });



// Wykres kołowy 


// fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd')
// .then(response => response.json())
// .then(data => {
//     var transaction = data.transactions;
//     var transactionTypes = data.transacationTypes;
//     var transactionCounts = {};
//     var transactionData = [];
    
//     transaction.forEach(transaction => {
//         if (transactionCounts[transaction.type]) {
//             transactionCounts[transaction.type]++;
//         } else {
//             transactionCounts[transaction.type] = 1;
//         }
//     });
    
//     var ctx = document.getElementById("doughnutChart").getContext("2d");
//     for (var type in transactionCounts) {
//         var count = transactionCounts[type];
//         var percentage = (count / transaction.length) * 100;
//         var label = transactionTypes[type];
//         transactionData.push({
//             label: label,
//             data: percentage,
//             backgroundColor: "rgba(255, 99, 132, 0.2)",
//             borderColor: "rgba(255, 99, 132, 1)"
//         });
//     }
    
//         var pieChart = new Chart(ctx, {
//             type: 'pie',
//             data: {
//                 labels: [],
//                 dataets: [{
//                     data: [],
//                     backgroundColor: [],
//                     borderColor: []
//                 }]
//             },
//             options: {
//                 legend: {
//                     position: 'bottom'
//                 }
//             }
//         });

//         pieChart.data.labels = transactionData.map(d => d.label);
//         pieChart.data.datasets[0].data = transactionData.map(d => d.data);
//         pieChart.data.datasets[0].backgroundColor = transactionData.map(d => d.backgroundColor);
//         pieChart.data.datasets[0].borderColor = transactionData.map(d => d.borderColor);
//         pieChart.update();


//     });