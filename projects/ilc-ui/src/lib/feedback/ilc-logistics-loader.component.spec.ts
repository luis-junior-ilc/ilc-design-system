import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IlcLogisticsLoaderComponent } from './ilc-logistics-loader.component';

@Component({
  standalone: true,
  imports: [IlcLogisticsLoaderComponent],
  template: '<ilc-logistics-loader label="Preparando entrega" />'
})
class LogisticsLoaderHostComponent {}

describe('IlcLogisticsLoaderComponent', () => {
  let fixture: ComponentFixture<LogisticsLoaderHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LogisticsLoaderHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(LogisticsLoaderHostComponent);
    fixture.detectChanges();
  });

  it('renders an accessible animated shipping sequence and its label', () => {
    const loader: HTMLElement = fixture.nativeElement.querySelector('.ilc-logistics-loader');
    expect(loader.getAttribute('role')).toBe('status');
    expect(loader.textContent).toContain('Preparando entrega');
    expect(loader.querySelector('.ilc-logistics-loader__belt')).toBeTruthy();
    expect(loader.querySelectorAll('.ilc-logistics-loader__package--belt').length).toBe(1);
    expect(loader.querySelector('.ilc-logistics-loader__forklift-icon')).toBeTruthy();
    expect(loader.querySelector('.ilc-logistics-loader__trailer')).toBeTruthy();
    expect(loader.querySelectorAll('.ilc-logistics-loader__stack').length).toBe(2);
    expect(loader.querySelector('.ilc-logistics-loader__warehouse-icon')).toBeTruthy();
  });

  it('keeps the scene hidden from assistive technology', () => {
    expect(fixture.nativeElement.querySelector('.ilc-logistics-loader__scene').getAttribute('aria-hidden')).toBe('true');
  });
});
