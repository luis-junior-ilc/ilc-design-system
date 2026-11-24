import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

export interface DsSelectOption { value: string; label: string; disabled?: boolean; }

@Component({
  selector: 'ds-select', standalone: true, templateUrl: './ds-select.component.html', styleUrl: './ds-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsSelectComponent extends BaseControlValueAccessor<string> {
  readonly id = input(createFormControlId('ds-select'));
  readonly options = input<DsSelectOption[]>([]);
  readonly placeholder = input('Select an option');
  readonly ariaLabel = input('');
  readonly open = model(false);
  readonly selectionChange = output<string>();
  readonly listId = computed(() => `${this.id()}-listbox`);
  readonly displayValue = computed(() => this.options().find((option) => option.value === this.value())?.label ?? '');
  readonly activeIndex = signal(-1);

  toggle(): void { if (!this.disabled()) this.open.update((open) => !open); }
  choose(option: DsSelectOption): void {
    if (option.disabled) return;
    this.updateValue(option.value);
    this.selectionChange.emit(option.value);
    this.open.set(false);
    this.markTouched();
  }
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.open()) this.open.set(true);
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      this.activeIndex.update((index) => Math.max(0, Math.min(this.options().length - 1, index + direction)));
    } else if (event.key === 'Enter' && this.open()) {
      event.preventDefault();
      const option = this.options()[this.activeIndex()];
      if (option) this.choose(option);
    } else if (event.key === 'Escape') this.open.set(false);
  }
}
