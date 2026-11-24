import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';
import { DsSelectOption } from '../select/ds-select.component';

@Component({
  selector: 'ds-autocomplete', standalone: true, templateUrl: './ds-autocomplete.component.html', styleUrl: './ds-autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsAutocompleteComponent extends BaseControlValueAccessor<string> {
  readonly id = input(createFormControlId('ds-autocomplete'));
  readonly options = input<DsSelectOption[]>([]);
  readonly placeholder = input('Start typing');
  readonly ariaLabel = input('');
  readonly open = model(false);
  readonly selectionChange = output<string>();
  readonly activeIndex = signal(0);
  readonly listId = computed(() => `${this.id()}-suggestions`);
  readonly displayValue = computed(() => this.options().find((option) => option.value === this.value())?.label ?? this.value() ?? '');
  readonly filteredOptions = computed(() => {
    const query = (this.displayValue()).toLocaleLowerCase();
    return this.options().filter((option) => option.label.toLocaleLowerCase().includes(query));
  });

  onInput(event: Event): void { this.updateValue((event.target as HTMLInputElement).value); this.open.set(true); this.activeIndex.set(0); }
  choose(option: DsSelectOption): void { this.updateValue(option.value); this.selectionChange.emit(option.value); this.open.set(false); this.markTouched(); }
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); this.open.set(true);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      this.activeIndex.update((index) => Math.max(0, Math.min(this.filteredOptions().length - 1, index + delta)));
    } else if (event.key === 'Enter' && this.open()) {
      event.preventDefault(); const option = this.filteredOptions()[this.activeIndex()]; if (option) this.choose(option);
    } else if (event.key === 'Escape') this.open.set(false);
  }
}
