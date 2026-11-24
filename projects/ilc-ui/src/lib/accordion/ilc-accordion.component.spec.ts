import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IlcAccordionComponent } from './ilc-accordion.component';
import { IlcAccordionItemComponent } from './ilc-accordion-item.component';

@Component({
  standalone: true,
  imports: [IlcAccordionComponent, IlcAccordionItemComponent],
  template: '<ilc-accordion><ilc-accordion-item title="Botão">Exemplo</ilc-accordion-item></ilc-accordion>'
})
class AccordionHostComponent {}

describe('IlcAccordionComponent', () => {
  let fixture: ComponentFixture<AccordionHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AccordionHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(AccordionHostComponent);
    fixture.detectChanges();
  });

  it('renders the item title and projected content', () => {
    expect(fixture.nativeElement.querySelector('summary').textContent).toContain('Botão');
    expect(fixture.nativeElement.textContent).toContain('Exemplo');
  });

  it('opens and closes using the native summary control', () => {
    const details: HTMLDetailsElement = fixture.nativeElement.querySelector('details');
    const summary: HTMLElement = fixture.nativeElement.querySelector('summary');
    expect(details.open).toBeFalse();
    summary.click();
    expect(details.open).toBeTrue();
    summary.click();
    expect(details.open).toBeFalse();
  });
});
