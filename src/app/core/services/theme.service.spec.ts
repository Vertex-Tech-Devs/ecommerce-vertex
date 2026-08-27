import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    service = TestBed.inject(ThemeService);
  });

  it('should initialize with default light theme and colors', () => {
    expect(service.mode()).toBe('light');
    expect(service.isDarkMode()).toBeFalse();
    expect(service.colors().primary).toBe('#ea580c');
  });

  it('should set theme mode and persist to localStorage', () => {
    service.setMode('dark');
    expect(service.mode()).toBe('dark');
    expect(service.isDarkMode()).toBeTrue();
    expect(localStorage.setItem).toHaveBeenCalledWith('theme_mode', 'dark');
  });

  it('should toggle theme mode between light and dark', () => {
    expect(service.mode()).toBe('light');
    service.toggleTheme();
    expect(service.mode()).toBe('dark');
    service.toggleTheme();
    expect(service.mode()).toBe('light');
  });

  it('should update CSS custom properties and signals when setColors is called', () => {
    service.setColors({ primary: '#0055ff', accent: '#ffaa00' });
    expect(service.colors().primary).toBe('#0055ff');
    expect(service.colors().accent).toBe('#ffaa00');

    const root = document.documentElement;
    expect(root.style.getPropertyValue('--color-primary')).toBe('#0055ff');
    expect(root.style.getPropertyValue('--color-accent')).toBe('#ffaa00');
  });
});
