import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

let fieldSequence = 0;
export type DsFieldStatus = 'default' | 'error' | 'disabled' | 'readonly' | 'success';

@Component({
  selector: 'ds-form-field',
  standalone: true,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-status]': 'status()',
    '[class.ds-form-field--disabled]': 'status() === "disabled"',
    '[class.ds-form-field--readonly]': 'status() === "readonly"'
  }
})
export class DsFormFieldComponent {
  readonly id = input(`ds-field-${++fieldSequence}`);
  readonly status = input<DsFieldStatus>('default');
  readonly labelId = computed(() => `${this.id()}-label`);
  readonly hintId = computed(() => `${this.id()}-hint`);
  readonly errorId = computed(() => `${this.id()}-error`);
  readonly describedBy = computed(() => this.status() === 'error'
    ? `${this.hintId()} ${this.errorId()}`
    : this.hintId());
}
