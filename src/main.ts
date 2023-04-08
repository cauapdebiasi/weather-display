import './style.css'
import api from "./Api";
import UI from "./UI";

const appMainEl = document.querySelector("main") as HTMLElement;
const apiServicesEl = document.querySelector("select") as HTMLSelectElement; 
const ctaButtonEl = document.querySelector("button");
const cityInputEl = document.getElementById("city") as HTMLInputElement;
const cityFormEl = document.querySelector("form") as HTMLFormElement;

const ui = new UI(appMainEl, apiServicesEl, cityFormEl)

async function makeWeatherRequest() {
  try {
    ui.disableFormInteraction()
    ui.renderLoading()
    const city = cityInputEl.value
    const selectedApi = apiServicesEl.value
    const response = await api.fetchWeather(selectedApi, city)
    ui.renderWeather(selectedApi, response)
    ui.enableFormInteraction()
  } catch (error) {
    ui.renderError({message: String(error)})
    ui.enableFormInteraction()
  }
  
}

ctaButtonEl?.addEventListener("click", makeWeatherRequest)

cityFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  makeWeatherRequest();
});

ui.renderApiServicesList(api.apiServices)
window.addEventListener('error', error => ui.renderError({message: String(error)}))