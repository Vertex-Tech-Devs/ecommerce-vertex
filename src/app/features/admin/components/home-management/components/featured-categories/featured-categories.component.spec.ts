import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import type { FormArray } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { FeaturedCategories } from './featured-categories';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Category } from '@core/models/category.model';

describe('FeaturedCategories', () => {
  let component: FeaturedCategories;
  let fixture: ComponentFixture<FeaturedCategories>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;
  let fb: FormBuilder;
  let mockFormArray: FormArray;

  const mockCategories: Category[] = [{ id: 'cat-1', name: 'Ropa', slug: 'ropa' } as Category];

  beforeEach(async () => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['deleteFileByUrl', 'uploadFile']);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', ['error']);

    storageServiceSpy.deleteFileByUrl.and.returnValue(of(undefined));
    storageServiceSpy.uploadFile.and.returnValue({
      progress$: of(100),
      downloadUrl$: of('https://example.com/category-img.jpg'),
    } as ReturnType<StorageService['uploadFile']>);

    await TestBed.configureTestingModule({
      imports: [FeaturedCategories, ReactiveFormsModule],
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
      ],
    }).compileComponents();

    fb = TestBed.inject(FormBuilder);
    mockFormArray = fb.array([
      fb.group({
        categoryId: ['cat-1'],
        name: ['Ropa'],
        slug: ['ropa'],
        imageUrl: ['https://example.com/old-url.jpg'],
      }),
    ]);

    fixture = TestBed.createComponent(FeaturedCategories);
    component = fixture.componentInstance;
    component.formArray = mockFormArray;
    component.categories = mockCategories;
    component.previewUrls = [null, null, null];
    fixture.detectChanges();
  });

  it('should create featured categories component', () => {
    expect(component).toBeTruthy();
  });

  it('should return FormGroup for given index', () => {
    const fg = component.getFormGroup(0);
    expect(fg.get('categoryId')?.value).toBe('cat-1');
  });

  it('should error when selected file is not an image', () => {
    const file = new File(['pdf content'], 'file.pdf', { type: 'application/pdf' });
    const event = { target: { files: [file], value: 'file.pdf' } } as unknown as Event;

    component.onFileSelected(event, 0);

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith(
      'Archivo no válido',
      jasmine.any(String),
    );
  });

  it('should delete old file and upload new category image on valid file selection', fakeAsync(() => {
    const file = new File(['img content'], 'cat.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file], value: 'cat.jpg' } } as unknown as Event;

    component.onFileSelected(event, 0);
    tick();

    expect(storageServiceSpy.deleteFileByUrl).toHaveBeenCalledWith(
      'https://example.com/old-url.jpg',
    );
    expect(storageServiceSpy.uploadFile).toHaveBeenCalledWith(
      file,
      'site-images/featured-category-0',
    );
    expect(mockFormArray.at(0).get('imageUrl')?.value).toBe('https://example.com/category-img.jpg');
    expect(component.previewUrls[0]).toBe('https://example.com/category-img.jpg');
  }));

  it('should handle upload error gracefully', fakeAsync(() => {
    storageServiceSpy.uploadFile.and.returnValue({
      progress$: of(0),
      downloadUrl$: throwError(() => new Error('Upload error')),
    } as ReturnType<StorageService['uploadFile']>);

    const file = new File(['img content'], 'cat.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file], value: 'cat.jpg' } } as unknown as Event;

    component.onFileSelected(event, 0);
    tick();

    expect(component.categoryUploadProgress[0]).toBeNull();
  }));
});
