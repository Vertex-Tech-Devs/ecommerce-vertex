import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeedDataService } from '@core/services/seed-data.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-dev-seed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dev-seed.component.html',
  styleUrls: ['./dev-seed.component.scss'],
})
export class DevSeedComponent {
  private seedDataService = inject(SeedDataService);

  tenantId = environment.tenantId;
  projectId = environment.firebaseConfig.projectId;
  production = environment.production;

  isSeeding = false;
  successMessage = '';
  errorMessage = '';

  async onSeed(): Promise<void> {
    this.isSeeding = true;
    this.successMessage = '';
    this.errorMessage = '';
    try {
      await this.seedDataService.seedAllData();
      this.successMessage = '¡Base de datos inicializada y sembrada con éxito!';
    } catch (error: unknown) {
      console.error(error);
      const msg = error instanceof Error ? error.message : String(error);
      this.errorMessage = msg ?? 'Error al ejecutar el semillero. Ver consola para más detalles.';
    } finally {
      this.isSeeding = false;
    }
  }
}
