export function getConditionsTemplate({location,condition,temperature}: WeatherDetails): string {
    return `<div class="conditions-container">
    <p>Localização: <span>${location}</span></p>
    <p>Temperatura: <span>${temperature}°C</span></p>
    <p>Condições: <span>${condition}</span></p>
  </div>`
}

export function getErrorTemplate({message}: AppError): string {
    return `<div class="error-alert">
    <h2>${message}.</h2>
    <p></p>
  </div>`
}

export function getLoadingTemplate(): string {
    return `
    <div class="stage">
        <p class="loading-title">Buscando dados</p>
        <div class="dot-floating"></div>
    </div>
    `
}

export function getApiOptionsTemplate(apiList: string[]): string {
    return apiList.map(api => `<option value="${api}">${api}</option>`).join()
}