import { TestBed } from '@angular/core/testing';
import { IlcBadgeComponent } from '../data-display/ilc-badge.component';
import { IlcCardComponent } from '../data-display/ilc-card.component';
import { IlcBreadcrumbComponent } from './ilc-breadcrumb.component';
import { IlcTabsComponent } from './ilc-tabs.component';

describe('Data Display & Navigation components', () => {
  it('renders badge with tone and dot attribute', () => {
    const fixture = TestBed.createComponent(IlcBadgeComponent);
    fixture.componentRef.setInput('tone', 'success');
    fixture.componentRef.setInput('dot', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-tone')).toBe('success');
    expect(fixture.nativeElement.querySelector('.ilc-badge__dot')).toBeTruthy();
  });

  it('renders card with title, subtitle, and optional ribbon', () => {
    const fixture = TestBed.createComponent(IlcCardComponent);
    fixture.componentRef.setInput('title', 'Torre de Controle');
    fixture.componentRef.setInput('subtitle', 'Monitoramento em tempo real');
    fixture.componentRef.setInput('accentRibbon', true);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Torre de Controle');
    expect(el.textContent).toContain('Monitoramento em tempo real');
    expect(el.querySelector('ilc-brand-ribbon')).toBeTruthy();
  });

  it('switches active tab and ignores disabled tab', () => {
    const fixture = TestBed.createComponent(IlcTabsComponent);
    fixture.componentRef.setInput('tabs', [
      { id: 'overview', label: 'Visão Geral' },
      { id: 'trips', label: 'Viagens', badge: 5 },
      { id: 'locked', label: 'Bloqueada', disabled: true }
    ]);
    fixture.componentRef.setInput('activeTab', 'overview');
    fixture.detectChanges();

    let selected = '';
    fixture.componentInstance.activeTabChange.subscribe((id) => { selected = id; });

    const buttons = fixture.nativeElement.querySelectorAll('button[role="tab"]') as NodeListOf<HTMLButtonElement>;
    buttons[1].click();
    expect(selected).toBe('trips');

    buttons[2].click();
    expect(selected).toBe('trips');
  });

  it('renders breadcrumb items and emits click on non-last item', () => {
    const fixture = TestBed.createComponent(IlcBreadcrumbComponent);
    fixture.componentRef.setInput('items', [
      { label: 'Início', id: 'home' },
      { label: 'Operações', id: 'ops' },
      { label: 'Viagens' }
    ]);
    fixture.detectChanges();

    let clickedLabel = '';
    fixture.componentInstance.itemClick.subscribe((item) => { clickedLabel = item.label; });

    const links = fixture.nativeElement.querySelectorAll('.ilc-breadcrumb__link') as NodeListOf<HTMLElement>;
    expect(links.length).toBe(2);
    links[1].click();
    expect(clickedLabel).toBe('Operações');
  });
});
