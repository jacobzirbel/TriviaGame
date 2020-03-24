let startButton = document.getElementById("start-button"),
	timeRemainingContainer = document.getElementById("time-remaining-container"),
	questionContainer = document.getElementById("question-container"),
	answeredContainer = document.getElementById("answered-container"),
	timeRemainingText = document.getElementById("time-remaining"),
	questionText = document.getElementById("question"),
	answersText = document.getElementById("answers"),
	endScreen = document.getElementById("end-screen"),
	correctOrWrong = document.getElementById("correct-or-wrong"),
	questions = allQuestions,
	currentQuestion = 0,
	timerInterval;

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
	startButton.hidden = true;
	showQuestion();
}
function showQuestion() {
	questionContainer.hidden = false;
	timeRemainingContainer.hidden = false;
	let question = questions[currentQuestion];
	let answers = [...question.answers, question.correctAnswer].sort(() => {
		return Math.random() - 0.5;
	});
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
	questionContainer.hidden = true;
	answeredContainer.hidden = false;
	if (answer === questions[currentQuestion].correctAnswer) {
		correctOrWrong.textContent = "correct!";
	} else {
		correctOrWrong.textContent = "wrong!";
	}
	currentQuestion++;
	if (currentQuestion === questions.length) {
		finishGame();
	}
	setTimeout(() => {
		showQuestion();
	}, 3000);
}

function startTimer() {
	clearInterval(timerInterval);
	let timeRemaining = 5;
	timerInterval = setInterval(() => {
		timeRemaining--;
		timeRemainingText.textContent = "Time Remaining: " + timeRemaining;
		if (timeRemaining < 1) {
			clearInterval(timerInterval);
			checkAnswer("Out of Time!");
		}
	}, 1000);
}
reset();
start();
