export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getCountPer100th(count, population) {
  return (population === 0) ? 0 : +((count / population) * 100000).toFixed(2);
}

export function getCountPer100thFromMillion(count) {
  return +(count / 10).toFixed(2);
}