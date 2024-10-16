let questions = [
    { question: "ما هو الشيء الذي تراه في الظلام لكنه ليس موجودًا؟", answer: "الخيال" },
    { question: "أي غرفة ليس لها أبواب ولا نوافذ؟", answer: "الغرفة الميتة" },
    { question: "إذا سمعت صوتًا في منتصف الليل، ماذا تفعل؟", answer: "تحاول الهرب" },
    { question: "من هو الذي يراقبك لكنك لا تراه؟", answer: "الوحش" },
];

let currentQuestionIndex = 0;
let hasKey = false;
let monsterNearby = false;
let monsterTimeout;

const questionBtn = document.getElementById('question-btn');
const openDoorBtn = document.getElementById('open-door-btn');
const gameOverScreen = document.getElementById('game-over-screen');
const winScreen = document.getElementById('win-screen');
const gameRoom = document.getElementById('game-room');
const restartBtn = document.getElementById('restart-btn');
const restartWinBtn = document.getElementById('restart-win-btn');

// دالة لعرض السؤال التالي
function displayNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        let currentQuestion = questions[currentQuestionIndex].question;
        let userAnswer = prompt(currentQuestion);
        checkAnswer(userAnswer);
    } else {
        alert('لقد أجبت على جميع الأسئلة. يمكنك الآن فتح الباب!');
        hasKey = true; // يمكنك فتح الباب الآن
        openDoorBtn.disabled = false; // تمكين زر فتح الباب
    }
}

// دالة لفحص الإجابة
function checkAnswer(userAnswer) {
    let correctAnswer = questions[currentQuestionIndex].answer;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        alert('إجابة صحيحة!');
        currentQuestionIndex++; // الانتقال إلى السؤال التالي
    } else {
        alert('إجابة خاطئة! حاول مرة أخرى.');
    }
}

// عند النقر على زر السؤال التالي
questionBtn.addEventListener('click', function() {
    displayNextQuestion();
});

// إظهار شاشة الفوز عند الهروب بنجاح
openDoorBtn.addEventListener('click', function() {
    if (hasKey) {
        alert('لقد فتحت الباب وهربت!');
        clearTimeout(monsterTimeout); // إلغاء هجوم الوحش
        gameRoom.style.display = 'none';
        winScreen.style.display = 'block'; // إظهار شاشة الفوز
    }
});

// بدء العد التنازلي للوحش عند بداية اللعبة
function startMonsterAttackTimer() {
    monsterTimeout = setTimeout(function() {
        monsterNearby = true;
        alert('الوحش يقترب منك...');
        gameRoom.style.display = 'none'; // إخفاء غرفة اللعبة
        gameOverScreen.style.display = 'block'; // إظهار شاشة الخسارة
    }, 30000); // 30 ثانية قبل أن يهاجم الوحش إذا لم تحل الأسئلة
}

// إعادة ضبط اللعبة عند الخسارة أو الفوز
restartBtn.addEventListener('click', function() {
    resetGame();
    gameOverScreen.style.display = 'none'; // إخفاء شاشة الخسارة
    gameRoom.style.display = 'block'; // إظهار غرفة اللعبة
});

restartWinBtn.addEventListener('click', function() {
    resetGame();
    winScreen.style.display = 'none'; // إخفاء شاشة الفوز
    gameRoom.style.display = 'block'; // إظهار غرفة اللعبة
});

function resetGame() {
    currentQuestionIndex = 0;
    hasKey = false;
    openDoorBtn.disabled = true;
    monsterNearby = false;
    startMonsterAttackTimer(); // إعادة ضبط مؤقت الوحش
}

// بدء العد التنازلي للوحش عند بداية اللعبة
startMonsterAttackTimer();
