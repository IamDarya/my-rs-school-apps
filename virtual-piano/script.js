const piano = document.querySelector('.piano');
const pianoKeys = document.querySelector('.piano-key');
const lettersBtn = document.querySelector('.btn-letters');
const notesBtn = document.querySelector('.btn-notes');
let trigger = false;

lettersBtn.addEventListener('click', function(eventBtn) {
	event.target.classList.add('btn-active');
	notesBtn.classList.remove('btn-active');
});

notesBtn.addEventListener('click', function(eventBtn) {
	event.target.classList.add('btn-active');
	lettersBtn.classList.remove('btn-active');
});


piano.addEventListener('mousedown', function(event) {
    trigger = true;
    playAudio(event);
});

piano.addEventListener('mouseover', function(event) {
    playAudio(event);
});
piano.addEventListener('mouseout', function() {
    event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo')
});

document.addEventListener('mouseup', function(event) {
    trigger = false;
    event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo')
});

window.addEventListener('keydown', (event) => {
    if (event.code === 'KeyK') {
        playAudio();
    }
});

function playAudio(event) {
    if (trigger === true) {
        specialAudio(event.target.dataset.letter);
        event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
    }
}

function specialAudio(btn) {
    const audio = document.querySelector(`.${btn}`);
    audio.currentTime = 0;
    audio.play();
}
