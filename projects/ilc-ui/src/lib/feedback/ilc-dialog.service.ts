import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { IlcDialogComponent, IlcDialogData, IlcDialogKind } from './ilc-dialog.component';

export type IlcDialogOptions = Partial<IlcDialogData> & Pick<IlcDialogData, 'title' | 'message'>;

@Injectable({ providedIn: 'root' })
export class IlcDialogService {
  private readonly dialog = inject(MatDialog);

  open(options: IlcDialogOptions, config: MatDialogConfig<IlcDialogData> = {}): MatDialogRef<IlcDialogComponent, boolean> {
    const data: IlcDialogData = {
      title: options.title,
      message: options.message,
      kind: options.kind ?? 'info' satisfies IlcDialogKind,
      confirmText: options.confirmText ?? 'Entendi',
      cancelText: options.cancelText ?? 'Cancelar',
      showCancel: options.showCancel ?? false
    };

    return this.dialog.open<IlcDialogComponent, IlcDialogData, boolean>(IlcDialogComponent, {
      width: 'min(440px, calc(100vw - 32px))',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: 'first-tabbable',
      role: data.kind === 'confirm' ? 'alertdialog' : 'dialog',
      ...config,
      data
    });
  }
}
