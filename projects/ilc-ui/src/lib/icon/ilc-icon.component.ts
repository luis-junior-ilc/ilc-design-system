import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ILC_ICON_REGISTRY, IlcIconDefinition } from './ilc-icon.registry';
import { IlcIconName } from './ilc-icon.types';

@Component({
  selector: 'ilc-icon',
  standalone: true,
  templateUrl: './ilc-icon.component.html',
  styleUrl: './ilc-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcIconComponent {
  @Input({ required: true }) name!: IlcIconName;

  get definition(): IlcIconDefinition {
    return ILC_ICON_REGISTRY[this.name];
  }
}
