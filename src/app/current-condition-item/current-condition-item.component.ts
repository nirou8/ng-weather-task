import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {WeatherService} from "../weather.service";
import {Router} from "@angular/router";
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocationService } from 'app/location.service';

@Component({
  selector: 'app-current-condition-item',
  templateUrl: './current-condition-item.component.html',
  styleUrls: ['./current-condition-item.component.css']
})
export class CurrentConditionItemComponent implements OnInit, OnDestroy {
  @Input() location
  polldata : Subscription

  constructor(private weatherService : WeatherService, private locationService: LocationService, private router : Router) {
   
  }
  ngOnInit(): void {
    this.polldata = interval(30000)
    .pipe(
      switchMap(() => this.weatherService
      .getCurrentCondition(this.location.zip, this.location.country))
    ) 
    .subscribe(data => this.location.data = data)
  }
 

  showForecast(){
    this.router.navigate(['/forecast', this.location.zip, this.location.country])
  }

  removeCondition(e){
    this.locationService.removeLocation(this.location.zip);
    e.stopPropagation()
  }

  ngOnDestroy(): void {
    this.polldata.unsubscribe();
  }

}
