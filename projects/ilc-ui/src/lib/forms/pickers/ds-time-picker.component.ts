import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

@Component({ selector: 'ds-time-picker', standalone: true, templateUrl: './ds-time-picker.component.html', styleUrl: './ds-time-picker.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DsTimePickerComponent extends BaseControlValueAccessor<string> {
  readonly id = input(createFormControlId('ds-time'));
  readonly step = input(60);
  readonly required = input(false);
  readonly timeChange = output<string>();
  onInput(event: Event): void { const value = (event.target as HTMLInputElement).value; this.updateValue(value || null); this.timeChange.emit(value); }
}
