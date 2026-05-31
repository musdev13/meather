export default function getFcast(data) {
  if (!data || !data.list) {
    return [];
  }

  const daysMap = new Map();
  const currentTimeMs = Date.now();

  let closestItem = null;
  let minDiff = Infinity;

  data.list.forEach(item => {
    const diff = Math.abs((item.dt * 1000) - currentTimeMs);
    if (diff < minDiff) {
      minDiff = diff;
      closestItem = item;
    }
  });

  const formattedList = data.list.map(item => {
    const weatherId = item.weather[0].id;
    let emoji = '🌡️';

    if (weatherId >= 200 && weatherId < 300) emoji = '⛈️';
    else if (weatherId >= 300 && weatherId < 600) emoji = '🌧️';
    else if (weatherId >= 600 && weatherId < 700) emoji = '❄️';
    else if (weatherId >= 700 && weatherId < 800) emoji = '🌫️';
    else if (weatherId === 800) emoji = '☀️';
    else if (weatherId === 801 || weatherId === 802) emoji = '⛅';
    else if (weatherId >= 803) emoji = '☁️';

    const itemTimeMs = item.dt * 1000;
    const date = new Date(itemTimeMs);
    const dayName = date.toLocaleDateString([], { weekday: 'short' });
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const precipitationChance = item.pop ? `${Math.round(item.pop * 100)}%` : '0%';

    return {
      dayName,
      time: timeString,
      emoji,
      pop: precipitationChance,
      temp: `${Math.round(item.main.temp)}°C`,
      now: item === closestItem
    };
  });

  formattedList.forEach(({ dayName, ...hourObj }) => {
    if (!daysMap.has(dayName)) {
      daysMap.set(dayName, []);
    }
    daysMap.get(dayName).push(hourObj);
  });

  const result = Array.from(daysMap, ([day, hours]) => ({ day, hours }));

  if (result.length > 1 && result[0].hours.length < 8) {
    const needed = 8 - result[0].hours.length;
    const extraHours = result[1].hours.slice(0, needed).map(h => ({ ...h, now: h.now }));
    result[0].hours = [...result[0].hours, ...extraHours];
  }

  return result;
}