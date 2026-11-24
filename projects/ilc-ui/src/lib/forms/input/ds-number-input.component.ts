import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

@Component({
  selector: 'ds-number-input', standalone: true, templateUrl: './ds-number-input.component.html', styleUrl: './ds-number-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsNumberInputComponent extends BaseControlValueAccessor<number> {
  readonly id = input(createFormControlId('ds-number'));
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);
  readonly step = input(1);
  readonly placeholder = input('');
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.updateValue(value === '' ? null : Number(value));
  }
  adjust(amount: number): void {
    const next = (this.value() ?? 0) + amount * this.step();
    const bounded = Math.max(this.min() ?? -Infinity, Math.min(this.max() ?? Infinity, next));
    this.updateValue(bounded);
  }
}
