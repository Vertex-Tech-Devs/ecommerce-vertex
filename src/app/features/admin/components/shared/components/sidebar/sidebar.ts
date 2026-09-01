import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class Sidebar {
  @Input() isOpen: boolean = false;
  @Output() linkClicked = new EventEmitter<void>();
  readonly isDev = !environment.production;

  onLinkClick(): void {
    this.linkClicked.emit();
  }

  onBackdropClick(): void {
    this.linkClicked.emit();
  }
}
