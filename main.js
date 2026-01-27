
document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('theme-toggle');
    const themeLabels = document.querySelectorAll('[data-theme-label]');
    const themeIcon = document.querySelector('.theme-icon');
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
        { q: "긴 한 주가 끝난 오늘, 나는…", a: { text: "사람 만나는 자리로 간다", type: "E" }, b: { text: "집에서 쉬면서 충전한다", type: "I" } },
        { q: "결정할 때 나는 주로…", a: { text: "팩트와 논리", type: "T" }, b: { text: "감정과 분위기", type: "F" } },
        { q: "나는 더 끌리는 쪽이…", a: { text: "현실적이고 실용적인 것", type: "S" }, b: { text: "가능성과 아이디어", type: "N" } },
        { q: "내 책상은 보통…", a: { text: "깔끔하게 정돈됨", type: "J" }, b: { text: "유동적으로 자유롭게", type: "P" } },
        { q: "새로운 사람을 만나면…", a: { text: "먼저 말 걸고 리드", type: "E" }, b: { text: "관찰하고 천천히", type: "I" } },
        { q: "일정 스타일은…", a: { text: "미리 계획해두는 편", type: "J" }, b: { text: "그때그때 유연하게", type: "P" } },
        { q: "토론할 때 더 중요하게 보는 건…", a: { text: "객관적 기준", type: "T" }, b: { text: "사람 마음", type: "F" } },
        { q: "새로운 정보를 볼 때 나는…", a: { text: "디테일과 구체성", type: "S" }, b: { text: "큰 흐름과 가능성", type: "N" } },
    ];

    const personalityTypes = {
        ISTJ: "원칙과 현실감각이 탄탄한 타입. 맡은 일은 끝까지 책임지는 스타일이야.",
        ISFJ: "다정하고 섬세한 서포터. 주변을 챙기며 안정감을 만들어줘.",
        INFJ: "깊이 생각하고 통찰하는 타입. 의미 있는 방향을 찾는 걸 좋아해.",
        INTJ: "전략과 설계에 강한 타입. 계획적으로 목표를 밀고 나가.",
        ISTP: "문제 해결이 빠른 타입. 필요한 순간에 실전으로 움직여.",
        ISFP: "감각적이고 자유로운 타입. 나만의 분위기를 잘 만들어.",
        INFP: "가치와 진심을 중요하게 여기는 타입. 이상을 현실로 옮기고 싶어 해.",
        INTP: "호기심과 분석력이 강한 타입. 왜 그런지 끝까지 파고들어.",
        ESTP: "즉흥과 도전이 강한 타입. 현장에서 빛나는 에너지가 있어.",
        ESFP: "분위기 메이커 타입. 사람들과 함께할 때 에너지가 살아나.",
        ENFP: "영감과 열정이 넘치는 타입. 새로운 가능성을 발견하는 걸 즐겨.",
        ENTP: "아이디어 배틀에 강한 타입. 토론에서 반짝이는 편이야.",
        ESTJ: "정리정돈과 실행력이 강한 타입. 팀을 안정적으로 이끌어.",
        ESFJ: "사람 중심의 조율자 타입. 분위기와 관계를 잘 챙겨.",
        ENFJ: "사람을 끌어당기는 리더 타입. 같이 성장하는 걸 좋아해.",
        ENTJ: "결정과 추진이 빠른 타입. 큰 그림을 그리고 밀어붙여.",
    };

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.dataset.theme = 'dark';
        } else {
            delete document.body.dataset.theme;
        }
        const nextLabel = theme === 'dark' ? '라이트' : '다크';
        themeLabels.forEach(label => {
            label.textContent = nextLabel;
        });
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    function getInitialTheme() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') {
            return saved;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

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
        resultDescription.textContent = personalityTypes[finalType] || "설명이 준비되지 않았어.";
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
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            const isDark = document.body.dataset.theme === 'dark';
            const nextTheme = isDark ? 'light' : 'dark';
            localStorage.setItem('theme', nextTheme);
            applyTheme(nextTheme);
        });
    }

    // Initial state
    applyTheme(getInitialTheme());
    showScreen('start-screen');
});
