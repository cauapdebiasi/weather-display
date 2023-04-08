export default class Weather {
    private _location: string;
    private _temperature: number;
    private _condition: string;
  
    constructor(location: string, temperature: number, condition: string) {
      this._location = location;
      this._temperature = temperature;
      this._condition = condition;
    }
  
    get location(): string {
      return this._location;
    }
  
    get temperature(): number {
      return this._temperature;
    }
  
    get condition(): string {
      return this._condition;
    }
  }