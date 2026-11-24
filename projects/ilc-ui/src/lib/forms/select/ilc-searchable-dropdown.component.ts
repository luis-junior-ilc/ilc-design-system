import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BaseControlValueAccessor } from '../base-control-value-accessor';

export interface IlcDropdownOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

type IlcDropdownChoice = IlcDropdownOption | { create: true; label: string };

@Component({
  selector: 'ilc-searchable-dropdown',
  standalone: true,
  imports: [MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './ilc-searchable-dropdown.component.html',
  styleUrl: './ilc-searchable-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcSearchableDropdownComponent extends BaseControlValueAccessor<string> {
  readonly options = input<IlcDropdownOption[]>([]);
  readonly label = input('Registro');
  readonly placeholder = input('Pesquisar registros');
  readonly allowCreate = input(false);
  readonly required = input(false);
  readonly searchChange = output<string>();
  readonly selectionChange = output<IlcDropdownOption>();
  readonly createRecord = output<string>();
  readonly searchTerm = signal('');

  readonly filteredOptions = computed(() => {
    const query = this.searchTerm().trim().toLocaleLowerCase();
    if (!query) return this.options();
    return this.options().filter((option) =>
      `${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(query)
    );
  });
  readonly displayValue = computed(() => {
    const query = this.searchTerm();
    return query || this.options().find((option) => option.value === this.value())?.label || '';
  });
  readonly canCreate = computed(() => {
    const query = this.searchTerm().trim();
    return this.allowCreate() && query.length > 0 && !this.options().some((option) => option.label.toLocaleLowerCase() === query.toLocaleLowerCase());
  });
  readonly createChoice = computed<IlcDropdownChoice>(() => ({ create: true, label: this.searchTerm().trim() }));

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    const selectedLabel = this.options().find((option) => option.value === this.value())?.label;
    if (query !== selectedLabel) this.updateValue(null);
    this.searchTerm.set(query);
    this.searchChange.emit(query);
  }

  onSelection(event: MatAutocompleteSelectedEvent): void {
    const choice = event.option.value as IlcDropdownChoice;
    if ('create' in choice) {
      this.createRecord.emit(choice.label);
      this.searchTerm.set('');
      return;
    }

    this.updateValue(choice.value);
    this.selectionChange.emit(choice);
    this.searchTerm.set('');
    this.markTouched();
  }

  clear(): void {
    this.updateValue(null);
    this.searchTerm.set('');
    this.searchChange.emit('');
    this.markTouched();
  }
}
