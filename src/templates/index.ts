import Weather from "../Weather"

export function getConditionsTemplate(provider: string,{location,condition,temperature}: Weather): string {
    return `<div class="conditions-container">
    
    <p class="localization">Dados da localização <span>${location}</span></p>
    <p class="temperature">A temperatura atual é de <span>${temperature}°C</span></p>
    <p class="current-condition">A condição atual é <span>${condition}</span></p>
    <p class="provider">Dados providos por <span>${provider}</span></p>
  </div>`
}

export function getErrorTemplate({message}: AppError): string {
    return `<div class="error-alert">
    <h2>Fizesse cagada jow!</h2>
    <p>${message}</p>
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