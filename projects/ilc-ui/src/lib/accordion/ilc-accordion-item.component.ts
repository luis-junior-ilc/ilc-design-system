import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ilc-accordion-item',
  standalone: true,
  templateUrl: './ilc-accordion-item.component.html',
  styleUrl: './ilc-accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcAccordionItemComponent {
  @Input({ required: true }) title = '';
  @Input() expanded = false;
}
