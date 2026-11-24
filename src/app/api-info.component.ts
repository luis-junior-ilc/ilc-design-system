import { Component, Input } from '@angular/core';

export interface ApiInfoEntry {
  selector: string;
  purpose: string;
  example: string;
  parameters: string[];
}

@Component({
  selector: 'app-api-info',
  standalone: true,
  templateUrl: './api-info.component.html',
  styleUrl: './api-info.component.scss'
})
export class ApiInfoComponent {
  @Input({ required: true }) entry!: ApiInfoEntry;
  @Input() compact = false;
}
