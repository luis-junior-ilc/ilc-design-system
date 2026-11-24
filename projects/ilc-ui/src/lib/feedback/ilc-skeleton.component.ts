import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type IlcSkeletonVariant = 'text' | 'rect' | 'circle';

@Component({
  selector: 'ilc-skeleton',
  standalone: true,
  template: `
    @if (variant === 'text' && lines > 1) {
      <div class="ilc-skeleton-group" aria-hidden="true">
        @for (idx of lineIndices; track idx; let isLast = $last) {
          <span
            class="ilc-skeleton ilc-skeleton--text"
            [style.width]="isLast ? '72%' : width"
            [style.height]="resolvedHeight"
          ></span>
        }
      </div>
    } @else {
      <span
        class="ilc-skeleton"
        [class.ilc-skeleton--text]="variant === 'text'"
        [class.ilc-skeleton--rect]="variant === 'rect'"
        [class.ilc-skeleton--circle]="variant === 'circle'"
        [style.width]="width"
        [style.height]="resolvedHeight"
        aria-hidden="true"
      ></span>
    }
  `,
  styleUrl: './ilc-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcSkeletonComponent {
  @Input() @HostBinding('attr.data-variant') variant: IlcSkeletonVariant = 'text';
  @Input() width = '100%';
  @Input() height = '';
  @Input() lines = 1;

  get resolvedHeight(): string {
    if (this.height) {
      return this.height;
    }
    if (this.variant === 'circle') {
      return this.width;
    }
    return this.variant === 'text' ? '14px' : '96px';
  }

  get lineIndices(): number[] {
    return Array.from({ length: Math.max(1, this.lines) }, (_, i) => i);
  }
}
