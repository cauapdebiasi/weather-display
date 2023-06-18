import Weather from "../Weather";
import env from "../env";

export default {
    baseUrl: "http://api.weatherapi.com/v1/current.json",
    cityQueryParam: "q",
    params: {
        key: env.WEATHER_API_KEY,
        lang: "pt",
      },
    parser: (response) => {
        const { location: {name,region,country}, current: {temp_c, condition: {text}} } = response || {};
        return new Weather(`${name}, ${region}, ${country}`,temp_c,text)
    }
} as ApiProvider