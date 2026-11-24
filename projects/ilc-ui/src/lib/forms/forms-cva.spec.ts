import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsInputComponent } from './input/ds-input.component';
import { DsFormsPlaygroundComponent } from './forms-playground.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, DsInputComponent],
  template: '<ds-input [formControl]="control" />'
})
class InputHostComponent {
  readonly control = new FormControl('initial', { nonNullable: true });
}

describe('BaseControlValueAccessor', () => {
  let fixture: ComponentFixture<InputHostComponent>;
  let host: InputHostComponent;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [InputHostComponent] });
    fixture = TestBed.createComponent(InputHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
  });

  it('synchronizes the control value in both directions', () => {
    expect(input.value).toBe('initial');
    input.value = 'updated';
    input.dispatchEvent(new Event('input'));
    expect(host.control.value).toBe('updated');
  });

  it('reflects disabled and touched states from the form control', () => {
    host.control.disable();
    fixture.detectChanges();
    expect(input.disabled).toBeTrue();

    host.control.enable();
    input.dispatchEvent(new Event('blur'));
    expect(host.control.touched).toBeTrue();
  });
});

describe('DsFormsPlaygroundComponent', () => {
  it('renders the standalone controls and connects field labels to controls', async () => {
    await TestBed.configureTestingModule({ imports: [DsFormsPlaygroundComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsFormsPlaygroundComponent);
    expect(() => fixture.detectChanges()).not.toThrow();

    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelectorAll('ds-form-field').length).toBeGreaterThan(10);
    const input = root.querySelector('ds-form-field input') as HTMLInputElement;
    const label = root.querySelector('ds-form-field .ds-form-field__label-container') as HTMLLabelElement;
    expect(input.getAttribute('aria-labelledby')).toBe(label.id);
  });
});
