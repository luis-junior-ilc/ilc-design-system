import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IlcDialogService, IlcDropdownOption, IlcLogisticsLoaderComponent, IlcMetricCardComponent, IlcScrollAreaComponent, IlcScrollSize, IlcSearchableDropdownComponent, IlcTruckLoaderComponent } from '../../projects/ilc-ui/src/public-api';
import { ApiInfoComponent } from './api-info.component';

@Component({
  selector: 'app-showcase-extras',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, IlcSearchableDropdownComponent, IlcTruckLoaderComponent, IlcLogisticsLoaderComponent, IlcMetricCardComponent, IlcScrollAreaComponent, ApiInfoComponent],
  templateUrl: './showcase-extras.component.html',
  styleUrl: './showcase-extras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseExtrasComponent {
  private readonly dialogs = inject(IlcDialogService);
  readonly apiInfo = {
    searchableDropdown: {
      selector: '<ilc-searchable-dropdown>',
      purpose: 'Campo pesquisável com seleção, integração a Reactive Forms e opção para criar registros.',
      example: '<ilc-searchable-dropdown [formControl]="unitControl" [options]="units" label="Unidade" [allowCreate]="true" (searchChange)="searchUnits($event)" (createRecord)="createUnit($event)" />',
      parameters: ['[options]: IlcDropdownOption[] ({ value, label, description?, disabled? }).', '[formControl]: valor string | null.', 'label?: string; placeholder?: string; allowCreate?: boolean; required?: boolean.', '(searchChange): emite o texto digitado; (selectionChange): emite a opção; (createRecord): emite o texto a criar.']
    },
    truckLoader: {
      selector: '<ilc-truck-loader>',
      purpose: 'Exibe um indicador animado de carregamento em formato de caminhão.',
      example: '<ilc-truck-loader label="Carregando pedidos" [active]="loading" [compact]="false" />',
      parameters: ['active?: boolean (padrão true).', 'label?: string (padrão "Carregando dados").', 'compact?: boolean (padrão false).']
    },
    logisticsLoader: {
      selector: '<ilc-logistics-loader>',
      purpose: 'Mostra o andamento visual de uma etapa logística, com caixa, empilhadeira e carreta.',
      example: '<ilc-logistics-loader label="Caixa em rota para o armazém" [active]="loading" [compact]="false" />',
      parameters: ['active?: boolean (padrão true).', 'label?: string (padrão "Processando envio").', 'compact?: boolean (padrão false).', 'warehouse?: inline | stacked | expanded (padrão inline).']
    },
    logisticsLoaderInline: {
      selector: '<ilc-logistics-loader [warehouse]="inline">',
      purpose: 'Variante de armazém em linha: quadrados dispostos horizontalmente e entrega ao lado da fileira.',
      example: '<ilc-logistics-loader label="Armazenamento em linha" [warehouse]="inline" />',
      parameters: ['warehouse?: inline (padrão).', 'Demais propriedades idênticas ao ilc-logistics-loader.']
    },
    logisticsLoaderStacked: {
      selector: '<ilc-logistics-loader [warehouse]="stacked">',
      purpose: 'Variante de armazém em torre: quadrados empilhados verticalmente e entrega subindo até o topo da pilha.',
      example: '<ilc-logistics-loader label="Empilhamento vertical" [warehouse]="stacked" />',
      parameters: ['warehouse?: stacked.', 'Demais propriedades idênticas ao ilc-logistics-loader.']
    },
    logisticsLoaderExpanded: {
      selector: '<ilc-logistics-loader [warehouse]="expanded">',
      purpose: 'Variante de operação ampliada: armazém maior com prateleira em duas fileiras e entrega deslizando pela fileira inferior.',
      example: '<ilc-logistics-loader label="Operação ampliada" [warehouse]="expanded" />',
      parameters: ['warehouse?: expanded.', 'Demais propriedades idênticas ao ilc-logistics-loader.']
    },
    metricCard: {
      selector: '<ilc-metric-card>',
      purpose: 'Apresenta um indicador com título, valor e detalhe opcional.',
      example: '<ilc-metric-card title="Pedidos no mês" value="1.284" detail="+8,2%" icon="shopping_bag" tone="teal" />',
      parameters: ['title e value (obrigatórios; value aceita string | number).', 'detail?: string; icon?: string.', 'tone?: azure | teal | amber | rose (padrão azure).']
    },
    scrollArea: {
      selector: '<ilc-scroll-area>',
      purpose: 'Envolve conteúdo com overflow e mostra indicadores de rolagem quando necessários.',
      example: '<ilc-scroll-area axis="vertical" size="md" label="Lista de pedidos"><ul>...</ul></ilc-scroll-area>',
      parameters: ['axis?: vertical | horizontal | both (padrão vertical).', 'size?: sm | md | lg (padrão md); label?: string.', 'trackProgress?: boolean (padrão true); scrollToTopOnContentChange?: boolean (padrão false).', 'O conteúdo da lista é projetado entre as tags.']
    },
    dialog: {
      selector: 'IlcDialogService.open()',
      purpose: 'Abre um diálogo informativo, de sucesso, alerta, erro ou confirmação.',
      example: "this.dialogs.open({ title: 'Confirmar', message: 'Deseja continuar?', kind: 'confirm', showCancel: true, confirmText: 'Sim', cancelText: 'Voltar' });",
      parameters: ['Não é uma tag HTML: injete IlcDialogService e chame open(options, config?).', 'title e message são obrigatórios.', 'kind?: info | success | warning | error | confirm.', 'confirmText?: string; cancelText?: string; showCancel?: boolean.', 'config?: MatDialogConfig; retorna MatDialogRef com resultado boolean.']
    }
  };
  readonly searchControl = new FormControl<string | null>(null);
  readonly remoteSearch = signal('');
  readonly records = signal<IlcDropdownOption[]>([
    { value: 'north', label: 'Unidade Norte', description: 'Manaus, AM' },
    { value: 'central', label: 'Unidade Central', description: 'Sao Paulo, SP' },
    { value: 'south', label: 'Unidade Sul', description: 'Curitiba, PR' },
    { value: 'west', label: 'Unidade Oeste', description: 'Campo Grande, MS' }
  ]);
  readonly metrics = [
    { title: 'Pedidos no mês', value: '1.284', detail: '+8,2% vs. mês anterior', icon: 'shopping_bag', tone: 'azure' as const },
    { title: 'Unidades ativas', value: 36, detail: 'Em 5 estados', icon: 'storefront', tone: 'teal' as const },
    { title: 'Em separação', value: 18, detail: '6 aguardam coleta', icon: 'inventory_2', tone: 'amber' as const },
    { title: 'Ocorrências', value: 3, detail: 'Requerem atenção', icon: 'report_problem', tone: 'rose' as const }
  ];

  readonly scrollSizes: IlcScrollSize[] = ['sm', 'md', 'lg'];
  readonly scrollItems = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1} de 40`,
    detail: 'Conteúdo suficiente para demonstrar o overflow vertical e horizontal.'
  }));

  onSearch(query: string): void {
    this.remoteSearch.set(query);
  }

  createRecord(label: string): void {
    const value = `new-${Date.now()}`;
    this.records.update((records) => [...records, { value, label, description: 'Novo registro' }]);
    this.searchControl.setValue(value);
    this.remoteSearch.set('');
  }

  showInfo(): void {
    this.dialogs.open({
      kind: 'info',
      title: 'Resumo atualizado',
      message: 'Os indicadores foram atualizados com os dados mais recentes.',
      confirmText: 'Fechar'
    });
  }

  confirmAction(): void {
    this.dialogs.open({
      kind: 'confirm',
      title: 'Confirmar processamento',
      message: 'Deseja iniciar o processamento dos registros selecionados?',
      confirmText: 'Processar',
      cancelText: 'Voltar',
      showCancel: true
    });
  }
}
