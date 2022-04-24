import { Component } from '@angular/core';
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html'
})
export class CurrentConditionsComponent {
  currentConditions: any
  constructor(private weatherService : WeatherService) {
    this.currentConditions = this.weatherService.getCurrentConditions();
  }

}
