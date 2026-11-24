# ILC Design System

Biblioteca Angular distribuída pelo GitHub Packages.

## Usar em outro projeto

1. **Verifique os pré-requisitos:** o projeto consumidor deve usar Angular 18 ou superior e ter acesso ao pacote no GitHub.

2. **Configure o acesso** no `.npmrc` do projeto:

   ```ini
   @grupo-mirassol:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
   ```

   Defina `NODE_AUTH_TOKEN` com um token do GitHub que tenha permissão `read:packages`. Não versione o token. Em CI, configure-o como secret e conceda acesso do repositório ao pacote.

3. **Instale a biblioteca:**

   ```sh
   npm install @grupo-mirassol/ilc-design-system
   ```

4. **Importe o módulo e use o componente** em um componente standalone:

   ```ts
   import { Component } from '@angular/core';
   import { IlcUiModule } from '@grupo-mirassol/ilc-design-system';

   @Component({
     standalone: true,
     imports: [IlcUiModule],
     template: '<ilc-button>Continuar</ilc-button>',
   })
   export class AppComponent {}
   ```

   Em projetos baseados em `NgModule`, adicione `IlcUiModule` ao array `imports` do módulo da aplicação.

`IlcButtonComponent` também pode ser importado diretamente em componentes standalone. O seletor do botão é `<ilc-button>`.

```ts
import { Component } from '@angular/core';
import { IlcButtonComponent } from '@grupo-mirassol/ilc-design-system';

@Component({
  standalone: true,
  imports: [IlcButtonComponent],
  template: '<ilc-button>Continuar</ilc-button>',
})
export class AppComponent {}
```

## Design tokens, ícones e botão

Carregue os tokens uma vez nos estilos globais da aplicação consumidora:

```scss
@use '@grupo-mirassol/ilc-design-system/tokens/ilc-tokens';
```

O botão aceita `size` (`1`, `2` ou `3`), `color` (`primary`, `secondary`, `success`, `warning`, `danger` ou `info`), `variant` (`solid`, `outline`, `text` ou `icon`), `disabled`, `loading` e `type`. Os ícones incluídos são `save`, `edit`, `delete`, `search`, `add` e `close`.

```html
<ilc-button icon="save" color="primary" size="2">Gravar</ilc-button>
<ilc-button icon="edit" variant="outline">Editar</ilc-button>
<ilc-button icon="delete" color="danger" variant="outline">Excluir</ilc-button>
```

Para o tema escuro, defina `data-theme="dark"` em um elemento ancestral, como `<body>`. Os tokens aceitam sobrescrita pela aplicação para personalizar a identidade visual.

### Formulários com Angular Material 18

Instale Material e CDK v18 no app consumidor e carregue o tema Azure & Blue uma vez em `src/styles.scss`:

```sh
npm install @angular/material@^18.2 @angular/cdk@^18.2 @angular/animations@^18
```

```scss
@import '@angular/material/prebuilt-themes/azure-blue.css';
```

Para os ligatures de `<mat-icon>` (como `visibility`, `delete` e `attach_file`), carregue também a fonte Material Icons no `index.html`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Registre animações Material nos providers da aplicação standalone:

```ts
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig = {
  providers: [provideAnimations()],
};
```

Em componentes standalone, importe `ReactiveFormsModule` e os módulos Material usados, por exemplo `MatFormFieldModule` e `MatInputModule`:

```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <form [formGroup]="form">
      <mat-form-field appearance="outline">
        <mat-label>E-mail</mat-label>
        <input matInput type="email" formControlName="email" />
        @if (form.controls.email.hasError('email')) {
          <mat-error>Informe um e-mail válido.</mat-error>
        }
      </mat-form-field>
    </form>
  `,
})
export class ProfileFormComponent {
  readonly form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });
}
```

O showcase em `projects/ilc-ui/src/lib/forms/material-forms-playground.component.ts` demonstra input, password, search, number, textarea com auto-resize, select agrupado, autocomplete filtrado por Signals, checkbox, radio, slide toggle, datepicker, intervalo de datas, hora, upload CVA e slider. O upload reutilizável é exportado como `IlcMaterialFileUploadComponent`.

### Dropdown, loader, modal e cards

O dropdown pesquisável implementa CVA e permite emitir consultas remotas ou solicitar a criação de um registro:

```html
<ilc-searchable-dropdown [formControl]="unitControl" [options]="units" [allowCreate]="true"
  (searchChange)="searchUnits($event)" (createRecord)="createUnit($event)" />
```

`IlcTruckLoaderComponent` mostra o estado de carregamento com animação respeitando `prefers-reduced-motion`. `IlcMetricCardComponent` recebe título, valor, detalhe, ícone e um tom (`azure`, `teal`, `amber` ou `rose`). Para abrir os modais Material, injete `IlcDialogService` e chame `open({ title, message, kind, showCancel })`.

### Tabela de viagens

`IlcTripsTableComponent` recebe viagens na ordem de prioridade, emite `actionRequested` para a ação da linha e oferece exportação Excel (`viagens.xls`, SpreadsheetML compatível com Microsoft Excel):

```html
<ilc-trips-table [trips]="priorityTrips" (actionRequested)="handleTripAction($event)" />
```

Use `IlcPaginationComponent` sozinho ou junto à tabela; ele emite `pageChange` com os dados do evento do Material e aceita `length`, `pageIndex` e `pageSize`:

```html
<ilc-pagination [length]="totalRecords" [pageSize]="5"
  [pageSizeOptions]="[5, 10, 25, 50, 100]" (pageChange)="changePage($event)" />
```

### Accordion

Use cada `ilc-accordion-item` para agrupar a demonstração de um componente. Os itens usam `details` e `summary` nativos, podem ser expandidos independentemente e aceitam conteúdo Angular projetado:

```html
<ilc-accordion>
  <ilc-accordion-item title="Botão" [expanded]="true">
    <ilc-button icon="save">Gravar</ilc-button>
  </ilc-accordion-item>

  <ilc-accordion-item title="Ícones">
    <ilc-icon name="search"></ilc-icon>
  </ilc-accordion-item>
</ilc-accordion>
```
