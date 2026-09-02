import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { AdminPagination } from './admin-pagination';

describe('AdminPagination', () => {
  let component: AdminPagination;
  let fixture: ComponentFixture<AdminPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPagination);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should calculate totalPages correctly', () => {
    fixture.componentRef.setInput('totalItems', 45);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();

    expect(component.totalPages()).toBe(5);
    expect(component.startItem()).toBe(1);
    expect(component.endItem()).toBe(10);
  });

  it('should calculate startItem and endItem for page 2', () => {
    fixture.componentRef.setInput('totalItems', 45);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('currentPage', 2);
    fixture.detectChanges();

    expect(component.startItem()).toBe(11);
    expect(component.endItem()).toBe(20);
  });

  it('should emit pageChange when prevPage and nextPage are called', () => {
    fixture.componentRef.setInput('totalItems', 50);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('currentPage', 3);
    fixture.detectChanges();

    let pageEmitted = 0;
    component.pageChange.subscribe((p) => (pageEmitted = p));

    component.prevPage();
    expect(pageEmitted).toBe(2);

    component.nextPage();
    expect(pageEmitted).toBe(4);
  });

  it('should emit pageSizeChange when onSizeChange is triggered', () => {
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();

    let newSizeEmitted = 0;
    component.pageSizeChange.subscribe((s) => (newSizeEmitted = s));

    const mockEvent = { target: { value: '25' } } as unknown as Event;
    component.onSizeChange(mockEvent);

    expect(newSizeEmitted).toBe(25);
  });

  it('should build visiblePages with ellipsis for many pages', () => {
    fixture.componentRef.setInput('totalItems', 200);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('currentPage', 10);
    fixture.detectChanges();

    expect(component.totalPages()).toBe(20);
    const pages = component.visiblePages();
    expect(pages[0]).toBe(1);
    expect(pages.includes('...')).toBeTrue();
    expect(pages[pages.length - 1]).toBe(20);
  });

  it('should handle zero total items and visiblePages <= 7', () => {
    fixture.componentRef.setInput('totalItems', 0);
    fixture.detectChanges();
    expect(component.startItem()).toBe(0);
    expect(component.endItem()).toBe(0);
    expect(component.visiblePages()).toEqual([1]);
  });

  it('should handle onPageClick, prevPage at start, and nextPage at end', () => {
    fixture.componentRef.setInput('totalItems', 50);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.detectChanges();

    let pageEmitted = 0;
    component.pageChange.subscribe((p) => (pageEmitted = p));

    component.prevPage();
    expect(pageEmitted).toBe(0);

    component.onPageClick('...');
    expect(pageEmitted).toBe(0);

    component.onPageClick(1);
    expect(pageEmitted).toBe(0);

    component.onPageClick(99);
    expect(pageEmitted).toBe(0);

    component.onPageClick(3);
    expect(pageEmitted).toBe(3);

    fixture.componentRef.setInput('currentPage', 5);
    fixture.detectChanges();
    pageEmitted = 0;
    component.nextPage();
    expect(pageEmitted).toBe(0);
  });
});
