import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

@Component({ selector: 'ds-radio', standalone: true, templateUrl: './ds-radio.component.html', styleUrl: './ds-radio.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DsRadioComponent extends BaseControlValueAccessor<string> {
  readonly id = input(createFormControlId('ds-radio'));
  readonly optionValue = input.required<string>();
  readonly checked = computed(() => this.value() === this.optionValue());
  select(): void { if (!this.disabled()) this.updateValue(this.optionValue()); }
}
