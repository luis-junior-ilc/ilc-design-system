import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IlcIconComponent } from '../icon/ilc-icon.component';
import { IlcIconName } from '../icon/ilc-icon.types';

@Component({
  selector: 'ilc-empty-state',
  standalone: true,
  imports: [IlcIconComponent],
  template: `
    <div class="ilc-empty-state">
      <div class="ilc-empty-state__icon" aria-hidden="true">
        <ilc-icon [name]="icon" />
      </div>
      <h3 class="ilc-empty-state__title">{{ title }}</h3>
      @if (description) {
        <p class="ilc-empty-state__description">{{ description }}</p>
      }
      <div class="ilc-empty-state__actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './ilc-empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcEmptyStateComponent {
  @Input() title = 'Nenhum registro encontrado';
  @Input() description = '';
  @Input() icon: IlcIconName = 'package';
}
