import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  private authService = inject(AuthService);

  public userName$: Observable<string>;

  constructor() {
    this.userName$ = this.authService.currentUser$.pipe(
      map(user => user?.email ?? 'Usuario')
    );
  }

  onToggleSidebar(event: Event): void {
    event.stopPropagation();
    this.toggleSidebarEvent.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
