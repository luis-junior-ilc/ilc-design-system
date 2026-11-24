import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

@Component({ selector: 'ds-switch', standalone: true, templateUrl: './ds-switch.component.html', styleUrl: './ds-switch.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DsSwitchComponent extends BaseControlValueAccessor<boolean> {
  readonly id = input(createFormControlId('ds-switch'));
  readonly checkedText = input('On');
  readonly uncheckedText = input('Off');
  readonly checkedChange = output<boolean>();
  toggle(): void { const checked = !this.value(); this.updateValue(checked); this.checkedChange.emit(checked); }
}
