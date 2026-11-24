import { NgModule } from '@angular/core';
import { IlcButtonComponent } from './button/ilc-button.component';
import { IlcIconComponent } from './icon/ilc-icon.component';
import { IlcAccordionComponent } from './accordion/ilc-accordion.component';
import { IlcAccordionItemComponent } from './accordion/ilc-accordion-item.component';
import { IlcLogoComponent } from './brand/ilc-logo.component';
import { IlcBrandRibbonComponent } from './brand/ilc-brand-ribbon.component';
import { IlcHeaderComponent } from './layout/ilc-header.component';
import { IlcBadgeComponent } from './data-display/ilc-badge.component';
import { IlcCardComponent } from './data-display/ilc-card.component';
import { IlcTabsComponent } from './navigation/ilc-tabs.component';
import { IlcBreadcrumbComponent } from './navigation/ilc-breadcrumb.component';

@NgModule({
  imports: [
    IlcButtonComponent,
    IlcIconComponent,
    IlcAccordionComponent,
    IlcAccordionItemComponent,
    IlcLogoComponent,
    IlcBrandRibbonComponent,
    IlcHeaderComponent,
    IlcBadgeComponent,
    IlcCardComponent,
    IlcTabsComponent,
    IlcBreadcrumbComponent,
  ],
  exports: [
    IlcButtonComponent,
    IlcIconComponent,
    IlcAccordionComponent,
    IlcAccordionItemComponent,
    IlcLogoComponent,
    IlcBrandRibbonComponent,
    IlcHeaderComponent,
    IlcBadgeComponent,
    IlcCardComponent,
    IlcTabsComponent,
    IlcBreadcrumbComponent,
  ]
})
export class IlcUiModule { }
