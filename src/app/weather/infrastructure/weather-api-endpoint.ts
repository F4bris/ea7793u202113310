import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WeatherReading } from '../domain/model/weather-reading.entity';
import { WeatherAssembler } from './weather.assembler';
import { WeatherResponse } from './weather.response';

export class WeatherApiEndpoint {
  private readonly endpointUrl = `${environment.weatherApiBaseUrl}${environment.weatherForecastEndpointPath}`;
  private readonly assembler = new WeatherAssembler();

  constructor(private readonly http: HttpClient) {}

  getCurrentWeather(latitude: number, longitude: number): Observable<WeatherReading> {
    return this.http
      .get<WeatherResponse>(this.endpointUrl, {
        params: { latitude, longitude, current: 'temperature_2m' },
      })
      .pipe(map((response) => this.assembler.toEntityFromResponse(response)));
  }
}
