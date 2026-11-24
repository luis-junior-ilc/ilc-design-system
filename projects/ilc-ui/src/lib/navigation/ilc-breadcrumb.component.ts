import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IlcIconComponent } from '../icon/ilc-icon.component';

export interface IlcBreadcrumbItem {
  label: string;
  href?: string;
  id?: string;
}

@Component({
  selector: 'ilc-breadcrumb',
  standalone: true,
  imports: [IlcIconComponent],
  template: `
    <nav class="ilc-breadcrumb" aria-label="Breadcrumb">
      <ol class="ilc-breadcrumb__list">
        @for (item of items; track item.label; let isLast = $last) {
          <li class="ilc-breadcrumb__item">
            @if (!isLast) {
              @if (item.href) {
                <a class="ilc-breadcrumb__link" [href]="item.href" (click)="onItemClick($event, item)">
                  {{ item.label }}
                </a>
              } @else {
                <button type="button" class="ilc-breadcrumb__link" (click)="onItemClick($event, item)">
                  {{ item.label }}
                </button>
              }
              <ilc-icon class="ilc-breadcrumb__sep" name="chevron-right" aria-hidden="true" />
            } @else {
              <span class="ilc-breadcrumb__current" aria-current="page">{{ item.label }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styleUrl: './ilc-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcBreadcrumbComponent {
  @Input({ required: true }) items: readonly IlcBreadcrumbItem[] = [];
  @Output() itemClick = new EventEmitter<IlcBreadcrumbItem>();

  onItemClick(event: Event, item: IlcBreadcrumbItem): void {
    if (!item.href) {
      event.preventDefault();
    }
    this.itemClick.emit(item);
  }
}
