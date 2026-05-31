import getDet from '../utils/getDet.js';

export default function renderDet(container, rawHourData) {
  const details = getDet(rawHourData);
  if (!details) return;

  container.innerHTML = `
    <div class="app det">
      <div class="col">
        <div class="item active">
          <h2>🌬️Wind</h2>
          <h3>${details.wind}</h3>
        </div>
        <div class="item">
          <h2>🧭Pressure</h2>
          <h3>${details.pressure}</h3>
        </div>
      </div>
      <div class="col">
        <div class="item">
          <h2>💧Humidity</h2>
          <h3>${details.humidity}</h3>
        </div>
        <div class="item active">
          <h2>☀️UV Index</h2>
          <h3>${details.uvIndex}</h3>
        </div>
      </div>
      <div class="col">
        <div class="item active">
          <h2>👁️Visibility</h2>
          <h3>${details.visibility}</h3>
        </div>
        <div class="item">
          <h2>💧Dew Point</h2>
          <h3>${details.dewPoint}</h3>
        </div>
      </div>
    </div>
  `;
}