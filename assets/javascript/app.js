let startButton = document.getElementById("start-button"),
	timeRemainingContainer = document.getElementById("time-remaining-container"),
	questionContainer = document.getElementById("question-container"),
	answeredContainer = document.getElementById("answered-container"),
	timeRemainingText = document.getElementById("time-remaining"),
	questionText = document.getElementById("question"),
	answersText = document.getElementById("answers"),
	endScreen = document.getElementById("end-screen"),
	questions = allQuestions,
	currentQuestion = 0,
	timerInterval;
