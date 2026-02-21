// event listeners
let zipElement = document.querySelector("#zipCode");

let passwordElement = document.querySelector("#suggestedPass");

let usernameElement = document.querySelector("#usernameCheck");

zipElement.addEventListener("change", displayCity);

passwordElement.addEventListener("click", displaySuggestedPassword);

usernameElement.addEventListener("change", checkUsername);


displayStates();
displaySuggestedPassword();
// checkUsername();
// displayLatitude();
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

    // document.querySelector("#usernameCheck").textContent = data.username;

    if (data.available) {
        document.querySelector("#usernameStatus").textContent = "Username is available!";
        document.querySelector("#usernameStatus").style.color = "green";
    } else {
        document.querySelector("#usernameStatus").textContent = "Username is NOT available.";
        document.querySelector("#usernameStatus").style.color = "red";
    }
}