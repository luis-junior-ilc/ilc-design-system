import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { IlcIconComponent } from '../icon/ilc-icon.component';
import { IlcIconName } from '../icon/ilc-icon.types';
import { IlcButtonColor, IlcButtonVariant } from './ilc-button.types';

@Component({
  selector: 'ilc-button',
  standalone: true,
  imports: [NgClass, IlcIconComponent],
  templateUrl: './ilc-button.component.html',
  styleUrl: './ilc-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcButtonComponent {
  @Input() icon?: IlcIconName;
  @Input() size: 1 | 2 | 3 = 2;
  @Input() color: IlcButtonColor = 'primary';
  @Input() variant: IlcButtonVariant = 'solid';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;

  get classes(): string[] {
    return [
      `ilc-button--${this.color}`,
      `ilc-button--${this.variant}`,
      `ilc-button--size-${this.size}`
    ];
  }
}
