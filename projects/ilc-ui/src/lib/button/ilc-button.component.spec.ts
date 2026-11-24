import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IlcButtonComponent } from './ilc-button.component';

@Component({
  standalone: true,
  imports: [IlcButtonComponent],
  template: '<ilc-button>Save</ilc-button>'
})
class ButtonHostComponent {}

describe('IlcButtonComponent', () => {
  let fixture: ComponentFixture<ButtonHostComponent>;
  let buttonComponent: IlcButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ButtonHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(ButtonHostComponent);
    buttonComponent = fixture.debugElement.query(By.directive(IlcButtonComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('creates and renders projected text', () => {
    expect(buttonComponent).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Save');
  });

  it('provides default size, color, variant and button type classes', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('ilc-button--size-2');
    expect(button.classList).toContain('ilc-button--primary');
    expect(button.classList).toContain('ilc-button--solid');
    expect(button.type).toBe('button');
  });

  it('applies custom size, color and variant', () => {
    Object.assign(buttonComponent, { size: 3, color: 'danger', variant: 'outline' });
    markButtonForCheck();
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.classList).toContain('ilc-button--size-3');
    expect(button.classList).toContain('ilc-button--danger');
    expect(button.classList).toContain('ilc-button--outline');
  });

  it('disables the native button when disabled', () => {
    buttonComponent.disabled = true;
    markButtonForCheck();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').disabled).toBeTrue();
  });

  it('disables the button and marks it busy while loading', () => {
    buttonComponent.loading = true;
    markButtonForCheck();
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(fixture.nativeElement.querySelector('.ilc-button__spinner')).toBeTruthy();
    expect(button.textContent).toContain('Save');
  });

  it('renders a decorative registered icon', () => {
    buttonComponent.icon = 'save';
    markButtonForCheck();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ilc-icon')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('ilc-icon').getAttribute('aria-hidden')).toBe('true');
    expect(fixture.nativeElement.querySelector('ilc-icon svg path')).toBeTruthy();
  });

  it('supports submit type and accessible label', () => {
    buttonComponent.type = 'submit';
    buttonComponent.ariaLabel = 'Save changes';
    markButtonForCheck();
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.type).toBe('submit');
    expect(button.getAttribute('aria-label')).toBe('Save changes');
  });

  it('keeps native click behavior', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    const click = jasmine.createSpy('click');
    button.addEventListener('click', click);
    button.click();
    expect(click).toHaveBeenCalledTimes(1);
  });

  function markButtonForCheck(): void {
    fixture.debugElement.query(By.directive(IlcButtonComponent))
      .injector.get(ChangeDetectorRef).markForCheck();
  }
});

