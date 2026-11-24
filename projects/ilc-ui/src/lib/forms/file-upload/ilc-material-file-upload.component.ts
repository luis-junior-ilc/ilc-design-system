import { ChangeDetectionStrategy, Component, input, model, OnDestroy, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseControlValueAccessor } from '../base-control-value-accessor';

@Component({
  selector: 'ilc-material-file-upload',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './ilc-material-file-upload.component.html',
  styleUrl: './ilc-material-file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcMaterialFileUploadComponent extends BaseControlValueAccessor<File[]> implements OnDestroy {
  readonly accept = input('.pdf,.png,.jpg,.jpeg');
  readonly maxSizeMb = input(8);
  readonly multiple = model(true);
  readonly rejectedFiles = output<File[]>();
  readonly files = signal<File[]>([]);
  readonly errors = signal<string[]>([]);
  readonly dragOver = signal(false);
  readonly previews = signal<string[]>([]);

  override writeValue(files: File[] | null): void {
    super.writeValue(files);
    this.syncFiles(files ?? [], false);
  }

  onFileInput(event: Event): void {
    this.addFiles((event.target as HTMLInputElement).files);
    (event.target as HTMLInputElement).value = '';
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(false);
    this.addFiles(event.dataTransfer?.files ?? null);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(true);
  }

  remove(index: number): void {
    this.syncFiles(this.files().filter((_, fileIndex) => fileIndex !== index), true);
  }

  ngOnDestroy(): void {
    this.revokePreviews();
  }

  private addFiles(fileList: FileList | null): void {
    if (!fileList || this.disabled()) return;
    const accepted: File[] = [];
    const rejected: File[] = [];
    const messages: string[] = [];
    const allowed = this.accept().split(',').map((entry) => entry.trim().toLowerCase()).filter(Boolean);

    for (const file of Array.from(fileList)) {
      if (file.size > this.maxSizeMb() * 1024 * 1024) {
        rejected.push(file);
        messages.push(`${file.name} exceeds the ${this.maxSizeMb()} MB limit.`);
      } else if (allowed.length && !allowed.some((entry) => this.matchesType(file, entry))) {
        rejected.push(file);
        messages.push(`${file.name} has an unsupported file type.`);
      } else {
        accepted.push(file);
      }
    }

    this.errors.set(messages);
    if (rejected.length) this.rejectedFiles.emit(rejected);
    const next = this.multiple() ? [...this.files(), ...accepted] : accepted.slice(0, 1);
    this.syncFiles(next, true);
  }

  private matchesType(file: File, rule: string): boolean {
    if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule);
    if (rule.endsWith('/*')) return file.type.startsWith(rule.slice(0, -1));
    return file.type.toLowerCase() === rule;
  }

  private syncFiles(files: File[], notify: boolean): void {
    this.revokePreviews();
    this.files.set(files);
    this.previews.set(files.map((file) => file.type.startsWith('image/') ? URL.createObjectURL(file) : ''));
    if (notify) this.updateValue(files);
  }

  private revokePreviews(): void {
    this.previews().forEach((preview) => { if (preview) URL.revokeObjectURL(preview); });
  }
}
