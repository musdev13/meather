import getToday from '../utils/getToday.js';

export default function renderToday(container, data) {
  const converted = getToday(data);
  if (!converted) return;

  container.innerHTML = `
    <div class="app today">
      <h1>${converted.emoji}</h1>
      <h2>${converted.temp}</h2>
      <h3>${converted.city}</h3>
      <p>${converted.feelsLike} ⏺ ${converted.description}</p>
    </div>
  `;
}



