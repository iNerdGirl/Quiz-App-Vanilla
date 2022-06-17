const USERNAME = document.getElementById('username');
const SAVE_SCORE_BTN = document.getElementById('save-score-btn');
const MOST_RECENT_SCORE = localStorage.getItem('mostRecentScore');
const FINAL_SCORE = document.getElementById('final-score');
const HIGH_SCORES = JSON.parse(localStorage.getItem("highScores")) || [];

FINAL_SCORE.innerText = MOST_RECENT_SCORE;

USERNAME.addEventListener('keyup', () => {
    SAVE_SCORE_BTN.disabled = !USERNAME.value;
});

saveHighScore = e => {
    e.preventDefault();
    console.log('Clicked the save button');

    const SCORES = {
        score: Math.floor(Math.random() * 30),
        name: USERNAME.value
    }

    HIGH_SCORES.push(SCORES);
    HIGH_SCORES.sort((a,b) => b.score - a.score);
    HIGH_SCORES.splice(5);

    localStorage.setItem('highScores', JSON.stringify(HIGH_SCORES));
    window.location.assign('/index.html');
} 