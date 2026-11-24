import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  IlcAccordionComponent,
  IlcAccordionItemComponent,
  IlcButtonColor,
  IlcButtonComponent,
  IlcDialogService,
  IlcIconComponent,
  IlcIconName,
  IlcTrip,
  IlcTripsTableComponent
} from '../../projects/ilc-ui/src/public-api';
import { MaterialFormsPlaygroundComponent } from '../../projects/ilc-ui/src/lib/forms/material-forms-playground.component';
import { ShowcaseExtrasComponent } from './showcase-extras.component';
import { SetupGuideComponent } from './setup-guide.component';
import { ApiInfoComponent } from './api-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IlcAccordionComponent, IlcAccordionItemComponent, IlcButtonComponent, IlcIconComponent, IlcTripsTableComponent, MaterialFormsPlaygroundComponent, ShowcaseExtrasComponent, SetupGuideComponent, ApiInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly dialogs = inject(IlcDialogService);
  private readonly document = inject(DOCUMENT);
  darkMode = false;
  readonly colors: IlcButtonColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
  readonly sharedColorTokens = [
    { name: 'Primary', property: '--ilc-color-primary' },
    { name: 'Primary hover', property: '--ilc-color-primary-hover' },
    { name: 'Primary subtle', property: '--ilc-color-primary-subtle' },
    { name: 'Secondary (Navy)', property: '--ilc-color-secondary' },
    { name: 'Secondary hover', property: '--ilc-color-secondary-hover' },
    { name: 'Success', property: '--ilc-color-success' },
    { name: 'Success hover', property: '--ilc-color-success-hover' },
    { name: 'Warning', property: '--ilc-color-warning' },
    { name: 'Warning hover', property: '--ilc-color-warning-hover' },
    { name: 'Danger', property: '--ilc-color-danger' },
    { name: 'Danger hover', property: '--ilc-color-danger-hover' },
    { name: 'Info', property: '--ilc-color-info' },
    { name: 'Info hover', property: '--ilc-color-info-hover' },
    { name: 'ILC Ciano (P 118-6 C)', property: '--ilc-color-brand-cyan' },
    { name: 'ILC Ciano Bright', property: '--ilc-color-brand-cyan-bright' },
    { name: 'ILC Amarelo (Yellow 012)', property: '--ilc-color-brand-yellow' },
    { name: 'ILC Ouro (109 C)', property: '--ilc-color-brand-gold' },
    { name: 'ILC Verde (347 C)', property: '--ilc-color-brand-green' },
    { name: 'ILC Verde Folha (7740 C)', property: '--ilc-color-brand-green-leaf' },
    { name: 'ILC Navy', property: '--ilc-color-brand-navy' },
    { name: 'ILC Navy Deep', property: '--ilc-color-brand-navy-deep' },
    { name: 'ILC Cinza', property: '--ilc-color-brand-gray' },
    { name: 'On primary', property: '--ilc-color-on-primary' },
    { name: 'On secondary', property: '--ilc-color-on-secondary' },
    { name: 'On warning', property: '--ilc-color-on-warning' },
    { name: 'Background', property: '--ilc-color-background' },
    { name: 'Surface', property: '--ilc-color-surface' },
    { name: 'Surface elevated', property: '--ilc-color-surface-elevated' },
    { name: 'Text', property: '--ilc-color-text' },
    { name: 'Text secondary', property: '--ilc-color-text-secondary' },
    { name: 'Border', property: '--ilc-color-border' }
  ];
  readonly fontSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  readonly spacingSteps = [1, 2, 3, 4, 5, 6, 8];
  readonly radiusSizes = ['sm', 'md', 'lg', 'pill'];
  readonly apiInfo = {
    trips: [{
      selector: '<ilc-trips-table>',
      purpose: 'Exibe viagens priorizadas, paginação e exportação para Excel.',
      example: '<ilc-trips-table [trips]="trips" (actionRequested)="onAction($event)" />',
      parameters: ['[trips] (obrigatório): IlcTrip[] com status, trip, date, type, route, driver, plate, situation e action.', '(actionRequested): emite a viagem selecionada como IlcTrip.']
    }],
    button: [{
      selector: '<ilc-button>',
      purpose: 'Ação principal ou secundária, com variantes sólida, contornada, texto ou ícone.',
      example: '<ilc-button icon="save" color="primary" size="2" variant="solid" type="button">Salvar</ilc-button>',
      parameters: ['icon?: save | edit | delete | search | add | close.', 'size?: 1 | 2 | 3 (padrão 2).', 'color?: primary | secondary | success | warning | danger | info.', 'variant?: solid | outline | text | icon.', 'disabled?: boolean; loading?: boolean; type?: button | submit | reset; ariaLabel?: string.', 'O conteúdo entre as tags é projetado como texto/botão.']
    }],
    icons: [{
      selector: '<ilc-icon>',
      purpose: 'Renderiza um ícone registrado na biblioteca.',
      example: '<ilc-icon name="search"></ilc-icon>',
      parameters: ['name (obrigatório): save | edit | delete | search | add | close.']
    }],
    tokens: [{
      selector: 'tokens/ilc-tokens (SCSS global)',
      purpose: 'Carrega propriedades CSS globais para cores, tipografia, espaçamentos e raios. Não é um componente HTML.',
      example: "@use '@grupo-mirassol/ilc-design-system/tokens/ilc-tokens';\n\n.meu-elemento {\n  color: var(--ilc-color-primary);\n  padding: var(--ilc-spacing-4);\n}",
      parameters: ['Não possui tag nem inputs HTML. Personalize as custom properties CSS no escopo :root ou [data-theme="dark"].']
    }],
  };
  readonly sizes = [1, 2, 3] as const;
  readonly iconNames: IlcIconName[] = ['save', 'edit', 'delete', 'search', 'add', 'close'];
  readonly trips: IlcTrip[] = [
    { status: 'NO PRAZO', trip: '102-39586-M', date: '02/10/2026', type: 'COLETA', route: 'RIO DE JANEIRO X RIO DE JANEIRO', driver: 'DIOGENES DE SOUZA GOMES FILHOS', plate: 'LFF9F92', situation: 'Comprovante não inserido', action: 'Solicitar comprovante' },
    { status: 'NO PRAZO', trip: '24-12851-M', date: '02/10/2026', type: 'COLETA', route: 'NAVEGANTES X SAO JOSE DOS PINHAIS', driver: 'CARLOS MAURICIO ANDREATTA SCHUINKI', plate: 'DLG8J84', situation: 'Comprovante não auditado', action: 'Auditar comprovantes' },
    { status: 'NO PRAZO', trip: '24-12853-M', date: '02/10/2026', type: 'COLETA', route: 'SAO BENTO DO SUL X SAO JOSE DOS PINHAIS', driver: 'GILBERTO FARIAS', plate: 'CIT6A11', situation: 'Comprovante não inserido', action: 'Solicitar comprovante' },
    { status: 'NO PRAZO', trip: '24-12854-M', date: '02/10/2026', type: 'COLETA', route: 'SAO BENTO DO SUL X SAO JOSE DOS PINHAIS', driver: 'MAICO CORDEIRO', plate: 'JJG5E39', situation: 'Comprovante não inserido', action: 'Solicitar comprovante' },
    { status: 'NO PRAZO', trip: '24-12855-M', date: '02/10/2026', type: 'COLETA', route: 'SAO BENTO DO SUL X SAO JOSE DOS PINHAIS', driver: 'ANDREI CRISTIANO DE LIMA', plate: 'AYB1H94', situation: 'Comprovante não inserido', action: 'Solicitar comprovante' }
  ];

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    this.document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
  }

  requestTripAction(trip: IlcTrip): void {
    this.dialogs.open({
      kind: 'confirm',
      title: trip.action,
      message: `Deseja executar "${trip.action}" para a viagem ${trip.trip}?`,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      showCancel: true
    });
  }
}
