import { ChangeDetectorRef, Component, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { WeatherService } from 'app/weather.service';
import {LocationService} from "../location.service";

// As you add new buttons states in the HTML you need to their relative states const here
const DEFAULT_STATE = 0
const WORKING_STATE = 1
const DONE_STATE = 2
const ERROR_STATE = 3
@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent{
  // We used ViewChildren here to avoid calling multiple @ViewChild
  @ViewChildren('buttonStateTemplate') buttonStateTemplate: QueryList<TemplateRef<any>>;
  selectedButtonStateTemplate: TemplateRef<any>
  constructor(private service : LocationService, private weatherService : WeatherService, private changeDetectorRef: ChangeDetectorRef) {

   }

   ngAfterViewInit(): void {
    this.selectedButtonStateTemplate = this.buttonStateTemplate.toArray()[DEFAULT_STATE];
    this.changeDetectorRef.detectChanges()
  }

  addLocation(zipcode : any, countrycode : any){
    this.selectedButtonStateTemplate = this.buttonStateTemplate.toArray()[WORKING_STATE];
    this.weatherService.getCurrentCondition(zipcode.value, countrycode.value).subscribe(
      data => {
        this.weatherService.pushCondition(zipcode.value, countrycode.value, data)
        this.selectedButtonStateTemplate = this.buttonStateTemplate.toArray()[DONE_STATE];
        this.service.addLocation(zipcode.value, countrycode.value)
      },
      error =>{
        console.log(error)
        this.selectedButtonStateTemplate = this.buttonStateTemplate.toArray()[ERROR_STATE];
      }
      );

      setTimeout(() => {
        zipcode.value = ''
        countrycode.value = ''
        this.selectedButtonStateTemplate = this.buttonStateTemplate.toArray()[DEFAULT_STATE];
      }, 500)

  }

}
