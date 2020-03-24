let startButton = document.getElementById("start-button"),
  timeRemainingContainer = document.getElementById("time-remaining-container"),
  questionContainer = document.getElementById("question-container"),
  answeredContainer = document.getElementById("answered-container"),
  timeRemainingText = document.getElementById("time-remaining"),
  questionText = document.getElementById("question"),
  answersText = document.getElementById("answers"),
  endScreen = document.getElementById("end-screen"),
  correctOrWrong = document.getElementById("correct-or-wrong"),
  correctPoints = document.getElementById("correct"),
  incorrectPoints = document.getElementById("incorrect"),
  unansweredPoints = document.getElementById("unanswered");

let data = {
  questions: allQuestions,
  currentQuestion: 0,
  timerInterval: "",
  correct: 0,
  wrong: 0,
  unanswered: 0,
  timeRemaining: 30
};
const dataProxy = new Proxy(data, {
  set: (target, property, value) => {
    target[property] = value;
    (() => {
      if (property === "timeRemaining") {
        if (value < 0) {
          checkAnswer("Out of Time!");
        }
        timeRemainingText.textContent = "Time Remaining: " + data.timeRemaining;
      }
    })();
  }
});
reset();

function reset() {
  document.body.hidden = false;
  questionContainer.hidden = true;
  timeRemainingContainer.hidden = true;
  questionContainer.hidden = true;
  answeredContainer.hidden = true;
  endScreen.hidden = true;
  dataProxy.currentQuestion = 0;
}
function start() {
  reset();
  startButton.hidden = true;
  showQuestion();
}
function showQuestion() {
  answeredContainer.hidden = true;
  questionContainer.hidden = false;
  timeRemainingContainer.hidden = false;
  let question = dataProxy.questions[dataProxy.currentQuestion];
  let answers = [...question.answers, question.correctAnswer].sort(() => {
    return Math.random() - 0.5;
  });
  answersText.innerHTML = "";
  for (let a of answers) {
    let option = document.createElement("p");
    option.textContent = a;
    option.onclick = () => {
      checkAnswer(a);
    };
    answersText.appendChild(option);
  }
  startTimer();
}
function checkAnswer(answer) {
  clearInterval(data.timerInterval);
  //debugger;
  let questionTimer = setTimeout(() => {
    showQuestion();
  }, 1000);
  questionContainer.hidden = true;
  answeredContainer.hidden = false;
  if (answer === dataProxy.questions[dataProxy.currentQuestion].correctAnswer) {
    correctOrWrong.textContent = "Correct!";
    dataProxy.correct++;
  } else if (answer === "Out of Time!") {
    correctOrWrong.textContent = answer;
    dataProxy.unanswered++;
  } else {
    correctOrWrong.textContent = "Wrong!";
    dataProxy.wrong++;
  }
  correctOrWrong.innerHTML +=
    "</br>" + dataProxy.questions[currentQuestion].correctAnswer;
  currentQuestion++;
  if (currentQuestion === questions.length) {
    clearTimeout(questionTimer);
    finishGame();
  }
}

function startTimer() {
  clearInterval(dataProxy.timerInterval);
  dataProxy.timeRemaining = 5;
  dataProxy.timerInterval = setInterval(() => {
    dataProxy.timeRemaining--;
    if (timeRemaining < 1) {
      clearInterval(timerInterval);
      checkAnswer("Out of Time!");
    }
  }, 1000);
}

function finishGame() {
  answeredContainer.hidden = true;
  endScreen.hidden = false;
  correctPoints.textContent += correct;
  incorrectPoints.textContent += wrong;
  unansweredPoints.textContent += unanswered;
}
