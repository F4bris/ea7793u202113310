export class WeatherReading {
  constructor(
    readonly temperature: number,
    readonly unit: string,
    readonly time: Date,
  ) {}
}
