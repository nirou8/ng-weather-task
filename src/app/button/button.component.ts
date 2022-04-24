import { ChangeDetectorRef, Component, Input, QueryList, SimpleChanges, TemplateRef, ViewChildren } from "@angular/core";
export const DEFAULT_STATE = 0
export const WORKING_STATE = 1
export const DONE_STATE = 2
export const ERROR_STATE = 3
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent{
    @ViewChildren('buttonStateTemplate') buttonStateTemplate: QueryList<TemplateRef<any>>;
    @Input() buttonState: any;
    selectedButtonStateTemplate: TemplateRef<any>
    constructor(private changeDetectorRef: ChangeDetectorRef){}
    ngAfterViewInit(): void {
      this.selectedButtonStateTemplate = this.buttonStateTemplate.toArray()[this.buttonState];
      this.changeDetectorRef.detectChanges()
    }

    ngOnChanges(changes: SimpleChanges) {
      if(!changes.buttonState.firstChange)
        this.selectedButtonStateTemplate = this.buttonStateTemplate.toArray()[this.buttonState]; 
    }
  
}