import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  private authService = inject(AuthService);

  userName$: Observable<string>;

  constructor() {
    this.userName$ = this.authService.currentUser$.pipe(map((user) => user?.email ?? 'Usuario'));
  }

  onToggleSidebar(event: Event): void {
    event.stopPropagation();
    this.toggleSidebarEvent.emit();
  }

  logout(): void {
    void this.authService.logout();
  }
}
