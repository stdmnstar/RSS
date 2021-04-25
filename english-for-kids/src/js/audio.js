export function playWord(word) {
    const audio = new Audio(`./audio/${word}.mp3`);
    audio.play();
}

export function playAudio(audioLink){
    const audio = new Audio(audioLink);
    audio.play();
}