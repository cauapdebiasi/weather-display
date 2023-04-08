interface AppError {
  message: string;
}

interface ApiProvider {
  baseUrl: string;
  params: record<string,string>;
  parser: (response) => Weather
}