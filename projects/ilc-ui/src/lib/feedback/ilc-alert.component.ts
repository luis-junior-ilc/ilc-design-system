import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IlcIconComponent } from '../icon/ilc-icon.component';
import { IlcIconName } from '../icon/ilc-icon.types';

export type IlcAlertTone = 'info' | 'success' | 'warning' | 'danger';

const ALERT_ICONS: Record<IlcAlertTone, IlcIconName> = {
  info: 'info',
  success: 'check',
  warning: 'alert',
  danger: 'alert'
};

@Component({
  selector: 'ilc-alert',
  standalone: true,
  imports: [IlcIconComponent],
  template: `
    <div class="ilc-alert" role="status">
      <ilc-icon class="ilc-alert__icon" [name]="iconName" aria-hidden="true" />
      <div class="ilc-alert__content">
        @if (title) {
          <strong class="ilc-alert__title">{{ title }}</strong>
        }
        <div class="ilc-alert__message">
          <ng-content></ng-content>
        </div>
      </div>
      @if (dismissible) {
        <button
          type="button"
          class="ilc-alert__close"
          aria-label="Fechar alerta"
          (click)="dismissed.emit()"
        >
          <ilc-icon name="close" />
        </button>
      }
    </div>
  `,
  styleUrl: './ilc-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcAlertComponent {
  @Input() @HostBinding('attr.data-tone') tone: IlcAlertTone = 'info';
  @Input() title = '';
  @Input() dismissible = false;
  @Output() dismissed = new EventEmitter<void>();

  get iconName(): IlcIconName {
    return ALERT_ICONS[this.tone];
  }
}
