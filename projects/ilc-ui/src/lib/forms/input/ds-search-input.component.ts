import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

@Component({
  selector: 'ds-search-input', standalone: true, templateUrl: './ds-search-input.component.html', styleUrl: './ds-search-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsSearchInputComponent extends BaseControlValueAccessor<string> {
  readonly id = input(createFormControlId('ds-search'));
  readonly placeholder = input('Search');
  readonly ariaLabel = input('Search');
  readonly cleared = output<void>();
  onInput(event: Event): void { this.updateValue((event.target as HTMLInputElement).value); }
  clear(): void { this.updateValue(''); this.cleared.emit(); }
}
