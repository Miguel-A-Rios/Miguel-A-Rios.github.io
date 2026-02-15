let randomNumber = Math.floor(Math.random() * 99) + 1;
let attemps = 0;
let wins = 0;
let losses = 0;
console.log(randomNumber);

document.querySelector("#wins").textContent = wins;
document.querySelector("#losses").textContent = losses;

function guess(){
let userGuess = document.querySelector("#userGuess").value;
if (userGuess < 1 || userGuess > 99) {
    document.querySelector("#result").textContent = "Your guess is out of range!";
    document.querySelector("#result").style.color = "red";
    return;
}
attemps++;
if(attemps >= 7){
    document.querySelector("#result").textContent = "Sorry, you lost! The random number was " + randomNumber;
    document.querySelector("#result").style.color = "red";
    losses++;
    document.querySelector("#losses").textContent = losses;
    document.querySelector("#guessBtn").disabled = true;
    return;
}
checkGuess(userGuess);
}

// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", guess);
document.querySelector("#resetBtn").addEventListener("click", resetGame);
document.querySelector("#wins").textContent = wins;
document.querySelector("#losses").textContent = losses;
function checkGuess(userGuess, attemps){

        document.querySelector("#guessNumLs").textContent += userGuess + " ";

        if(userGuess == randomNumber){

            document.querySelector("#result").textContent = "Congratulations! You guessed the number!";
            document.querySelector("#result").style.color = "green";
            wins++;
            document.querySelector("#wins").textContent = wins;
            return;
        }
        else if(userGuess < randomNumber){
            //guess is too low
            document.querySelector("#result").textContent = "Your guess is too low.";
            document.querySelector("#result").style.color = "red";

        }
        else if(userGuess > randomNumber){
            //guess is too high
            document.querySelector("#result").textContent = "Your guess is too high.";
            document.querySelector("#result").style.color = "red";

        }
        //guess is wrong
    return;
    

}

function resetGame(){
    attemps = 0;
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log(randomNumber);
    document.querySelector("#guessBtn").disabled = false;
    document.querySelector("#guessNumLs").textContent = "";
    document.querySelector("#result").textContent = "";
    document.querySelector("#userGuess").value = "";
    
}