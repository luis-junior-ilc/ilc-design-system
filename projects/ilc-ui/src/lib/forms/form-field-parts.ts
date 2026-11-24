import { Directive } from '@angular/core';

@Directive({ selector: 'ds-label', standalone: true, host: { class: 'ds-form-field__label' } })
export class DsLabelDirective {}

@Directive({ selector: 'ds-hint', standalone: true, host: { class: 'ds-form-field__hint' } })
export class DsHintDirective {}

@Directive({ selector: 'ds-error', standalone: true, host: { class: 'ds-form-field__error', role: 'alert' } })
export class DsErrorDirective {}

@Directive({ selector: '[dsPrefix]', standalone: true, host: { class: 'ds-form-field__prefix' } })
export class DsPrefixDirective {}

@Directive({ selector: '[dsSuffix]', standalone: true, host: { class: 'ds-form-field__suffix' } })
export class DsSuffixDirective {}
