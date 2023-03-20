interface WeatherDetails {
  location: string;
  temperature: number;
  condition: string;
  cod: number;
  message: string;
}

interface AppError {
  message: string;
}

type ApiServices = {
  [key: string]: new (city: string) => ApiService;
};