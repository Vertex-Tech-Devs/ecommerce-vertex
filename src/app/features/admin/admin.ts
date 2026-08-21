import { Component, HostListener, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/shared/components/header/header';
import { Sidebar } from './components/shared/components/sidebar/sidebar';
import { FirstRunWizard } from './components/store-config/first-run-wizard';
import { StoreConfigService } from '@core/services/store-config.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Sidebar, FirstRunWizard],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  private configService = inject(StoreConfigService);
  isSidebarOpen: boolean = false;
  isFirstRun = this.configService.isFirstRun;

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
