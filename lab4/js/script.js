// event listeners
let zipElement = document.querySelector("#zipCode");

let passwordElement = document.querySelector("#suggestedPass");

let usernameElement = document.querySelector("#usernameCheck");

zipElement.addEventListener("change", displayCity);

passwordElement.addEventListener("click", displaySuggestedPassword);

usernameElement.addEventListener("change", checkUsername);


let stateElement = document.querySelector("#state").addEventListener("change", displayCounties);

document.querySelector("#passwordCheck").addEventListener("change", checkPassword);

document.querySelector("#passwordMatch").addEventListener("change", checkPassword);

displayStates();
displaySuggestedPassword();

async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);
        //alert(data[0].state);

        for (let i of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.state;
            optionEl.value = i.usps;

            document.querySelector("#state").append(optionEl);
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch    
}

async function displayCity() {
    //alert("displaying city...")
    let zipCode = zipElement.value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    //alert(data.city);
    if (!data || !data.city) {
        document.querySelector("#zipCodeStatus").textContent = "Zip code not found";
        document.querySelector("#latitude").textContent = "";
        document.querySelector("#longitude").textContent = "";
        return;
    }
    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
}

async function displaySuggestedPassword() {
    let suggestedPass = passwordElement.value;

    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#suggestedPass").textContent = data.password;
}

async function checkUsername() {
    let usernameCheck = usernameElement.value;

    let url = "https://csumb.space/api/usernamesAPI.php?username=" + usernameCheck;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    if (usernameCheck.length < 3) {
        document.querySelector("#usernameStatus").textContent = "";

        document.querySelector("#usernameLength").textContent = "Username needs at least 3 characters.";
        document.querySelector("#usernameLength").style.color = "red";
    } else if (data.available) {
        document.querySelector("#usernameLength").textContent = "";

        document.querySelector("#usernameStatus").textContent = "Username is available!";
        document.querySelector("#usernameStatus").style.color = "green";
    } else {
        document.querySelector("#usernameLength").textContent = "";

        document.querySelector("#usernameStatus").textContent = "Username is NOT available.";
        document.querySelector("#usernameStatus").style.color = "red";
    }
}

async function displayCounties() {
    let state = document.querySelector("#state").value;

    // clears the county list when changing to new state option
    let countySelect = document.querySelector("#county");
    countySelect.innerHTML = "";


    let url = "https://csumb.space/api/countyListAPI.php?state=" + state;
    let response = await fetch(url);

    let data = await response.json();
    console.log(data);
    //alert(data[0].state); 

    for (let i of data) {
        let optionEl = document.createElement("option");
        optionEl.textContent = i.county;
        optionEl.value = i.usps;

        document.querySelector("#county").append(optionEl);

    }
}
document.querySelector("#passwordMatchStatus").textContent = "";


function checkPassword() {
    let passwordValue = document.querySelector("#passwordCheck").value;
    let retypePasswordValue = document.querySelector("#passwordMatch").value;

    document.querySelector("#passwordMatchStatus").textContent = "";
    document.querySelector("#passwordLength").textContent = "";

    if (passwordValue.length < 6) {
        document.querySelector("#passwordLength").textContent = "Password must have at least 6 characters.";
        document.querySelector("#passwordLength").style.color = "red";
    }
    if (passwordValue != retypePasswordValue) {
        document.querySelector("#passwordMatchStatus").textContent = "Passwords don't match.";
        document.querySelector("#passwordMatchStatus").style.color = "red";
    }
}