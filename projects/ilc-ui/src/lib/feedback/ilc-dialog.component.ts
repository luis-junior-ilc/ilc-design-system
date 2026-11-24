import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type IlcDialogKind = 'info' | 'success' | 'warning' | 'error' | 'confirm';

export interface IlcDialogData {
  title: string;
  message: string;
  kind: IlcDialogKind;
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
}

@Component({
  selector: 'ilc-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './ilc-dialog.component.html',
  styleUrl: './ilc-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcDialogComponent {
  readonly data = inject<IlcDialogData>(MAT_DIALOG_DATA);
  readonly closed = output<boolean>();
  private readonly dialogRef = inject(MatDialogRef<IlcDialogComponent, boolean>);
  readonly icon = computed(() => ({
    info: 'info', success: 'check_circle', warning: 'warning', error: 'error', confirm: 'help'
  })[this.data.kind]);

  close(confirmed: boolean): void {
    this.closed.emit(confirmed);
    this.dialogRef.close(confirmed);
  }
}
