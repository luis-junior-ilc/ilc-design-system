import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ilc-logistics-loader',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './ilc-logistics-loader.component.html',
  styleUrl: './ilc-logistics-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.aria-busy]': 'active()' }
})
export class IlcLogisticsLoaderComponent {
  readonly active = input(true);
  readonly label = input('Processando envio');
  readonly compact = input(false);
  /** Variante visual do armazém: quadrados em linha, empilhados ou ampliados. */
  readonly warehouse = input<'inline' | 'stacked' | 'expanded'>('inline');
}
