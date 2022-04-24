import { Component } from '@angular/core';
import { DEFAULT_STATE, DONE_STATE, ERROR_STATE, WORKING_STATE } from 'app/button/button.component';
import { WeatherService } from 'app/weather.service';
import {LocationService} from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent{
  buttonState = DEFAULT_STATE
  constructor(private service : LocationService, private weatherService : WeatherService) {

   }

  addLocation(zipcode : any, countrycode : any){
    this.buttonState = WORKING_STATE
    this.weatherService.getCurrentCondition(zipcode.value, countrycode.value).subscribe(
      data => {
        this.weatherService.pushCondition(zipcode.value, countrycode.value, data)
       this.buttonState = DONE_STATE
        this.service.addLocation(zipcode.value, countrycode.value)
      },
      error =>{
        console.log(error)
        this.buttonState = ERROR_STATE
      }
      );

      setTimeout(() => {
        zipcode.value = ''
        countrycode.value = ''
        this.buttonState = DEFAULT_STATE
      }, 500)

  }

}
