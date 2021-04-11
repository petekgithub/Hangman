const word_hang = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_hang = document.getElementById('success-message');
const wrongLetters_hang = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
    const words = ["bread","cheese","milk","marmelade","patoto","pepper"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    word_hang.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class ="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join(``)}
    `;  

    const w = word_hang.innerText.replace(/\n/g,'');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_hang.innerText = 'Congratulations you won'
    }
}

function updateWrongLetters() {
    wrongLetters_hang.innerHTML = `
        ${wrongLetters.length>0?'<h3>Hatalı Harfler</h3>':''}
        ${wrongLetters.map(letter=> `<span>${letter}</span>`)}
    `;

    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })

    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        message_hang.innerText = 'Unfortunately you lost';
    }
}

function displayMessage() {
    message.classList.add('show');
    setTimeout(function() {
        message.classList.remove('show');
    },2000);
}


playAgainBtn.addEventListener('click', function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';

});

window.addEventListener('keydown', function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }else {
                displayMessage();
            }
        }
    }
});

displayWord();