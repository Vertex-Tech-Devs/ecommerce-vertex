import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';

describe('FirestoreService', () => {
  let service: FirestoreService<{ id?: string; name?: string; storeId?: string }>;
  let mockFirestore: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    mockFirestore = jasmine.createSpyObj('Firestore', ['type']);

    TestBed.configureTestingModule({
      providers: [FirestoreService, { provide: Firestore, useValue: mockFirestore }],
    });

    service = TestBed.inject(FirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw synchronous error on getAll when firestore instance is uninitialized', () => {
    expect(() => service.getAll('testCollection')).toThrow();
  });

  it('should throw synchronous error on get when firestore instance is uninitialized', () => {
    expect(() => service.get('testCollection', 'doc-1')).toThrow();
  });

  it('should throw synchronous error on create when firestore instance is uninitialized', () => {
    expect(() => service.create('products', { name: 'Test Product' })).toThrow();
  });

  it('should throw synchronous error on update when firestore instance is uninitialized', () => {
    expect(() => service.update('products', 'p1', { name: 'Updated Name' })).toThrow();
  });

  it('should throw synchronous error on delete when firestore instance is uninitialized', () => {
    expect(() => service.delete('products', 'p1')).toThrow();
  });
});
