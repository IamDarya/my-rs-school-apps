const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const lettersBtn = document.querySelector('.btn-letters');
const notesBtn = document.querySelector('.btn-notes');
let trigger = false;
let triggerKeys = { };

lettersBtn.addEventListener('click', function(eventBtn) {
    event.target.classList.add('btn-active');
    notesBtn.classList.remove('btn-active');
    pianoKeys.forEach(element => element.classList.add('letter'));

});

notesBtn.addEventListener('click', function(eventBtn) {
    event.target.classList.add('btn-active');
    lettersBtn.classList.remove('btn-active');
    pianoKeys.forEach(element => element.classList.remove('letter'));
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


window.addEventListener('keydown', (event) => {
	if(event.repeat === false) {
    if (event.code === 'KeyD' || event.code === 'KeyF' || event.code === 'KeyG' ||
        event.code === 'KeyH' || event.code === 'KeyJ' || event.code === 'KeyK' ||
        event.code === 'KeyL' || event.code === 'KeyR' || event.code === 'KeyT' ||
        event.code === 'KeyU' || event.code === 'KeyI' || event.code === 'KeyO') {
    	if(triggerKeys[event.code] !== true) {
    	triggerKeys[event.code] = true;
        specialAudio(event.code.slice(-1));
        const letter = document.querySelector(`.${event.code}`);
        letter.classList.add('piano-key-active', 'piano-key-active-pseudo');
    }
}
}
});

window.addEventListener('keyup', (event) => {
    if (event.code === 'KeyD' || event.code === 'KeyF' || event.code === 'KeyG' ||
        event.code === 'KeyH' || event.code === 'KeyJ' || event.code === 'KeyK' ||
        event.code === 'KeyL' || event.code === 'KeyR' || event.code === 'KeyT' ||
        event.code === 'KeyU' || event.code === 'KeyI' || event.code === 'KeyO') {
    	triggerKeys[event.code] = false;
        const letter = document.querySelector(`.${event.code}`);
        letter.classList.remove('piano-key-active', 'piano-key-active-pseudo');
    }
});

// *********FULLSCREEN*********

const fullscreen = document.querySelector('.fullscreen');

fullscreen.addEventListener("click", function() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});