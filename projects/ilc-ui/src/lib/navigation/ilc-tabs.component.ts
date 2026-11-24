import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IlcIconComponent } from '../icon/ilc-icon.component';
import { IlcIconName } from '../icon/ilc-icon.types';

export interface IlcTabItem {
  id: string;
  label: string;
  icon?: IlcIconName;
  badge?: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'ilc-tabs',
  standalone: true,
  imports: [IlcIconComponent],
  template: `
    <div class="ilc-tabs" role="tablist" [attr.aria-label]="ariaLabel">
      @for (tab of tabs; track tab.id) {
        <button
          type="button"
          role="tab"
          class="ilc-tabs__tab"
          [class.ilc-tabs__tab--active]="tab.id === activeTab"
          [attr.aria-selected]="tab.id === activeTab"
          [disabled]="tab.disabled"
          (click)="selectTab(tab)"
        >
          @if (tab.icon) {
            <ilc-icon [name]="tab.icon" />
          }
          <span>{{ tab.label }}</span>
          @if (tab.badge !== undefined && tab.badge !== null) {
            <span class="ilc-tabs__badge">{{ tab.badge }}</span>
          }
        </button>
      }
    </div>
  `,
  styleUrl: './ilc-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcTabsComponent {
  @Input({ required: true }) tabs: readonly IlcTabItem[] = [];
  @Input() activeTab = '';
  @Input() ariaLabel = 'Navegação por abas';

  @Output() activeTabChange = new EventEmitter<string>();

  selectTab(tab: IlcTabItem): void {
    if (tab.disabled || tab.id === this.activeTab) {
      return;
    }
    this.activeTab = tab.id;
    this.activeTabChange.emit(tab.id);
  }
}
