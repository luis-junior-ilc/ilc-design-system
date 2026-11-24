import { TestBed } from '@angular/core/testing';
import { IlcBrandRibbonComponent } from '../brand/ilc-brand-ribbon.component';
import { IlcLogoComponent } from '../brand/ilc-logo.component';
import { IlcHeaderComponent } from './ilc-header.component';

describe('Brand & Layout components', () => {
  it('renders full logo with wordmark and mark-only variant', () => {
    const fixture = TestBed.createComponent(IlcLogoComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ilc-logo__wordmark')).toBeTruthy();

    fixture.componentRef.setInput('variant', 'mark');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ilc-logo__wordmark')).toBeNull();
  });

  it('renders brand ribbon with configurable height', () => {
    const fixture = TestBed.createComponent(IlcBrandRibbonComponent);
    fixture.componentRef.setInput('height', 'md');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-height')).toBe('md');
    expect(fixture.nativeElement.querySelector('.ilc-brand-ribbon')).toBeTruthy();
  });

  it('renders header title, ribbon, and emits themeToggle', () => {
    const fixture = TestBed.createComponent(IlcHeaderComponent);
    fixture.componentRef.setInput('title', 'Portal Integrator');
    fixture.componentRef.setInput('showThemeToggle', true);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Portal Integrator');
    expect(el.querySelector('ilc-brand-ribbon')).toBeTruthy();

    let toggled = false;
    fixture.componentInstance.themeToggle.subscribe(() => { toggled = true; });
    (el.querySelector('.ilc-header__theme-btn') as HTMLButtonElement).click();
    expect(toggled).toBeTrue();
  });
});
