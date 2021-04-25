export default function playSound(isSound) {
    if (!isSound) {
        return;
    }
    const audio = new Audio();
    audio.src = 'audio.mp3';

    if (!audio) {
        return;
    }
    audio.currentTime = 0;
    audio.play();
}