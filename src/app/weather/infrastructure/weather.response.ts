import { WeatherCurrentResource } from './weather-current.resource';

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  current_units: { time: string; interval: string; temperature_2m: string };
  current: WeatherCurrentResource;
}
