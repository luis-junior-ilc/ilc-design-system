import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IlcScrollAreaComponent } from './ilc-scroll-area.component';

@Component({
  standalone: true,
  imports: [IlcScrollAreaComponent],
  template: `
    <ilc-scroll-area [size]="size" axis="both" label="Lista">
      <ul>
        @for (item of items; track item) { <li>{{ item }}</li> }
      </ul>
    </ilc-scroll-area>
  `
})
class HostComponent {
  size: 'sm' | 'md' | 'lg' = 'md';
  items = Array.from({ length: 30 }, (_, index) => index + 1);
}

describe('IlcScrollAreaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
  });

  it('creates the component and defaults to the medium scrollbar size', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const scrollArea = fixture.nativeElement.querySelector('ilc-scroll-area');
    expect(scrollArea.getAttribute('data-size')).toBe('md');
    expect(scrollArea.classList).toContain('ilc-scroll-area--horizontal');
  });

  it('reflects the requested size through the host attribute', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.size = 'lg';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ilc-scroll-area').getAttribute('data-size')).toBe('lg');
  });
});
