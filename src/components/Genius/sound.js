import Sound from "react-native-sound";

const sounds = {
    red: new Sound(require('../../sounds/sound1.mp3')),
    green: new Sound(require('../../sounds/sound2.mp3')),
    yellow: new Sound(require('../../sounds/sound3.mp3')),
    blue: new Sound(require('../../sounds/sound4.mp3')),
    gameOver: new Sound(require('../../sounds/game_over.mp3'))
};

export function playSoundByColor(color) {
    if(!color) return;
    const sound = sounds[color];
    sound.play();
}

export function playGameOverSound() {
    const gameOverSound = sounds['gameOver'];
    gameOverSound.play();
}