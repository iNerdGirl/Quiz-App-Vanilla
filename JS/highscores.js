const HIGH_SCORES_LIST = document.querySelector('#high-score-list');
const HIGH_SCORES = JSON.parse(localStorage.getItem('highScores')) || [];

HIGH_SCORES_LIST.innerHTML = HIGH_SCORES.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')


