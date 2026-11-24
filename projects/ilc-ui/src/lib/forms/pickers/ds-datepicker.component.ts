import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

@Component({ selector: 'ds-datepicker', standalone: true, templateUrl: './ds-datepicker.component.html', styleUrl: './ds-datepicker.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DsDatepickerComponent extends BaseControlValueAccessor<string> {
  readonly id = input(createFormControlId('ds-date'));
  readonly min = input('');
  readonly max = input('');
  readonly required = input(false);
  readonly dateChange = output<string>();
  onInput(event: Event): void { const value = (event.target as HTMLInputElement).value; this.updateValue(value || null); this.dateChange.emit(value); }
}
