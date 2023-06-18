interface AppError {
  message: string;
}

interface ApiProviderParams {
  cityParam: string;
}

interface ApiProvider {
  baseUrl: string;
  cityQueryParam: string
  params: Record<string,string>
  parser: (response) => Weather
}