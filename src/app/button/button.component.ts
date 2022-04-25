import {Component, Input, TemplateRef } from "@angular/core";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent{ 
    @Input() selectedButtonStateTemplate: TemplateRef<any>; 
    constructor(){}

}