import Weather from "./Weather";
import {
  getApiOptionsTemplate,
  getConditionsTemplate,
  getErrorTemplate,
  getLoadingTemplate,
} from "./templates";

export default class UI {
  constructor(
    private contentWrapperEl: HTMLElement,
    private apiServicesEl: HTMLElement,
    private cityFormEl: HTMLElement
  ) {}

  public renderWeather(provider: string, weatherData: Weather): void {
    const template = getConditionsTemplate(provider, weatherData);
    this.updatecontentWrapperEl(template);
  }

  public renderError(errorData: AppError): void {
    const template = getErrorTemplate(errorData);
    this.updatecontentWrapperEl(template);
  }

  public renderLoading(): void {
    const template = getLoadingTemplate();
    this.updatecontentWrapperEl(template);
  }

  public renderApiServicesList(apiServices: string[]): void {
    const template = getApiOptionsTemplate(apiServices);
    this.updateApiServicesListEl(template);
  }

  public disableFormInteraction() {
    this.cityFormEl.classList.add("disabled-form")
  }

  public enableFormInteraction() {
    this.cityFormEl.classList.remove("disabled-form")
  }

  private updateApiServicesListEl(template: string) {
    this.apiServicesEl.innerHTML = template;
  }

  private updatecontentWrapperEl(template: string) {
    this.contentWrapperEl.innerHTML = template;
  }
}
