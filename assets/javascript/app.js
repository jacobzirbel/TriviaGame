window.onload = () => {
	reset();
};
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
	unansweredPoints = document.getElementById("unanswered"),
	questions = allQuestions,
	currentQuestion = 0,
	timerInterval,
	correct = 0,
	wrong = 0,
	unanswered = 0;

function reset() {
	document.body.hidden = false;
	questionContainer.hidden = true;
	timeRemainingContainer.hidden = true;
	questionContainer.hidden = true;
	answeredContainer.hidden = true;
	endScreen.hidden = true;
	currentQuestion = 0;
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
	let question = questions[currentQuestion];
	let answers = [...question.answers, question.correctAnswer].sort(() => {
		return Math.random() - 0.5;
	});
	questionText.innerHTML = `<p>${question.question}</p>`;
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
	clearInterval(timerInterval);
	let questionTimer = setTimeout(() => {
		showQuestion();
	}, 1000);
	questionContainer.hidden = true;
	answeredContainer.hidden = false;
	if (answer === questions[currentQuestion].correctAnswer) {
		correctOrWrong.textContent = "Correct!";
		correct++;
	} else if (answer === "Out of Time!") {
		correctOrWrong.textContent = answer;
		unanswered++;
	} else {
		correctOrWrong.textContent = "Wrong!";
		wrong++;
	}
	correctOrWrong.innerHTML +=
		"</br>" + questions[currentQuestion].correctAnswer;
	currentQuestion++;
	if (currentQuestion === questions.length) {
		clearTimeout(questionTimer);
		finishGame();
	}
}

function startTimer() {
	clearInterval(timerInterval);
	let timeRemaining = 10;
	timerInterval = setInterval(() => {
		timeRemainingText.textContent = "Time Remaining: " + timeRemaining;
		timeRemaining--;
		if (timeRemaining < 0) {
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
