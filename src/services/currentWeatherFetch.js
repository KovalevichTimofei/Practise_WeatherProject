export default function currentWeatherFetch(engCity, code) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${engCity},${code}&type=like&APPID=f40fe3edc5d5eccab2a08d022a005dea&lang=ru`,
  );
}
