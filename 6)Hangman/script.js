const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const figureParts = document.querySelectorAll('.figure-part')

let answer = [];
const correctLetters = [];
const wrongLetters = [];


start();

async function start() {
    await getRandomWord();
    displayWord();
}

async function getRandomWord() {
    const res = await fetch("https://random-word-api.herokuapp.com//word?number=1");
    const word = await res.json();
    answer = Array.from(word[0]);
}

function displayWord() {
    wordEl.innerHTML = `
        ${answer
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `)
            .join('')
        }
    `;
    
    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === answer.join('')) {
        finalMessage.innerText = 'Congratulation! You Won!';
        popup.style.display = 'flex';
    }
}

function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You Lost!'
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notification.classList.add('show')
    setTimeout(() => notification.classList.remove('show'), 2000)
}

window.addEventListener('keydown', event => {
    const letter = event.key;
    if(letter.charCodeAt(0) < 97 || letter.charCodeAt(0) > 122) return;

    if(correctLetters.includes(letter) || wrongLetters.includes(letter)) {
        showNotification();
        return;
    }

    if(answer.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
    }
    else {
        wrongLetters.push(letter);
        updateWrongLettersEl();
    }
})

playAgainBtn.addEventListener('click', async () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    await getRandomWord();
    displayWord();
    updateWrongLettersEl();

    popup.style.display = 'none';
})