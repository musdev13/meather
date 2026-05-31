export default function getToday(data) {
  if (!data || !data.weather || !data.weather[0]) {
    return null; 
  }

  const weatherId = data.weather[0].id;
  let emoji = '🌡️';

  if (weatherId >= 200 && weatherId < 300) emoji = '⛈️';
  else if (weatherId >= 300 && weatherId < 600) emoji = '🌧️';
  else if (weatherId >= 600 && weatherId < 700) emoji = '❄️';
  else if (weatherId >= 700 && weatherId < 800) emoji = '🌫️';
  else if (weatherId === 800) emoji = '☀️';
  else if (weatherId === 801 || weatherId === 802) emoji = '⛅';
  else if (weatherId >= 803) emoji = '☁️';

  return {
    city: data.name,
    temp: `${Math.round(data.main.temp)}°C`,
    feelsLike: `Feels like ${Math.round(data.main.feels_like)}°C`,
    emoji: emoji,
    description: data.weather[0].description
  };
}