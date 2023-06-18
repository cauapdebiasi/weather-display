import './style.css'
import api from "./Api";
import UI from "./UI";

const appMainEl = document.querySelector("main") as HTMLElement;
const apiServicesEl = document.querySelector("select") as HTMLSelectElement; 
const ctaButtonEl = document.querySelector("button");
const cityInputEl = document.getElementById("city") as HTMLInputElement;
const cityFormEl = document.querySelector("form") as HTMLFormElement;
const addressWrapperEl = document.querySelector(".address") as HTMLElement;

const ui = new UI(appMainEl, apiServicesEl, cityFormEl, addressWrapperEl)

function getAddress() {
  return fetch('http://127.0.0.1:3000/ip')
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;
    // Use the ipAddress variable to display or process the IP address
    ui.updateAddress(ipAddress)
  })
  .catch(error => {
    ui.updateAddress("Não foi possível obter endereço ip")
  });
}

async function makeWeatherRequest() {
  try {
    const city = cityInputEl.value
    const selectedApi = apiServicesEl.value
    if (!city || !selectedApi) return
    
    ui.disableFormInteraction()
    ui.renderLoading()
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
getAddress()