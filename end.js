const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Display final score
finalScore.innerText = `You Scored ${mostRecentScore}/100`;

// Enable save button when username is entered
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

// Save high score function
function saveHighScore(e) {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.reload(); // Reload the page
    saveScoreBtn.removeEventListener('click', saveHighScore); // Remove event listener after saving
}

// Attach click event listener to save button
saveScoreBtn.addEventListener('click', saveHighScore);