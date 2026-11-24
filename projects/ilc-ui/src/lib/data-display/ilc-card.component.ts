import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { IlcBrandRibbonComponent } from '../brand/ilc-brand-ribbon.component';

export type IlcCardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'ilc-card',
  standalone: true,
  imports: [IlcBrandRibbonComponent],
  template: `
    <section class="ilc-card">
      @if (accentRibbon) {
        <ilc-brand-ribbon height="xs" />
      }
      @if (title || subtitle) {
        <header class="ilc-card__header">
          <div class="ilc-card__titles">
            @if (title) { <h3 class="ilc-card__title">{{ title }}</h3> }
            @if (subtitle) { <p class="ilc-card__subtitle">{{ subtitle }}</p> }
          </div>
          <div class="ilc-card__header-actions">
            <ng-content select="[ilcCardActions]"></ng-content>
          </div>
        </header>
      }
      <div class="ilc-card__body">
        <ng-content></ng-content>
      </div>
      <footer class="ilc-card__footer">
        <ng-content select="[ilcCardFooter]"></ng-content>
      </footer>
    </section>
  `,
  styleUrl: './ilc-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() accentRibbon = false;
  @Input() @HostBinding('class.ilc-card--elevated') elevated = false;
  @Input() @HostBinding('attr.data-padding') padding: IlcCardPadding = 'md';
}
