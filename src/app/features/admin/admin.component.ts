import type { OnInit } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/components/header/header.component';
import { SidebarComponent } from './components/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  isSidebarOpen: boolean = false;

  private readonly breakpointLg = 1024;

  ngOnInit(): void {
    this.checkScreenSize();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    if (this.isSidebarOpen) {
      this.isSidebarOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    if (window.innerWidth > this.breakpointLg) {
      this.isSidebarOpen = false;
    }
  }
}
