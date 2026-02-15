// Event listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

// Must call function so it can run
shuffleQ1Choices();

function shuffleQ1Choices() {
    let q1Choices = ["font-color", "color", "text-color", "font-color"];
    q1Choices = _.shuffle(q1Choices);
    console.log(q1Choices);

    for ( let i of q1Choices) {
        let radioElement = document.createElement("input");
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        
        labelElement.prepend(radioElement);

        // document.querySelector("#q1ChoicesDiv").append(labelElement);
        
        console.log(labelElement);
    } //for
    
}

let final_score = 0;

function gradeQuiz() {
    let answerQ1 = "tornich";
    let userAnswer1 = document.querySelector("input[name=q1]:checked").value;

    alert("Grading quiz..." + userAnswer1);

    if (userAnswer1 == answerQ1) {
        // Display "Right!"
        document.querySelector("#q1Answer").textContent = "Right!";
        document.querySelector("#q1Answer").style.color = "green";
        final_score += 20;
    }
    else {
        document.querySelector("#q1Answer").textContent = "Wrong!";
        document.querySelector("#q1Answer").style.color = "red";
    }

    gradeQ2();
    gradeQ4();
    gradeQ3();
    gradeQ5();

    document.querySelector("#finalScore").textContent = "Final Score: " + final_score;
}

function gradeQ2() {
    let choice = document.querySelector("#q2");
    if (choice.value === "unova") {
        document.querySelector("#q2Answer").textContent = "Right!";
        document.querySelector("#q2Answer").style.color = "green";
        final_score += 20;
        alert("Grading quiz..." + choice.value);
    } else {
        document.querySelector("#q2Answer").textContent = "Wrong!";
        document.querySelector("#q2Answer").style.color = "red";
    }
}

function gradeQ3() {
    let answerq3 = document.getElementById("selectInput");
    let ans_element = answerq3.value;
    if(ans_element == "Flying"){
        document.querySelector("#q3Answer").textContent = "Right!";
        document.querySelector("#q3Answer").style.color = "green";
        final_score += 20;
    }
    else {
        document.querySelector("#q3Answer").textContent = "Wrong!";
        document.querySelector("#q3Answer").style.color = "red";
    }
}

function gradeQ4(){
    let answerq4 = document.querySelector("#q4").value;
    if(answerq4 == 2){
        document.querySelector("#q4Answer").textContent = "Right!";
        document.querySelector("#q4Answer").style.color = "green";
        final_score += 20;
    } else {
        document.querySelector("#q4Answer").textContent = "Wrong!";
        document.querySelector("#q4Answer").style.color = "red";
    }
}

function gradeQ5() {
    let choice = document.querySelector("#q5");
    if (choice.value == "Ground") {
        document.querySelector("#q5Answer").textContent = "Right!";
        document.querySelector("#q5Answer").style.color = "green";
        alert("Grading quiz..." + choice.value);
        final_score += 20;
    } else {
        document.querySelector("#q5Answer").textContent = "Wrong!";
        document.querySelector("#q5Answer").style.color = "red";
    }
}