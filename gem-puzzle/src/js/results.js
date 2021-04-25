import myAlert from './myalert';

export function showResults(size) {
    const localStorageName = `gpResult${size}`;
    const gpResult = JSON.parse(localStorage.getItem(localStorageName));

    if (!gpResult) {
        myAlert(`Топ-10 для поля ${size}x${size} пуст.<br> Возможно вы будете первым`);
        return;
    }
    let message = (`ТОП-10 для поля ${size}x${size}:<br>`);
    for (let i = 0; i < gpResult.length; i += 1) {
        message += `<br>${i+1}. ${gpResult[i].moves} ходов.`;
        message += ` Время: ${gpResult[i].time}.`;
    }
    myAlert(message, '250px', `${gpResult.length*20+50}px`);
}

export function setResults(size, moves, time) {
    const localStorageName = `gpResult${size}`;
    let gpResult = JSON.parse(localStorage.getItem(localStorageName));

    if (!gpResult) {
        gpResult = [];
    }
    gpResult.push({
        moves,
        time
    });
    gpResult.sort((a, b) => a.moves - b.moves);
    if (gpResult.length > 10) {
        for (let i = 0; i < (gpResult.length - 10); i += 1) {
            gpResult.pop();
        }
    }
    localStorage.setItem(localStorageName, JSON.stringify(gpResult));
}