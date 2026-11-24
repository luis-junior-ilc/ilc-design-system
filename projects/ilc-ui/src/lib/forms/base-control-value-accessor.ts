import { Directive, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive()
export abstract class BaseControlValueAccessor<T> implements ControlValueAccessor {
  protected readonly ngControl = inject(NgControl, { self: true, optional: true });
  readonly value = signal<T | null>(null);
  readonly disabled = signal(false);
  readonly focused = signal(false);
  readonly touched = signal(false);
  readonly ariaLabelledBy = input('');
  readonly ariaDescribedBy = input('');

  private onChange: (value: T | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected updateValue(value: T | null): void {
    this.value.set(value);
    this.onChange(value);
  }

  protected markTouched(): void {
    this.touched.set(true);
    this.onTouched();
  }
}
