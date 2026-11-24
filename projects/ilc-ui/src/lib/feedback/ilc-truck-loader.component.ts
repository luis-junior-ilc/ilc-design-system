import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ilc-truck-loader',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './ilc-truck-loader.component.html',
  styleUrl: './ilc-truck-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.aria-busy]': 'active()' }
})
export class IlcTruckLoaderComponent {
  readonly active = input(true);
  readonly label = input('Carregando dados');
  readonly compact = input(false);
}
