import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type IlcBadgeTone = 'neutral' | 'primary' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export type IlcBadgeSize = 'sm' | 'md';

@Component({
  selector: 'ilc-badge',
  standalone: true,
  template: `
    <span class="ilc-badge">
      @if (dot) {
        <span class="ilc-badge__dot" aria-hidden="true"></span>
      }
      <ng-content></ng-content>
    </span>
  `,
  styleUrl: './ilc-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcBadgeComponent {
  @Input() @HostBinding('attr.data-tone') tone: IlcBadgeTone = 'neutral';
  @Input() @HostBinding('attr.data-size') size: IlcBadgeSize = 'md';
  @Input() @HostBinding('class.ilc-badge--outline') outline = false;
  @Input() dot = false;
}
