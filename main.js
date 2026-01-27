
document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const questionText = document.getElementById('question-text');
    const answerA = document.getElementById('answer-a');
    const answerB = document.getElementById('answer-b');
    const progress = document.getElementById('progress');

    const resultType = document.getElementById('result-type');
    const resultDescription = document.getElementById('result-description');

    let currentQuestionIndex = 0;
    let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    const questions = [
        { q: "After a long week, you'd rather...", a: { text: "Go to a party", type: "E" }, b: { text: "Read a book at home", type: "I" } },
        { q: "When making decisions, you rely on...", a: { text: "Facts and logic", type: "T" }, b: { text: "Feelings and intuition", type: "F" } },
        { q: "You are more...", a: { text: "Practical and realistic", type: "S" }, b: { text: "Imaginative and idealistic", type: "N" } },
        { q: "Your workspace is usually...", a: { text: "Organized and tidy", type: "J" }, b: { text: "A bit messy and flexible", type: "P" } },
        { q: "When meeting new people, you are more...", a: { text: "Outgoing and talkative", type: "E" }, b: { text: "Reserved and a good listener", type: "I" } },
        { q: "You prefer to have...", a: { text: "A detailed plan", type: "J" }, b: { text: "Spontaneous options", type: "P" } },
        { q: "In a debate, you prioritize...", a: { text: "Objective truth", type: "T" }, b: { text: "People's feelings", type: "F" } },
        { q: "You are more interested in...", a: { text: "The details and specifics", type: "S" }, b: { text: "The big picture and possibilities", type: "N" } },
    ];

    const personalityTypes = {
        ISTJ: "The Inspector: Reserved and practical, they tend to be loyal, orderly, and traditional.",
        ISFJ: "The Protector: Warm-hearted and responsible, they are devoted caretakers who enjoy helping others.",
        INFJ: "The Advocate: Creative and analytical, they are considered to be gentle and caring.",
        INTJ: "The Architect: Imaginative and strategic thinkers, with a plan for everything.",
        ISTP: "The Crafter: Bold and practical, they are natural troubleshooters.",
        ISFP: "The Artist: Flexible and charming, they are always ready for a new experience.",
        INFP: "The Mediator: Poetic, kind, and altruistic people, always eager to help a good cause.",
        INTP: "The Thinker: Known for their insatiable thirst for knowledge.",
        ESTP: "The Dynamo: Smart, energetic, and very perceptive people, who truly enjoy living on the edge.",
        ESFP: "The Performer: Spontaneous, energetic, and enthusiastic people.",
        ENFP: "The Champion: Charismatic and energetic, they are creative and sociable free spirits.",
        ENTP: "The Debater: Smart and curious thinkers who cannot resist an intellectual challenge.",
        ESTJ: "The Executive: Excellent administrators, unsurpassed at managing things or people.",
        ESFJ: "The Consul: Extraordinarily caring, social, and popular people, always eager to help.",
        ENFJ: "The Protagonist: Charismatic and inspiring leaders, able to mesmerize their listeners.",
        ENTJ: "The Commander: Bold, imaginative and strong-willed leaders, always finding a way - or making one.",
    };

    function startTest() {
        currentQuestionIndex = 0;
        scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        showScreen('question-screen');
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            questionText.textContent = question.q;
            answerA.textContent = question.a.text;
            answerA.dataset.type = question.a.type;
            answerB.textContent = question.b.text;
            answerB.dataset.type = question.b.type;
            updateProgress();
        } else {
            showResult();
        }
    }

    function handleAnswer(type) {
        scores[type]++;
        currentQuestionIndex++;
        displayQuestion();
    }

    function updateProgress() {
        const progressPercentage = (currentQuestionIndex / questions.length) * 100;
        progress.style.width = `${progressPercentage}%`;
    }

    function showResult() {
        const finalType = (
            (scores.E > scores.I ? "E" : "I") +
            (scores.S > scores.N ? "S" : "N") +
            (scores.T > scores.F ? "T" : "F") +
            (scores.J > scores.P ? "J" : "P")
        );

        resultType.textContent = finalType;
        resultDescription.textContent = personalityTypes[finalType] || "No description available.";
        showScreen('result-screen');
    }

    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    startBtn.addEventListener('click', startTest);
    restartBtn.addEventListener('click', () => showScreen('start-screen'));
    answerA.addEventListener('click', (e) => handleAnswer(e.target.dataset.type));
    answerB.addEventListener('click', (e) => handleAnswer(e.target.dataset.type));

    // Initial state
    showScreen('start-screen');
});
