import { Injectable } from '@angular/core';
import {WeatherService} from "./weather.service";

export const LOCATIONS : string = "locations";
export const COUNTRIES : string = "countries";

@Injectable()
export class LocationService {

  locations : string[] = [];
  countries : string[] = [];

  constructor(private weatherService : WeatherService) {
    let locString = localStorage.getItem(LOCATIONS);
    let countryString = localStorage.getItem(COUNTRIES);
    if (locString && countryString){
      this.locations = JSON.parse(locString);
      this.countries = JSON.parse(countryString);
    }
    this.locations.forEach((loc, i) => {
      this.weatherService.loadCurrentConditions(loc, this.countries[i] );
    });
  }

  addLocation(zipcode : string, countrycode: string){
    this.locations.push(zipcode);
    this.countries.push(countrycode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    localStorage.setItem(COUNTRIES, JSON.stringify(this.countries));
  }

  removeLocation(zipcode : string){
    let index = this.locations.indexOf(zipcode);
    if (index !== -1){
      this.locations.splice(index, 1);
      this.countries.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      localStorage.setItem(COUNTRIES, JSON.stringify(this.countries));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}
