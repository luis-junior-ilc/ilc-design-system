import { TestBed } from '@angular/core/testing';
import { IlcAlertComponent } from './ilc-alert.component';
import { IlcEmptyStateComponent } from './ilc-empty-state.component';
import { IlcSkeletonComponent } from './ilc-skeleton.component';

describe('Feedback & State components', () => {
  it('renders alert with title, tone, and emits dismissed', () => {
    const fixture = TestBed.createComponent(IlcAlertComponent);
    fixture.componentRef.setInput('tone', 'warning');
    fixture.componentRef.setInput('title', 'Atenção operacional');
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.getAttribute('data-tone')).toBe('warning');
    expect(el.textContent).toContain('Atenção operacional');

    let closed = false;
    fixture.componentInstance.dismissed.subscribe(() => { closed = true; });
    (el.querySelector('.ilc-alert__close') as HTMLButtonElement).click();
    expect(closed).toBeTrue();
  });

  it('renders empty state with title and description', () => {
    const fixture = TestBed.createComponent(IlcEmptyStateComponent);
    fixture.componentRef.setInput('title', 'Sem viagens pendentes');
    fixture.componentRef.setInput('description', 'Todas as coletas foram auditadas.');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Sem viagens pendentes');
    expect(el.textContent).toContain('Todas as coletas foram auditadas.');
  });

  it('renders multi-line text skeleton', () => {
    const fixture = TestBed.createComponent(IlcSkeletonComponent);
    fixture.componentRef.setInput('variant', 'text');
    fixture.componentRef.setInput('lines', 3);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.ilc-skeleton');
    expect(items.length).toBe(3);
  });
});
