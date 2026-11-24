import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-setup-guide',
  standalone: true,
  templateUrl: './setup-guide.component.html',
  styleUrl: './setup-guide.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupGuideComponent {}
