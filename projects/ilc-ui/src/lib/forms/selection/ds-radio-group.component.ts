import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

export interface DsRadioOption { value: string; label: string; disabled?: boolean; }

@Component({ selector: 'ds-radio-group', standalone: true, templateUrl: './ds-radio-group.component.html', styleUrl: './ds-radio-group.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DsRadioGroupComponent extends BaseControlValueAccessor<string> {
  readonly id = input(createFormControlId('ds-radio-group'));
  readonly name = input(createFormControlId('ds-radio-name'));
  readonly legend = input('');
  readonly options = input<DsRadioOption[]>([]);
  readonly orientation = input<'horizontal' | 'vertical'>('vertical');
  readonly selectionChange = output<string>();
  select(value: string): void { this.updateValue(value); this.selectionChange.emit(value); }
}
