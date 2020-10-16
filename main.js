const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");
const countdownText = document.querySelector(".countdown");

const problemTimer = setInterval(countdown, 1000);

let state = {
    score: 0,
    wrongAnswers: 0,
    timeleft: 10, //Oops, No cheating 😅
}

function updateProblem() {
    state.currentProblem = generateProblem();
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`;
    ourField.value = '';
    ourField.focus();
}

updateProblem();

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

function generateProblem() {
    return {
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator:['+', '-', 'x'][generateNumber(2)]
    }
}

ourForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    let correctAnswer;
    const p = state.currentProblem;
    if(p.operator == "+") correctAnswer = p.numberOne + p.numberTwo;
    if(p.operator == "-") correctAnswer = p.numberOne - p.numberTwo;
    if(p.operator == "x") correctAnswer = p.numberOne * p.numberTwo;

    if(parseInt(ourField.value, 10) == correctAnswer) {
        state.score++;
        pointsNeeded.textContent = 10 - state.score;
        updateProblem();
        renderProgressBar();
    } else {
        state.wrongAnswers++;
        mistakesAllowed.textContent = 2 - state.wrongAnswers;
        animateWarning();
    }

    checkLogic();
}

function animateWarning() {
    problemElement.classList.add("animate-warning");
    setTimeout(() => {
        problemElement.classList.remove("animate-warning");
    }, 451);
}

function checkLogic() {
    // if you won
    if(state.score == 10) {
        endMessage.textContent = "Congrats! You won.";
        document.body.classList.add("overlay-is-open");
        setTimeout(() => {
           resetButton.focus(); 
        }, 331);
    }

    // if you lost
    if(state.wrongAnswers == 3) {
        endMessage.textContent = "Sorry! You lost 😞";
        document.body.classList.add("overlay-is-open");
        state.timeleft = -1;
        setTimeout(() => {
            resetButton.focus(); 
         }, 331);
    }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    document.body.classList.remove("overlay-is-open");
    updateProblem();
    state.score = 0;
    state.wrongAnswers = 0;
    state.timeleft = 10;
    pointsNeeded.textContent = 10;
    mistakesAllowed.textContent = 2;
    countdownText.textContent = state.timeleft + " seconds remaining";
    renderProgressBar();
}

function renderProgressBar() {
    progressBar.style.transform = `scaleX(${state.score/10})`;
}

function countdown() {
    if(state.timeleft == 0){
        endMessage.textContent = "You ran out of time!😅";
        document.body.classList.add("overlay-is-open");
        setTimeout(() => {
            resetButton.focus(); 
         }, 331);
      } else {
        countdownText.textContent = state.timeleft + " seconds remaining";
      }
      state.timeleft -= 1;
}