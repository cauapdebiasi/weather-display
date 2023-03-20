import "./style.css";
import {
  getApiOptionsTemplate,
  getConditionsTemplate,
  getErrorTemplate,
  getLoadingTemplate,
} from "./templates";

const appMainEl = document.querySelector("main");
const apiServicesEl = document.querySelector("select");
const ctaButtonEl = document.querySelector("button");
const cityInputEl = document.getElementById("city") as HTMLInputElement;
const cityFormEl = document.querySelector("form") as HTMLFormElement;

interface Api {
  endpoint: string;
  params: Record<string, string>;
  getData: (data: Record<string, any>) => Promise<WeatherDetails>;
}

class OpenWeatherApi implements Api {
  endpoint = "https://api.openweathermap.org/data/2.5/weather";
  params = {
    exclude: "minutely,hourly,daily,alerts",
    appid: "66b8240136c5b278a5d0505f286c5ad4",
    units: "metric",
    lang: "pt",
  };
  async getData(data: Record<string, any>): Promise<WeatherDetails> {
    const { cod, message, weather, main, name, sys } = data || {};
    const {country} = sys
    const { temp } = main;
    const { description } = weather[0];
    return { cod, message, location: `${name}, ${country}`, temperature: temp, condition: description };
  }
}

class WeatherApi implements Api {
  endpoint = "http://api.weatherapi.com/v1/current.json";
  params = {
    key:"fcbf6d74d9954e71bf9224701232003",
    lang: "pt"
  };
  async getData(data: Record<string, any>): Promise<WeatherDetails> {
    const {cod, message,location, current} = data || {}
    const { name, country } = location
    const {temp_c: temp, condition} = current
    const { text: description} = condition
    return { cod, message, location: `${name}, ${country}`, temperature: temp, condition: description };
  }
}

const apiServices: Record<string, Api> = {
  "Open Weather API": new OpenWeatherApi(),
  "Weather API": new WeatherApi(),
};

async function fetchWeather(api: Api, city: string): Promise<WeatherDetails> {
  const params = new URLSearchParams(api.params);
  params.set("q", city);

  const response = await fetch(`${api.endpoint}?${params.toString()}`);
  const data = await response.json();

  if (response.ok) {
    return api.getData(data);
  } else {
    throw new Error(data.message || "Unknown error");
  }
}

function renderApiServicesList(apiList: string[]) {
  if (!apiServicesEl) throw alert("Não foi possível renderizar o conteúdo");
  const template = getApiOptionsTemplate(apiList);
  renderInsideElement(apiServicesEl, template);
}

function renderInsideElement(element: HTMLElement, content: string): void {
  element.innerHTML = content;
}

function renderConditions(weatherConditions: WeatherDetails): void {
  if (!appMainEl) throw alert("Não foi possível renderizar o conteúdo");
  const template = getConditionsTemplate(weatherConditions);
  renderInsideElement(appMainEl, template);
}

function renderError(error: AppError) {
  if (!appMainEl) throw alert("Erro interno");
  const template = getErrorTemplate(error);
  renderInsideElement(appMainEl, template);
}

function renderLoading() {
  if (!appMainEl) throw alert("Não foi possível renderizar o conteúdo");
  const template = getLoadingTemplate();
  renderInsideElement(appMainEl, template);
}

async function makeWeatherRequest() {
  renderLoading();
  const selectedApi = apiServicesEl?.value || "";
  if (!apiServices[selectedApi])
    return renderError({ message: "Nenhuma api selecionada!" });

  const selectedCity = cityInputEl?.value;
  if (!selectedCity)
    return renderError({ message: "Nenhuma cidade informada!" });

  try {
    const weatherData = await fetchWeather(apiServices[selectedApi], selectedCity);
    renderConditions(weatherData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      renderError({ message: error.message });
      // handle specific error types
    } else {
      // handle other types of errors
      renderError({ message: String(error) });
    }
  }
}

ctaButtonEl?.addEventListener("click", makeWeatherRequest)

cityFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  makeWeatherRequest();
});

renderApiServicesList(Object.keys(apiServices))