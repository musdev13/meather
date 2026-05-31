const OPEN_WEATHER_API_KEY = '1d227549e94153f65d657c02aa43df43';

export default async function getWeather(city, endpoint = 'weather') {
    const url = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=en`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`City not found or wrong endpoint: ${response.status}`);

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error appeared while requesting weather:', error.message);
    }
}