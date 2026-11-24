import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

@Component({
  selector: 'ds-input', standalone: true, templateUrl: './ds-input.component.html', styleUrl: './ds-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsInputComponent extends BaseControlValueAccessor<string> {
  readonly id = input(createFormControlId('ds-input'));
  readonly type = input<'text' | 'email' | 'tel' | 'url' | 'search'>('text');
  readonly placeholder = input('');
  readonly autocomplete = input('off');
  readonly readonly = input(false);
  readonly required = input(false);
  readonly ariaLabel = input('');
  readonly valueChange = output<string>();

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.updateValue(value);
    this.valueChange.emit(value);
  }
}
