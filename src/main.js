import './css/style.css'
import getWeather from './utils/getWeather.js';
import renderToday from './components/renderToday.js';
import renderFcast from './components/renderFcast.js';
import renderDet from './components/renderDet.js';

const screenContainer = document.createElement('div');
screenContainer.className = 'screen-container';
document.body.insertBefore(screenContainer, document.querySelector('.bar'));

const barItems = document.querySelectorAll('.bar .item');
let activeTab = 0;

let cachedCurrent = null;
let cachedForecast = null;
let selectedHourData = null;

function updateScreen() {
  screenContainer.innerHTML = '';
  
  if (activeTab === 0 && cachedCurrent) {
    renderToday(screenContainer, cachedCurrent);
  } else if (activeTab === 1 && cachedForecast) {
    renderFcast(screenContainer, cachedForecast, (selectedTime) => {
      selectedHourData = cachedForecast.list.find(item => {
        const tStr = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return tStr === selectedTime;
      });
    });
  } else if (activeTab === 2) {
    const dataForDet = selectedHourData || cachedForecast?.list[0];
    renderDet(screenContainer, dataForDet);
  }
}

barItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    barItems.forEach(b => b.classList.remove('active'));
    item.classList.add('active');
    activeTab = index;
    updateScreen();
  });
});

async function init() {
  try {
    const city = 'Vinnytsia';
    const [current, forecast] = await Promise.all([
      getWeather(city, 'weather'),
      getWeather(city, 'forecast')
    ]);

    cachedCurrent = current;
    cachedForecast = forecast;
    if (forecast?.list) selectedHourData = forecast.list[0];

    updateScreen();
  } catch (err) {
    console.error(err);
  }
}

init();