import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

export const ILC_PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

@Component({
  selector: 'ilc-pagination',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './ilc-pagination.component.html',
  styleUrl: './ilc-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.aria-label]': 'ariaLabel()' }
})
export class IlcPaginationComponent {
  readonly length = input(0);
  readonly pageSizeOptions = input<number[]>(ILC_PAGE_SIZE_OPTIONS);
  readonly ariaLabel = input('Paginação');
  readonly pageIndex = model(0);
  readonly pageSize = model(5);
  readonly pageChange = output<PageEvent>();

  onPage(event: PageEvent): void {
    this.pageIndex.set(event.pageSize === this.pageSize() ? event.pageIndex : 0);
    this.pageSize.set(event.pageSize);
    this.pageChange.emit(event);
  }
}
