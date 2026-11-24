import { ChangeDetectionStrategy, Component, computed, model, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { IlcMaterialFileUploadComponent } from './file-upload/ilc-material-file-upload.component';
import { ApiInfoComponent, ApiInfoEntry } from '../../../../../src/app/api-info.component';

const companyEmailValidator: ValidatorFn = (control) =>
  typeof control.value === 'string' && control.value.toLowerCase().endsWith('@grupo-mirassol.com')
    ? null
    : { companyEmail: true };

@Component({
  selector: 'ilc-material-forms-playground',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CdkTextareaAutosize,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    IlcMaterialFileUploadComponent,
    ApiInfoComponent
  ],
  templateUrl: './material-forms-playground.component.html',
  styleUrl: './material-forms-playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialFormsPlaygroundComponent {
  readonly apiInfo = {
    fullName: {
      selector: '<input matInput type="text">',
      purpose: 'Campo de texto simples para entrada de nome, integrado ao formulário reativo.',
      example: '<mat-form-field appearance="outline"><mat-label>Nome completo</mat-label><input matInput formControlName="fullName" autocomplete="name" /></mat-form-field>',
      parameters: ['formControlName: nome do controle no FormGroup.', 'autocomplete: dica do navegador; use name para nomes de pessoa.', 'Importe ReactiveFormsModule, MatFormFieldModule e MatInputModule.']
    },
    email: {
      selector: '<input matInput type="email">',
      purpose: 'Campo de e-mail com validação do formato e semântica adequada para navegadores móveis.',
      example: '<mat-form-field appearance="outline"><mat-label>E-mail</mat-label><input matInput type="email" formControlName="email" autocomplete="email" /></mat-form-field>',
      parameters: ['type="email": ativa validação e teclado apropriados.', 'formControlName: controle de e-mail do FormGroup.', 'Combine Validators.email com Validators.required quando necessário.']
    },
    password: {
      selector: '<input matInput type="password">',
      purpose: 'Recebe senha e pode ser combinado a um botão para alternar a visibilidade.',
      example: '<input matInput [type]="visible ? \'text\' : \'password\'" formControlName="password" autocomplete="new-password" />',
      parameters: ['type: password para ocultar ou text para exibir.', 'autocomplete: new-password no cadastro; current-password no login.', 'formControlName: controle do formulário.']
    },
    search: {
      selector: '<input matInput inputmode="search">',
      purpose: 'Campo para consulta textual, com teclado de busca em dispositivos móveis.',
      example: '<input matInput inputmode="search" enterkeyhint="search" formControlName="search" />',
      parameters: ['inputmode="search": sugere teclado de busca.', 'enterkeyhint="search": altera o rótulo da tecla de ação.', 'Use valueChanges do FormControl para busca reativa.']
    },
    quantity: {
      selector: '<input matInput type="number">',
      purpose: 'Recebe valores numéricos e pode declarar limites e incremento.',
      example: '<input matInput type="number" formControlName="quantity" min="1" max="99" step="1" />',
      parameters: ['min e max: limites aceitos pelo controle.', 'step: intervalo entre valores.', 'Valide também no FormGroup com Validators.min e Validators.max.']
    },
    notes: {
      selector: '<textarea matInput cdkTextareaAutosize>',
      purpose: 'Campo multilinha que pode ajustar a altura automaticamente.',
      example: '<textarea matInput cdkTextareaAutosize cdkAutosizeMinRows="2" cdkAutosizeMaxRows="6" formControlName="notes"></textarea>',
      parameters: ['cdkAutosizeMinRows e cdkAutosizeMaxRows: limites visuais de linhas.', 'maxlength: limite opcional de caracteres.', 'Importe CdkTextareaAutosize de @angular/cdk/text-field.']
    },
    department: {
      selector: '<mat-select>',
      purpose: 'Seleciona uma opção ou opções agrupadas dentro de um formulário Material.',
      example: '<mat-select formControlName="department"><mat-option value="finance">Financeiro</mat-option></mat-select>',
      parameters: ['formControlName: controle selecionado.', '<mat-option value>: valor gravado no formulário.', '<mat-optgroup label>: agrupamento visual opcional.']
    },
    city: {
      selector: '<mat-autocomplete>',
      purpose: 'Sugere opções filtradas enquanto a pessoa digita.',
      example: '<input matInput formControlName="city" [matAutocomplete]="cityAuto" /><mat-autocomplete #cityAuto="matAutocomplete"><mat-option value="Campinas">Campinas</mat-option></mat-autocomplete>',
      parameters: ['[matAutocomplete]: referência ao painel de sugestões.', '#cityAuto="matAutocomplete": declara a referência local.', '<mat-option [value]>: opção selecionável.', 'Importe MatAutocompleteModule e MatInputModule.']
    },
    plan: {
      selector: '<mat-radio-group> / <mat-radio-button>',
      purpose: 'Escolhe exatamente uma opção de um conjunto.',
      example: '<mat-radio-group formControlName="plan"><mat-radio-button value="starter">Inicial</mat-radio-button><mat-radio-button value="business">Empresarial</mat-radio-button></mat-radio-group>',
      parameters: ['formControlName: controle que guarda a opção selecionada.', 'value: valor associado a cada opção.', 'aria-label ou <legend>: nome acessível do grupo.']
    },
    notifications: {
      selector: '<mat-slide-toggle>',
      purpose: 'Alterna uma preferência booleana, como habilitar notificações.',
      example: '<mat-slide-toggle formControlName="notifications">Receber notificações</mat-slide-toggle>',
      parameters: ['formControlName: controle booleano.', 'O texto projetado entre as tags descreve a preferência.']
    },
    accepted: {
      selector: '<mat-checkbox>',
      purpose: 'Marca uma opção independente, como aceitar termos.',
      example: '<mat-checkbox formControlName="accepted">Aceito os termos</mat-checkbox>',
      parameters: ['formControlName: controle booleano.', 'Validators.requiredTrue exige que a caixa esteja marcada.']
    },
    birthDate: {
      selector: '<input matInput [matDatepicker]> / <mat-datepicker>',
      purpose: 'Seleciona uma data usando o calendário do Angular Material.',
      example: '<input matInput [matDatepicker]="picker" formControlName="birthDate" /><mat-datepicker-toggle [for]="picker" /><mat-datepicker #picker />',
      parameters: ['[matDatepicker]: referência ao calendário.', '[for]: conecta o botão de abertura ao calendário.', 'Reactive Forms recebe Date; importe MatDatepickerModule e um DateAdapter.']
    },
    preferredTime: {
      selector: '<input matInput type="time">',
      purpose: 'Recebe um horário no formato nativo do navegador.',
      example: '<input matInput type="time" formControlName="preferredTime" />',
      parameters: ['type="time": ativa a entrada de horário.', 'step: intervalo opcional em segundos.', 'formControlName: controle string do formulário.']
    },
    range: {
      selector: '<mat-date-range-input> / <mat-date-range-picker>',
      purpose: 'Seleciona uma data inicial e final vinculadas ao mesmo grupo de formulário.',
      example: '<mat-date-range-input [rangePicker]="picker" [formGroup]="range"><input matStartDate formControlName="start" /><input matEndDate formControlName="end" /></mat-date-range-input><mat-date-range-picker #picker />',
      parameters: ['[rangePicker]: referência ao calendário de intervalo.', '[formGroup]: grupo com start e end.', 'matStartDate e matEndDate: identificam os dois campos do período.']
    },
    rating: {
      selector: '<mat-slider> / <input matSliderThumb>',
      purpose: 'Seleciona um número dentro de um intervalo por meio de um controle deslizante.',
      example: '<mat-slider min="0" max="100" step="1" discrete><input matSliderThumb formControlName="rating" /></mat-slider>',
      parameters: ['min e max: extremos do intervalo.', 'step: incremento permitido.', 'formControlName fica no input matSliderThumb.']
    },
    attachments: {
      selector: '<ilc-material-file-upload>',
      purpose: 'Upload público do ILC integrado a Reactive Forms; o valor do controle é File[].',
      example: '<ilc-material-file-upload formControlName="attachments" accept=".pdf,.png,.jpg,.jpeg" [maxSizeMb]="8" [multiple]="true" (rejectedFiles)="onRejected($event)" />',
      parameters: ['formControlName: controle File[].', 'accept?: extensões ou MIME types separados por vírgula.', 'maxSizeMb?: limite por arquivo em MB (padrão 8).', 'multiple?: permite vários arquivos (padrão true).', '(rejectedFiles): emite arquivos não aceitos.']
    },
    submit: {
      selector: '<button mat-flat-button type="submit">',
      purpose: 'Submete o formulário e executa o handler ngSubmit.',
      example: '<form [formGroup]="form" (ngSubmit)="submit()"><button mat-flat-button color="primary" type="submit">Enviar</button></form>',
      parameters: ['type="submit": dispara o evento ngSubmit do formulário.', '(ngSubmit): associe ao método que valida e processa os dados.', 'color: variante visual do Angular Material.']
    }
  } satisfies Record<string, ApiInfoEntry>;
  readonly passwordVisible = model(false);
  readonly submitted = output<void>();
  readonly cityQuery = signal('');
  readonly filteredCities = computed(() => {
    const query = this.cityQuery().trim().toLocaleLowerCase();
    return this.cities.filter((city) => city.toLocaleLowerCase().includes(query));
  });
  readonly cities = ['Sao Paulo', 'Campinas', 'Ribeirao Preto', 'Santos', 'Sorocaba'];

  readonly form = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email, companyEmailValidator] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(12)] }),
    search: new FormControl('', { nonNullable: true }),
    quantity: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(99)] }),
    notes: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(240)] }),
    department: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl('', { nonNullable: true }),
    plan: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    notifications: new FormControl(true, { nonNullable: true }),
    accepted: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    birthDate: new FormControl<Date | null>(null, Validators.required),
    range: new FormGroup({
      start: new FormControl<Date | null>(null, Validators.required),
      end: new FormControl<Date | null>(null, Validators.required)
    }),
    preferredTime: new FormControl('', { nonNullable: true }),
    rating: new FormControl(50, { nonNullable: true }),
    attachments: new FormControl<File[]>([], { nonNullable: true })
  });

  onCityInput(value: string): void {
    this.cityQuery.set(value);
    this.form.controls.city.setValue(value);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update((visible) => !visible);
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.submitted.emit();
  }
}
