import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/shared/components/header/header.component';
import { SidebarComponent } from './components/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, SidebarComponent],
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
      console.log('Sidebar toggled. isSidebarOpen:', this.isSidebarOpen);
    } else {
      this.isSidebarOpen = false;
      console.log('Attempted to toggle sidebar in desktop view. isSidebarOpen kept as:', this.isSidebarOpen);
    }
  }

  closeSidebarOnOverlayClick(): void {
    if (this.isSidebarOpen && window.innerWidth < this.breakpointMd) {
      this.isSidebarOpen = false;
      console.log('Sidebar closed by overlay click or link click. isSidebarOpen:', this.isSidebarOpen);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSizeForInitialState();
    console.log('Window resized. New width:', window.innerWidth, 'isSidebarOpen:', this.isSidebarOpen);
  }

  private checkScreenSizeForInitialState(): void {
    if (window.innerWidth >= this.breakpointMd) {
      this.isSidebarOpen = false;
    }
  }
}
