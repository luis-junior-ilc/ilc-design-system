import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

@Component({ selector: 'ds-checkbox', standalone: true, templateUrl: './ds-checkbox.component.html', styleUrl: './ds-checkbox.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DsCheckboxComponent extends BaseControlValueAccessor<boolean> {
  readonly id = input(createFormControlId('ds-checkbox'));
  readonly indeterminate = input(false);
  readonly ariaLabel = input('');
  readonly checkedChange = output<boolean>();
  toggle(event: Event): void { const checked = (event.target as HTMLInputElement).checked; this.updateValue(checked); this.checkedChange.emit(checked); }
}
