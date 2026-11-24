import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

@Component({
  selector: 'ds-textarea', standalone: true, templateUrl: './ds-textarea.component.html', styleUrl: './ds-textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsTextareaComponent extends BaseControlValueAccessor<string> {
  readonly id = input(createFormControlId('ds-textarea'));
  readonly rows = input(3);
  readonly maxlength = input<number | undefined>(undefined);
  readonly placeholder = input('');
  readonly autoResize = input(false);
  readonly remaining = computed(() => this.maxlength() === undefined ? null : this.maxlength()! - (this.value()?.length ?? 0));
  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.updateValue(textarea.value);
    if (this.autoResize()) { textarea.style.height = 'auto'; textarea.style.height = `${textarea.scrollHeight}px`; }
  }
}
