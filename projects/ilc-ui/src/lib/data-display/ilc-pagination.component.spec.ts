import { ILC_PAGE_SIZE_OPTIONS, IlcPaginationComponent } from './ilc-pagination.component';
import { PageEvent } from '@angular/material/paginator';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('IlcPaginationComponent', () => {
  let fixture: ComponentFixture<IlcPaginationComponent>;
  let component: IlcPaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlcPaginationComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();
    fixture = TestBed.createComponent(IlcPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('offers the requested page sizes and defaults to 5', () => {
    expect(ILC_PAGE_SIZE_OPTIONS).toEqual([5, 10, 25, 50, 100]);
    expect(component.pageSize()).toBe(5);
    expect(component.pageIndex()).toBe(0);
  });

  it('resets the current page when the page size changes', () => {
    component.pageIndex.set(3);
    component.pageSize.set(5);

    const event: PageEvent = { previousPageIndex: 3, pageIndex: 0, pageSize: 25, length: 100 };
    component.onPage(event);

    expect(component.pageSize()).toBe(25);
    expect(component.pageIndex()).toBe(0);
  });
});
