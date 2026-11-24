import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { DsAutocompleteComponent } from './autocomplete/ds-autocomplete.component';
import { DsFileUploadComponent } from './file-upload/ds-file-upload.component';
import { DsErrorDirective, DsHintDirective, DsLabelDirective, DsPrefixDirective, DsSuffixDirective } from './form-field-parts';
import { DsFieldStatus, DsFormFieldComponent } from './form-field.component';
import { DsInputComponent } from './input/ds-input.component';
import { DsNumberInputComponent } from './input/ds-number-input.component';
import { DsPasswordInputComponent } from './input/ds-password-input.component';
import { DsSearchInputComponent } from './input/ds-search-input.component';
import { DsDateRange, DsDateRangePickerComponent } from './pickers/ds-date-range-picker.component';
import { DsDatepickerComponent } from './pickers/ds-datepicker.component';
import { DsTimePickerComponent } from './pickers/ds-time-picker.component';
import { DsSelectComponent, DsSelectOption } from './select/ds-select.component';
import { DsCheckboxComponent } from './selection/ds-checkbox.component';
import { DsRadioGroupComponent, DsRadioOption } from './selection/ds-radio-group.component';
import { DsSwitchComponent } from './selection/ds-switch.component';
import { DsTextareaComponent } from './textarea/ds-textarea.component';

const companyEmailValidator: ValidatorFn = (control: AbstractControl) =>
  typeof control.value === 'string' && control.value.toLowerCase().endsWith('@grupo-mirassol.com')
    ? null
    : { companyEmail: true };

@Component({
  selector: 'ds-forms-playground',
  standalone: true,
  imports: [
    ReactiveFormsModule, DsFormFieldComponent, DsLabelDirective, DsHintDirective, DsErrorDirective, DsPrefixDirective, DsSuffixDirective,
    DsInputComponent, DsPasswordInputComponent, DsSearchInputComponent, DsNumberInputComponent, DsTextareaComponent,
    DsSelectComponent, DsAutocompleteComponent, DsCheckboxComponent, DsRadioGroupComponent, DsSwitchComponent,
    DsDatepickerComponent, DsDateRangePickerComponent, DsTimePickerComponent, DsFileUploadComponent
  ],
  templateUrl: './forms-playground.component.html',
  styleUrl: './forms-playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsFormsPlaygroundComponent {
  readonly submitted = signal(false);
  readonly plans: DsRadioOption[] = [
    { value: 'starter', label: 'Starter' },
    { value: 'business', label: 'Business' },
    { value: 'enterprise', label: 'Enterprise' }
  ];
  readonly departments: DsSelectOption[] = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];
  readonly suggestions: DsSelectOption[] = [
    { value: 'Sao Paulo', label: 'Sao Paulo' },
    { value: 'Campinas', label: 'Campinas' },
    { value: 'Ribeirao Preto', label: 'Ribeirao Preto' }
  ];
  readonly form = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email, companyEmailValidator] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(12)] }),
    search: new FormControl('', { nonNullable: true }),
    department: new FormControl<string | null>(null, Validators.required),
    city: new FormControl('', { nonNullable: true }),
    quantity: new FormControl<number | null>(1, [Validators.required, Validators.min(1), Validators.max(99)]),
    notes: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(240)] }),
    plan: new FormControl<string | null>(null, Validators.required),
    notifications: new FormControl(false, { nonNullable: true }),
    accepted: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    startDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    time: new FormControl('', { nonNullable: true }),
    dateRange: new FormControl<DsDateRange>({ start: '', end: '' }, { nonNullable: true }),
    attachments: new FormControl<File[]>([], { nonNullable: true })
  });

  status(control: AbstractControl): DsFieldStatus {
    if (control.disabled) return 'disabled';
    if (control.invalid && (control.touched || control.dirty)) return 'error';
    if (control.valid && control.touched) return 'success';
    return 'default';
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.submitted.set(true);
  }
}
