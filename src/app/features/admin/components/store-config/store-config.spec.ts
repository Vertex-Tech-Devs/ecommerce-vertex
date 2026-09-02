import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { StoreConfig } from './store-config';
import { StoreConfigService } from '@core/services/store-config.service';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AuthService } from '@core/services/auth.service';
import type { StoreConfig as StoreConfigModel } from '@core/models/store-config.model';

describe('StoreConfig', () => {
  let component: StoreConfig;
  let fixture: ComponentFixture<StoreConfig>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;

  const mockConfig = {
    tenantId: 'store',
    storeId: 'store',
    storeName: 'Test Store',
    logoUrl: 'http://example.com/logo.png',
    faviconUrl: 'http://example.com/favicon.png',
    colors: { primary: '#ea580c', accent: '#ef4444', background: '#ffffff' },
    setupCompleted: true,
  } as StoreConfigModel;

  beforeEach(async () => {
    storeConfigServiceSpy = jasmine.createSpyObj(
      'StoreConfigService',
      ['loadConfig', 'saveConfig'],
      {
        storeConfig: signal<StoreConfigModel | null>(mockConfig),
        isLoading: signal(false),
      },
    );
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['uploadFile']);
    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['success', 'error']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], { isOwner$: of(true) });
    storeConfigServiceSpy.saveConfig.and.resolveTo();

    await TestBed.configureTestingModule({
      imports: [StoreConfig],
      providers: [
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreConfig);
    component = fixture.componentInstance;
    TestBed.flushEffects();
    fixture.detectChanges();
  });

  it('loads only corporate identity fields', () => {
    expect(component.form.get('storeName')?.value).toBe('Test Store');
    expect(component.form.get('colors.primary')?.value).toBe('#ea580c');
    expect(component.form.get('announcementBar')).toBeNull();
    expect(component.form.get('deliveryMethods')).toBeNull();
  });

  it('preserves other configuration when saving brand fields', async () => {
    component.form.patchValue({ storeName: 'Updated Store' });
    component.form.markAsDirty();
    await component.onSubmit();
    const saved = storeConfigServiceSpy.saveConfig.calls.mostRecent().args[0];
    expect(saved.storeName).toBe('Updated Store');
    expect(saved.logoUrl).toBe(mockConfig.logoUrl);
    expect(saved.faviconUrl).toBe(mockConfig.faviconUrl);
    expect(saved.colors).toEqual(mockConfig.colors);
  });

  it('rejects an invalid identity form', async () => {
    component.form.patchValue({ storeName: '' });
    await component.onSubmit();
    expect(storeConfigServiceSpy.saveConfig).not.toHaveBeenCalled();
    expect(sweetAlertSpy.error).toHaveBeenCalled();
  });

  it('handles successful logo uploads', () => {
    const file = new File(['image'], 'logo.png', { type: 'image/png' });
    storageServiceSpy.uploadFile.and.returnValue({
      progress$: of(100),
      downloadUrl$: of('https://example.com/new-logo.png'),
    } as ReturnType<StorageService['uploadFile']>);

    component.onLogoUpload({ target: { files: [file] } } as unknown as Event);

    expect(component.form.get('logoUrl')?.value).toBe('https://example.com/new-logo.png');
    expect(component.isUploadingLogo()).toBeFalse();
  });

  it('handles failed favicon uploads', () => {
    const file = new File(['image'], 'favicon.png', { type: 'image/png' });
    storageServiceSpy.uploadFile.and.returnValue({
      progress$: of(10),
      downloadUrl$: throwError(() => new Error('upload failed')),
    } as ReturnType<StorageService['uploadFile']>);

    component.onFaviconUpload({ target: { files: [file] } } as unknown as Event);

    expect(component.faviconUploading()).toBeFalse();
    expect(sweetAlertSpy.error).toHaveBeenCalled();
  });
});
