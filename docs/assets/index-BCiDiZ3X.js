(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`1d227549e94153f65d657c02aa43df43`;async function t(t,n=`weather`){let r=`https://api.openweathermap.org/data/2.5/${n}?q=${t}&appid=${e}&units=metric&lang=en`;try{let e=await fetch(r);if(!e.ok)throw Error(`City not found or wrong endpoint: ${e.status}`);return await e.json()}catch(e){console.error(`Error appeared while requesting weather:`,e.message)}}function n(e){if(!e||!e.weather||!e.weather[0])return null;let t=e.weather[0].id,n=`🌡️`;return t>=200&&t<300?n=`⛈️`:t>=300&&t<600?n=`🌧️`:t>=600&&t<700?n=`❄️`:t>=700&&t<800?n=`🌫️`:t===800?n=`☀️`:t===801||t===802?n=`⛅`:t>=803&&(n=`☁️`),{city:e.name,temp:`${Math.round(e.main.temp)}°C`,feelsLike:`Feels like ${Math.round(e.main.feels_like)}°C`,emoji:n,description:e.weather[0].description}}function r(e,t){let r=n(t);r&&(e.innerHTML=`
    <div class="app today">
      <h1>${r.emoji}</h1>
      <h2>${r.temp}</h2>
      <h3>${r.city}</h3>
      <p>${r.feelsLike} ⏺ ${r.description}</p>
    </div>
  `)}function i(e){if(!e||!e.list)return[];let t=new Map,n=Date.now(),r=null,i=1/0;e.list.forEach(e=>{let t=Math.abs(e.dt*1e3-n);t<i&&(i=t,r=e)}),e.list.map(e=>{let t=e.weather[0].id,n=`🌡️`;t>=200&&t<300?n=`⛈️`:t>=300&&t<600?n=`🌧️`:t>=600&&t<700?n=`❄️`:t>=700&&t<800?n=`🌫️`:t===800?n=`☀️`:t===801||t===802?n=`⛅`:t>=803&&(n=`☁️`);let i=e.dt*1e3,a=new Date(i),o=a.toLocaleDateString([],{weekday:`short`}),s=a.toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`}),c=e.pop?`${Math.round(e.pop*100)}%`:`0%`;return{dayName:o,time:s,emoji:n,pop:c,temp:`${Math.round(e.main.temp)}°C`,now:e===r}}).forEach(({dayName:e,...n})=>{t.has(e)||t.set(e,[]),t.get(e).push(n)});let a=Array.from(t,([e,t])=>({day:e,hours:t}));if(a.length>1&&a[0].hours.length<8){let e=8-a[0].hours.length,t=a[1].hours.slice(0,e).map(e=>({...e,now:e.now}));a[0].hours=[...a[0].hours,...t]}return a}function a(e,t,n){let r=i(t);if(!r.length)return;e.innerHTML=`
    <div class="app fcast">
      <div class="weekDays"></div>
      <div class="dayHours"></div>
    </div>
  `;let a=e.querySelector(`.weekDays`),o=e.querySelector(`.dayHours`),s=e=>{o.innerHTML=e.map(e=>`
      <div class="item ${e.now?`active`:``}" data-time="${e.time}">
        <p>${e.time}</p>
        <i>${e.emoji}</i>
        <h3>${e.pop}</h3>
        <h2>${e.temp}</h2>
      </div>
    `).join(``),o.querySelectorAll(`.item`).forEach((t,r)=>{t.addEventListener(`click`,()=>{o.querySelectorAll(`.item`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),n&&n(e[r].time)})})};r.forEach((e,t)=>{let r=document.createElement(`div`);r.className=`item ${t===0?`active`:``}`,r.innerHTML=`<h3>${t===0?`Today`:e.day} ${e.hours[0]?.temp||``} ${e.hours[0]?.emoji||``}</h3>`,r.addEventListener(`click`,()=>{a.querySelectorAll(`.item`).forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`),s(e.hours),e.hours[0]&&n&&n(e.hours[0].time)}),a.appendChild(r)}),s(r[0].hours)}function o(e){if(!e)return null;let t=e.main||e.list?.[0]?.main,n=e.wind||e.list?.[0]?.wind,r=e.visibility||e.list?.[0]?.visibility;if(!t)return null;let i=t.temp,a=t.humidity,o=n?.speed?`${Math.round(n.speed)} m/s`:`0 m/s`,s=n?.deg??0,c=[`N`,`NNE`,`NE`,`ENE`,`E`,`ESE`,`SE`,`SSE`,`S`,`SSW`,`SW`,`WSW`,`W`,`WNW`,`NW`,`NNW`][Math.round(s/22.5)%16],l=r?`${Math.round(r/1e3)}km`:`10km`,u=t.pressure?`${t.pressure} hPa`:`1000 hPa`,d=17.27,f=237.7,p=d*i/(f+i)+Math.log(a/100),m=f*p/(d-p),h=`${Math.round(m)}°C`;return{wind:`${o} ${c}`,humidity:`${a}%`,visibility:l,pressure:u,uvIndex:`0 UV`,dewPoint:h}}function s(e,t){let n=o(t);n&&(e.innerHTML=`
    <div class="app det">
      <div class="col">
        <div class="item active">
          <h2>🌬️Wind</h2>
          <h3>${n.wind}</h3>
        </div>
        <div class="item">
          <h2>🧭Pressure</h2>
          <h3>${n.pressure}</h3>
        </div>
      </div>
      <div class="col">
        <div class="item">
          <h2>💧Humidity</h2>
          <h3>${n.humidity}</h3>
        </div>
        <div class="item active">
          <h2>☀️UV Index</h2>
          <h3>${n.uvIndex}</h3>
        </div>
      </div>
      <div class="col">
        <div class="item active">
          <h2>👁️Visibility</h2>
          <h3>${n.visibility}</h3>
        </div>
        <div class="item">
          <h2>💧Dew Point</h2>
          <h3>${n.dewPoint}</h3>
        </div>
      </div>
    </div>
  `)}var c=document.createElement(`div`);c.className=`screen-container`,document.body.insertBefore(c,document.querySelector(`.bar`));var l=document.querySelectorAll(`.bar .item`),u=0,d=null,f=null,p=null;function m(){c.innerHTML=``,u===0&&d?r(c,d):u===1&&f?a(c,f,e=>{p=f.list.find(t=>new Date(t.dt*1e3).toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})===e)}):u===2&&s(c,p||f?.list[0])}l.forEach((e,t)=>{e.addEventListener(`click`,()=>{l.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),u=t,m()})});async function h(){try{let e=`Vinnytsia`,[n,r]=await Promise.all([t(e,`weather`),t(e,`forecast`)]);d=n,f=r,r?.list&&(p=r.list[0]),m()}catch(e){console.error(e)}}h();