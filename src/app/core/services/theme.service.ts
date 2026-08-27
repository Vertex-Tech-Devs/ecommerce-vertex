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
    } catch {
      // LocalStorage access errors ignored safely
    }
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
      root.style.setProperty('--color-background', colors.background);
      root.style.setProperty('--shop-bg', colors.background);
    }
  }
}
