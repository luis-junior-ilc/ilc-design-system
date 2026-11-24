import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

export interface DsDateRange { start: string; end: string; }

@Component({ selector: 'ds-date-range-picker', standalone: true, templateUrl: './ds-date-range-picker.component.html', styleUrl: './ds-date-range-picker.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DsDateRangePickerComponent extends BaseControlValueAccessor<DsDateRange> {
  readonly id = input(createFormControlId('ds-date-range'));
  readonly min = input('');
  readonly max = input('');
  readonly rangeChange = output<DsDateRange>();
  readonly rangeInvalid = computed(() => !!this.value()?.start && !!this.value()?.end && this.value()!.start > this.value()!.end);
  change(part: keyof DsDateRange, event: Event): void {
    const next = { start: this.value()?.start ?? '', end: this.value()?.end ?? '', [part]: (event.target as HTMLInputElement).value };
    this.updateValue(next); this.rangeChange.emit(next);
  }
}
