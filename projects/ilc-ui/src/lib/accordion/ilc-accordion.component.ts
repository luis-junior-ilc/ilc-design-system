import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ilc-accordion',
  standalone: true,
  templateUrl: './ilc-accordion.component.html',
  styleUrl: './ilc-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcAccordionComponent {}
