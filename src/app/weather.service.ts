import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';

@Injectable()
export class WeatherService {

  static URL = 'http://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = [];

  constructor(private http: HttpClient) { }

  //Get the realtime Weather Condition of a specific Country and ZipCode from OpenWeather API 
  getCurrentCondition(zipcode: string, countrycode : string): Observable<any> {
    return this.http.get(`${WeatherService.URL}/weather?zip=${zipcode},${countrycode}&units=imperial&APPID=${WeatherService.APPID}`);
  }

  loadCurrentConditions(zipcode: string, countrycode : string): void {
    
    this.getCurrentCondition(zipcode, countrycode)
      .subscribe(data => this.pushCondition(zipcode, countrycode, data) );
  }

  removeCurrentConditions(zipcode: string) {
    for (let i in this.currentConditions){
      if (this.currentConditions[i].zip == zipcode)
        this.currentConditions.splice(+i, 1);
    }
  }

  getCurrentConditions(): any[] {
    return this.currentConditions;
  }

  pushCondition(zipcode: string, countrycode: string, data: any): void {
    this.currentConditions.push({zip: zipcode, country: countrycode, data: data})
  }

  getForecast(zipcode: string, countrycode: string,): Observable<any> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get(`${WeatherService.URL}/forecast?zip=${zipcode},${countrycode}&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);

  }

  getWeatherIcon(id){
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }

}
