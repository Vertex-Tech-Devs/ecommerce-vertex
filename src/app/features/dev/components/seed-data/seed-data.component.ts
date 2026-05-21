import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SeedDataService } from '@core/services/seed-data.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';

@Component({
  selector: 'app-seed-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seed-data.component.html',
  styleUrls: ['./seed-data.component.scss'],
})
export class SeedDataComponent {
  private seedDataService = inject(SeedDataService);
  private sweetAlertService = inject(SweetAlertService);
  private router = inject(Router);

  isLoading = false;

  async onSeedData(): Promise<void> {
    this.isLoading = true;

    try {
      await this.seedDataService.seedAllData();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      void this.router.navigate(['/shop']);
    } catch {
      this.isLoading = false;
    }
  }

  onCancel(): void {
    void this.router.navigate(['/shop']);
  }
}
