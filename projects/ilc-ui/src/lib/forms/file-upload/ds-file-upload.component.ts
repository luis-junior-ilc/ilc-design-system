import { ChangeDetectionStrategy, Component, input, OnDestroy, output, signal } from '@angular/core';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { createFormControlId } from '../form-control.utils';

export interface DsRejectedFile { file: File; reason: 'size' | 'extension'; }

@Component({ selector: 'ds-file-upload', standalone: true, templateUrl: './ds-file-upload.component.html', styleUrl: './ds-file-upload.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DsFileUploadComponent extends BaseControlValueAccessor<File[]> implements OnDestroy {
  readonly id = input(createFormControlId('ds-file-upload'));
  readonly accept = input('');
  readonly multiple = input(false);
  readonly maxSizeMb = input(10);
  readonly rejectedFiles = output<DsRejectedFile[]>();
  readonly dragOver = signal(false);
  readonly files = signal<File[]>([]);
  readonly previews = signal<string[]>([]);

  override writeValue(files: File[] | null): void {
    super.writeValue(files);
    const currentFiles = files ?? [];
    this.files.set(currentFiles);
    this.refreshPreviews(currentFiles);
  }

  onInput(event: Event): void { this.processFiles((event.target as HTMLInputElement).files); }
  onDrop(event: DragEvent): void { event.preventDefault(); this.dragOver.set(false); this.processFiles(event.dataTransfer?.files ?? null); }
  preventDefault(event: DragEvent): void { event.preventDefault(); this.dragOver.set(true); }
  clearDrag(): void { this.dragOver.set(false); }
  remove(index: number): void {
    const next = this.files().filter((_, fileIndex) => fileIndex !== index);
    this.files.set(next); this.updateValue(next); this.refreshPreviews(next);
  }
  ngOnDestroy(): void { this.previews().forEach((url) => { if (url) URL.revokeObjectURL(url); }); }

  private processFiles(fileList: FileList | null): void {
    if (!fileList || this.disabled()) return;
    const accepted: File[] = [];
    const rejected: DsRejectedFile[] = [];
    const extensions = this.accept().split(',').map((extension) => extension.trim().toLowerCase()).filter(Boolean);
    for (const file of Array.from(fileList)) {
      const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;
      const sizeTooLarge = file.size > this.maxSizeMb() * 1024 * 1024;
      const invalidExtension = extensions.length > 0 && !extensions.some((allowed) => allowed.startsWith('.') ? extension === allowed : file.type === allowed);
      if (sizeTooLarge) rejected.push({ file, reason: 'size' });
      else if (invalidExtension) rejected.push({ file, reason: 'extension' });
      else accepted.push(file);
    }
    const next = this.multiple() ? [...this.files(), ...accepted] : accepted.slice(0, 1);
    this.files.set(next); this.updateValue(next); this.refreshPreviews(next); this.rejectedFiles.emit(rejected);
  }

  private refreshPreviews(files: File[]): void {
    this.previews().forEach((url) => { if (url) URL.revokeObjectURL(url); });
    this.previews.set(files.map((file) => file.type.startsWith('image/') ? URL.createObjectURL(file) : ''));
  }
}
