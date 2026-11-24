import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IlcBrandRibbonComponent } from '../brand/ilc-brand-ribbon.component';
import { IlcLogoComponent } from '../brand/ilc-logo.component';

export type IlcHeaderVariant = 'navy' | 'surface';

@Component({
  selector: 'ilc-header',
  standalone: true,
  imports: [IlcLogoComponent, IlcBrandRibbonComponent],
  templateUrl: './ilc-header.component.html',
  styleUrl: './ilc-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() @HostBinding('attr.data-variant') variant: IlcHeaderVariant = 'navy';
  @Input() @HostBinding('class.ilc-header--sticky') sticky = false;
  @Input() showRibbon = true;
  @Input() showThemeToggle = false;
  @Input() darkMode = false;

  @Output() themeToggle = new EventEmitter<void>();
}
