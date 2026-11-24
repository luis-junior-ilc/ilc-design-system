import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IlcBrandRibbonComponent, IlcCardComponent, IlcLogoComponent } from '../../projects/ilc-ui/src/public-api';

@Component({
  selector: 'app-brand-guidelines',
  standalone: true,
  imports: [IlcLogoComponent, IlcBrandRibbonComponent, IlcCardComponent],
  templateUrl: './brand-guidelines.component.html',
  styleUrl: './brand-guidelines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandGuidelinesComponent {
  readonly brandColors = [
    { name: 'Ciano ILC', pantone: 'P 118-6 C', hex: '#07B1D6', rgb: '7, 177, 214', textLight: true },
    { name: 'Amarelo ILC', pantone: 'Yellow 012 Y', hex: '#FFE109', rgb: '255, 225, 9', textLight: false },
    { name: 'Amarelo Ouro', pantone: '109 C', hex: '#FDCF02', rgb: '253, 207, 2', textLight: false },
    { name: 'Verde ILC', pantone: '347 C', hex: '#00943E', rgb: '0, 148, 62', textLight: true },
    { name: 'Verde Folha', pantone: '7740 C', hex: '#389236', rgb: '56, 146, 54', textLight: true },
    { name: 'Deep Navy Digital', pantone: 'Digital Signature', hex: '#0E2841', rgb: '14, 40, 65', textLight: true },
    { name: 'Cinza Institucional', pantone: 'Wordmark', hex: '#515052', rgb: '81, 80, 82', textLight: true }
  ];

  readonly incorrectUses = [
    'Não distorcer ou esticar o logotipo na horizontal ou vertical.',
    'Não rotacionar a marca nem alterar o ângulo ou as cores do gradiente.',
    'Não aplicar abaixo da dimensão mínima de reprodução (70px / 15mm).',
    'Não substituir a fonte institucional Pirulen/Hind em chamadas oficiais.'
  ];
}
