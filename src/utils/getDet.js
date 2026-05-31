export default function getDet(data) {
  if (!data) {
    return null;
  }

  const mainData = data.main || data.list?.[0]?.main;
  const windData = data.wind || data.list?.[0]?.wind;
  const visibility = data.visibility || data.list?.[0]?.visibility;

  if (!mainData) return null;

  const temp = mainData.temp;
  const humidity = mainData.humidity;

  const speed = windData?.speed ? `${Math.round(windData.speed)} m/s` : '0 m/s';
  const deg = windData?.deg ?? 0;
  
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const dirIndex = Math.round(deg / 22.5) % 16;
  const windDirection = directions[dirIndex];

  const visibilityKm = visibility ? `${Math.round(visibility / 1000)}km` : '10km';
  const pressureHpa = mainData.pressure ? `${mainData.pressure} hPa` : '1000 hPa';

  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
  const dewPointValue = (b * alpha) / (a - alpha);
  const dewPoint = `${Math.round(dewPointValue)}°C`;

  return {
    wind: `${speed} ${windDirection}`,
    humidity: `${humidity}%`,
    visibility: visibilityKm,
    pressure: pressureHpa,
    uvIndex: '0 UV',
    dewPoint: dewPoint
  };
}