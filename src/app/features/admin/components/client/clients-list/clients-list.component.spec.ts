import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ClientsList } from './clients-list';
import { ClientService } from '@core/services/client.service';
import type { Client } from '@core/models/client.model';

describe('ClientsList', () => {
  let component: ClientsList;
  let fixture: ComponentFixture<ClientsList>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;
  let router: Router;

  const mockClients: Client[] = [
    {
      id: 'c1',
      fullName: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '1122334455',
    } as Client,
    {
      id: 'c2',
      fullName: 'Maria Gómez',
      email: 'maria@example.com',
      phone: '1199887766',
    } as Client,
  ];

  beforeEach(async () => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', ['getClients']);
    clientServiceSpy.getClients.and.returnValue(of(mockClients));

    await TestBed.configureTestingModule({
      imports: [ClientsList],
      providers: [provideRouter([]), { provide: ClientService, useValue: clientServiceSpy }],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ClientsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create clients list component', () => {
    expect(component).toBeTruthy();
    expect(component.isLoading()).toBeFalse();
  });

  it('should filter clients by search term', fakeAsync(() => {
    let result: Client[] = [];
    component.clients$.subscribe((clients) => (result = clients));

    component.onSearchChange('Juan');
    tick(300);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('c1');
  }));

  it('should update items per page', fakeAsync(() => {
    component.onItemsPerPageChange(20);
    tick(300);

    expect(component.itemsPerPageSubject.value).toBe(20);
    expect(component.currentPageSubject.value).toBe(1);
  }));

  it('should navigate to valid page', () => {
    component.totalPages = 3;
    component.goToPage(2);
    expect(component.currentPageSubject.value).toBe(2);
  });

  it('should navigate to customer details on viewClientHistory', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.viewClientHistory('juan@example.com');

    expect(navigateSpy).toHaveBeenCalledWith(['/admin/customers', 'juan@example.com']);
  });

  it('should handle error when loading clients', () => {
    clientServiceSpy.getClients.and.returnValue(throwError(() => new Error('Load error')));
    component.loadClients();

    expect(component.isLoading()).toBeFalse();
  });

  it('should ignore invalid page numbers in goToPage()', () => {
    component.totalPages = 3;
    component.goToPage(0);
    expect(component.currentPageSubject.value).toBe(1);

    component.goToPage(999);
    expect(component.currentPageSubject.value).toBe(1);
  });

  it('should handle empty search results setting totalPages to 0 and correctedPage to 1', fakeAsync(() => {
    let result: Client[] = [];
    component.clients$.subscribe((clients) => (result = clients));

    component.onSearchChange('NONEXISTENT_CLIENT');
    tick(300);

    expect(result.length).toBe(0);
    expect(component.totalClients).toBe(0);
    expect(component.totalPages).toBe(0);
  }));

  it('should clamp correctedPage to totalPages when currentPage > totalPages', fakeAsync(() => {
    let result: Client[] = [];
    component.clients$.subscribe((clients) => (result = clients));

    component.onItemsPerPageChange(1); // totalPages = 2
    component.currentPageSubject.next(5); // 5 > 2
    tick(300);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('c2');
  }));
});
