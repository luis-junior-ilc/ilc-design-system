import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export type IlcMetricTone = 'azure' | 'teal' | 'amber' | 'rose';

@Component({
  selector: 'ilc-metric-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './ilc-metric-card.component.html',
  styleUrl: './ilc-metric-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-tone]': 'tone()' }
})
export class IlcMetricCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<string | number>();
  readonly detail = input('');
  readonly icon = input('');
  readonly tone = input<IlcMetricTone>('azure');
}
