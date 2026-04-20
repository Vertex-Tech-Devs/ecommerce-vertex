import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/components/header/header.component';
import { SidebarComponent } from './components/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isSidebarOpen: boolean = false;

  private readonly breakpointMd = 768;

  constructor() { }

  ngOnInit(): void {
    this.checkScreenSizeForInitialState();
  }

  toggleSidebar(): void {
    if (window.innerWidth < this.breakpointMd) {
      this.isSidebarOpen = !this.isSidebarOpen;
    } else {
      this.isSidebarOpen = false;
    }
  }

  closeSidebarOnOverlayClick(): void {
    if (this.isSidebarOpen && window.innerWidth < this.breakpointMd) {
      this.isSidebarOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: Event): void {
    this.checkScreenSizeForInitialState();
  }

  private checkScreenSizeForInitialState(): void {
    if (window.innerWidth >= this.breakpointMd) {
      this.isSidebarOpen = false;
    }
  }
}
