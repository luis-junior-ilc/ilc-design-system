import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

@Component({
  selector: 'ds-password-input', standalone: true, templateUrl: './ds-password-input.component.html', styleUrl: './ds-password-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsPasswordInputComponent extends BaseControlValueAccessor<string> {
  readonly id = input(createFormControlId('ds-password'));
  readonly placeholder = input('');
  readonly autocomplete = input('current-password');
  readonly ariaLabel = input('Password');
  readonly visible = model(false);
  readonly isVisible = computed(() => this.visible());
  readonly inputType = computed(() => this.isVisible() ? 'text' : 'password');

  toggleVisibility(): void {
    this.visible.update((visible) => !visible);
  }

  onInput(event: Event): void {
    this.updateValue((event.target as HTMLInputElement).value);
  }
}
