import { TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';
import { FirestoreService } from './firestore.service';
import { Firestore } from '@angular/fire/firestore';
import { of, throwError } from 'rxjs';
import type { Client } from '../models/client.model';

describe('ClientService', () => {
  let service: ClientService;
  let firestoreServiceSpy: jasmine.SpyObj<FirestoreService<Client>>;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  const mockClients: Client[] = [
    {
      id: 'c1',
      fullName: 'Cliente Uno',
      email: 'uno@test.com',
      phone: '123456',
      firstOrderDate: new Date('2026-01-01'),
      lastOrderDate: new Date('2026-01-15'),
      numberOfOrders: 2,
    },
    {
      id: 'c2',
      fullName: 'Cliente Dos',
      email: 'dos@test.com',
      phone: '654321',
      firstOrderDate: new Date('2026-02-01'),
      lastOrderDate: new Date('2026-02-10'),
      numberOfOrders: 1,
    },
  ];

  beforeEach(() => {
    firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', [
      'getAll',
      'get',
      'create',
      'update',
      'delete',
    ]);
    firestoreSpy = jasmine.createSpyObj('Firestore', [
      'collection',
      'doc',
      'getDocs',
      'getDoc',
      'setDoc',
      'updateDoc',
      'deleteDoc',
      'query',
      'where',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ClientService,
        { provide: FirestoreService, useValue: firestoreServiceSpy },
        { provide: Firestore, useValue: firestoreSpy },
      ],
    });

    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getClients', () => {
    it('should return clients sorted by lastOrderDate descending', (done) => {
      firestoreServiceSpy.getAll.and.returnValue(of(mockClients));

      service.getClients().subscribe((clients) => {
        expect(clients.length).toBe(2);
        expect(clients[0].id).toBe('c2'); // Feb 10 is later than Jan 15
        expect(clients[1].id).toBe('c1');
        done();
      });
    });
  });

  describe('getClientByEmail', () => {
    it('should find client by composite ID', (done) => {
      firestoreServiceSpy.get.and.returnValue(of(mockClients[0]));

      service.getClientByEmail('uno@test.com').subscribe((client) => {
        expect(client).toEqual(mockClients[0]);
        done();
      });
    });

    it('should fallback to all clients search if direct composite get returns undefined', (done) => {
      firestoreServiceSpy.get.and.returnValue(of(undefined));
      firestoreServiceSpy.getAll.and.returnValue(of(mockClients));

      service.getClientByEmail('uno@test.com').subscribe((client) => {
        expect(client?.email).toBe('uno@test.com');
        done();
      });
    });
  });

  describe('getTotalClients', () => {
    it('should return count of all clients', (done) => {
      firestoreServiceSpy.getAll.and.returnValue(of(mockClients));

      service.getTotalClients().subscribe((count) => {
        expect(count).toBe(2);
        done();
      });
    });
  });

  describe('getLatestClients', () => {
    it('should return latest N clients', (done) => {
      firestoreServiceSpy.getAll.and.returnValue(of(mockClients));

      service.getLatestClients(1).subscribe((latest) => {
        expect(latest.length).toBe(1);
        expect(latest[0].id).toBe('c2');
        done();
      });
    });

    it('should handle errors gracefully and return empty array', (done) => {
      firestoreServiceSpy.getAll.and.returnValue(throwError(() => new Error('Firestore Error')));

      service.getLatestClients(5).subscribe((latest) => {
        expect(latest).toEqual([]);
        done();
      });
    });
  });
});
