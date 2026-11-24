import { NgModule } from '@angular/core';
import { IlcButtonComponent } from './button/ilc-button.component';
import { IlcIconComponent } from './icon/ilc-icon.component';
import { IlcAccordionComponent } from './accordion/ilc-accordion.component';
import { IlcAccordionItemComponent } from './accordion/ilc-accordion-item.component';

@NgModule({
  imports: [
    IlcButtonComponent,
    IlcIconComponent,
    IlcAccordionComponent,
    IlcAccordionItemComponent,
  ],
  exports: [
    IlcButtonComponent,
    IlcIconComponent,
    IlcAccordionComponent,
    IlcAccordionItemComponent,
  ]
})
export class IlcUiModule { }
