import Weather from "./Weather";
import OpenWeatherApi from "./providers/OpenWeatherApi";
import WeatherApi from "./providers/WeatherApi";

export class Api {

  private _apiServices: Record<string,ApiProvider> = {}

  constructor() {}

  get apiServices(): string[] {
    return Object.keys(this._apiServices)
  }

  public registerProvider(name: string, provider: ApiProvider): void {
    this._apiServices[name] = provider
  }

  public async fetchWeather(api: string, city: string): Promise<Weather> {
    const selectedApi = this._apiServices[api]
    const params = new URLSearchParams(selectedApi.params);
    params.set(selectedApi.cityQueryParam, city)

    const response = await fetch(`${selectedApi.baseUrl}?${params.toString()}`);
    const data = await response.json();
  
    if (response.ok) {
      return selectedApi.parser(data);
    } else {
      throw new Error(data.message || "Unknown error");
    }
  }
}

const api = new Api()
api.registerProvider('Open Weather API', OpenWeatherApi)
api.registerProvider('Weather API', WeatherApi)

export default api
