import Weather from "../Weather";
import env from "../env";

export default {
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
    params: {
        exclude: "minutely,hourly,daily,alerts",
        appid: env.OPEN_WEATHER_API_KEY,
        units: "metric",
        lang: "pt",
      },
    parser: (response) => {
        const {  weather, main: {temp}, name, sys: {country} } = response || {};
        const {description} = weather[0]
        return new Weather(`${name}, ${country}`,temp,description)
    }
} as ApiProvider