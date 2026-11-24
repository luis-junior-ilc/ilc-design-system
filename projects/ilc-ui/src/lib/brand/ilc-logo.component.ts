import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type IlcLogoVariant = 'full' | 'mark';
export type IlcLogoTheme = 'auto' | 'light' | 'dark';
export type IlcLogoSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ilc-logo',
  standalone: true,
  templateUrl: './ilc-logo.component.html',
  styleUrl: './ilc-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcLogoComponent {
  @Input() variant: IlcLogoVariant = 'full';
  @Input() @HostBinding('attr.data-logo-theme') theme: IlcLogoTheme = 'auto';
  @Input() @HostBinding('attr.data-size') size: IlcLogoSize = 'md';
  @Input() @HostBinding('class.ilc-logo--safe-area') safeArea = false;
  @Input() ariaLabel = 'ILC — Integrator Logistics Company';
}
