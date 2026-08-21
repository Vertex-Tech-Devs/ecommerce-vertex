import type { OnInit, OnDestroy } from '@angular/core';
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-admin-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-search-bar.html',
  styleUrl: './admin-search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSearchBar implements OnInit, OnDestroy {
  readonly placeholder = input<string>('Buscar...');
  readonly initialValue = input<string>('');
  readonly ariaLabel = input<string>('Buscar');

  readonly searchChange = output<string>();

  readonly searchControl = new FormControl<string>('', { nonNullable: true });
  private subscription?: Subscription;

  ngOnInit(): void {
    if (this.initialValue()) {
      this.searchControl.setValue(this.initialValue(), { emitEvent: false });
    }

    this.subscription = this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val) => {
        this.searchChange.emit(val.trim());
      });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
