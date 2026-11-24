import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type IlcBrandRibbonHeight = 'xs' | 'sm' | 'md';

@Component({
  selector: 'ilc-brand-ribbon',
  standalone: true,
  template: '<span class="ilc-brand-ribbon" aria-hidden="true"></span>',
  styleUrl: './ilc-brand-ribbon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcBrandRibbonComponent {
  @Input() @HostBinding('attr.data-height') height: IlcBrandRibbonHeight = 'sm';
  @Input() @HostBinding('class.ilc-brand-ribbon--animated') animated = false;
}
