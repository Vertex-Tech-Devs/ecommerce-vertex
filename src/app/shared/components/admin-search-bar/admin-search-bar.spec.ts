import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdminSearchBar } from './admin-search-bar';

describe('AdminSearchBar', () => {
  let component: AdminSearchBar;
  let fixture: ComponentFixture<AdminSearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSearchBar],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search value with debounce', fakeAsync(() => {
    let emitted = '';
    component.searchChange.subscribe((val) => (emitted = val));

    component.searchControl.setValue('camisa');
    tick(100);
    expect(emitted).toBe(''); // Not yet debounced

    tick(250);
    expect(emitted).toBe('camisa');
  }));

  it('should clear search when clearSearch is called', () => {
    component.searchControl.setValue('pantalon');
    expect(component.searchControl.value).toBe('pantalon');

    component.clearSearch();
    expect(component.searchControl.value).toBe('');
  });

  it('should set initialValue if provided', () => {
    const fixtureInit = TestBed.createComponent(AdminSearchBar);
    fixtureInit.componentRef.setInput('initialValue', 'zapatillas');
    fixtureInit.detectChanges();

    expect(fixtureInit.componentInstance.searchControl.value).toBe('zapatillas');
  });
});
