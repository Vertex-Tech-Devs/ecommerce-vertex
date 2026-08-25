import { TestBed } from '@angular/core/testing';
import { Injectable, signal, computed } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  accent: string;
  background: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _mode = signal<ThemeMode>('light');
  readonly mode = this._mode.asReadonly();

  private readonly _colors = signal<ThemeColors>({
    primary: '#ea580c',
    accent: '#ef4444',
    background: '#ffffff',
  });
  readonly colors = this._colors.asReadonly();

  readonly isDarkMode = computed(() => this.mode() === 'dark');

  setMode(mode: ThemeMode): void {
    this._mode.set(mode);
    try {
      localStorage.setItem('theme_mode', mode);
    } catch {}
  }

  toggleTheme(): void {
    this.setMode(this.mode() === 'light' ? 'dark' : 'light');
  }

  setColors(colors: Partial<ThemeColors>): void {
    const updated = { ...this.colors(), ...colors };
    this._colors.set(updated);
    const root = document.documentElement;
    if (colors.primary) {
      root.style.setProperty('--color-primary', colors.primary);
    }
    if (colors.accent) {
      root.style.setProperty('--color-accent', colors.accent);
    }
    if (colors.background) {
      root.style.setProperty('--shop-bg', colors.background);
    }
  }
}

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
