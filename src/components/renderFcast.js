import getFcast from '../utils/getFcast.js';

export default function renderFcast(container, data, onHourSelect) {
  const fcastData = getFcast(data);
  if (!fcastData.length) return;

  container.innerHTML = `
    <div class="app fcast">
      <div class="weekDays"></div>
      <div class="dayHours"></div>
    </div>
  `;

  const weekDaysContainer = container.querySelector('.weekDays');
  const dayHoursContainer = container.querySelector('.dayHours');

  const renderHours = (hours) => {
    dayHoursContainer.innerHTML = hours.map(hour => `
      <div class="item ${hour.now ? 'active' : ''}" data-time="${hour.time}">
        <p>${hour.time}</p>
        <i>${hour.emoji}</i>
        <h3>${hour.pop}</h3>
        <h2>${hour.temp}</h2>
      </div>
    `).join('');

    dayHoursContainer.querySelectorAll('.item').forEach((hourDiv, idx) => {
      hourDiv.addEventListener('click', () => {
        dayHoursContainer.querySelectorAll('.item').forEach(h => h.classList.remove('active'));
        hourDiv.classList.add('active');
        if (onHourSelect) onHourSelect(hours[idx].time);
      });
    });
  };

  fcastData.forEach((dayObj, index) => {
    const dayDiv = document.createElement('div');
    dayDiv.className = `item ${index === 0 ? 'active' : ''}`;
    dayDiv.innerHTML = `<h3>${index === 0 ? 'Today' : dayObj.day} ${dayObj.hours[0]?.temp || ''} ${dayObj.hours[0]?.emoji || ''}</h3>`;
    
    dayDiv.addEventListener('click', () => {
      weekDaysContainer.querySelectorAll('.item').forEach(d => d.classList.remove('active'));
      dayDiv.classList.add('active');
      renderHours(dayObj.hours);
      if (dayObj.hours[0] && onHourSelect) onHourSelect(dayObj.hours[0].time);
    });

    weekDaysContainer.appendChild(dayDiv);
  });

  renderHours(fcastData[0].hours);
}