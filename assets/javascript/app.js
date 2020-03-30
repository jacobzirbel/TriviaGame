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
window.onload = () => {
	reset();
};

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
	startTimer();
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
}
function checkAnswer(answer) {
	clearInterval(timerInterval);
	let questionTimer = setTimeout(() => {
		showQuestion();
	}, 3000);
	questionContainer.hidden = true;
	answeredContainer.hidden = false;
	let image = document.getElementsByTagName("img")[0];
	image.setAttribute("src", questions[currentQuestion].imgURL);
	if (answer === questions[currentQuestion].correctAnswer) {
		correctOrWrong.textContent = "Correct!";
		correctOrWrong.innerHTML +=
			"</br>" + questions[currentQuestion].correctAnswer;
		correct++;
	} else if (answer === "Out of Time!") {
		correctOrWrong.textContent = answer;
		correctOrWrong.innerHTML +=
			"</br> Correct Answer: " + questions[currentQuestion].correctAnswer;
		unanswered++;
	} else {
		correctOrWrong.textContent = "Wrong!";
		correctOrWrong.innerHTML +=
			"</br> Correct Answer: " + questions[currentQuestion].correctAnswer;
		wrong++;
	}
	correctOrWrong.style.fontSize = "22px";
	"</br> Correct Answer: " + questions[currentQuestion].correctAnswer;
	currentQuestion++;
	if (currentQuestion === questions.length) {
		clearTimeout(questionTimer);
		finishGame();
	}
}

function startTimer() {
	clearInterval(timerInterval);
	let timeRemaining = 10;
	timeRemainingText.textContent = "Time Remaining: " + timeRemaining;
	timerInterval = setInterval(() => {
		timeRemaining--;
		timeRemainingText.textContent = "Time Remaining: " + timeRemaining;
		if (timeRemaining < 1) {
			clearInterval(timerInterval);
			checkAnswer("Out of Time!");
		}
	}, 1000);
}

function finishGame() {
	answeredContainer.hidden = true;
	endScreen.hidden = false;
	timeRemainingContainer.hidden = true;
	correctPoints.textContent += correct;
	incorrectPoints.textContent += wrong;
	unansweredPoints.textContent += unanswered;
}
