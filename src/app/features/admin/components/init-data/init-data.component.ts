import { Component, inject } from "@angular/core";
import { HomeContentService } from "@core/services/home-content.service";
import { SweetAlertService } from "@core/services/sweet-alert.service";

@Component({
    selector: "app-init-data",
    standalone: true,
    template: `
    <div style="padding: 20px; max-width: 600px; margin: 0 auto;">
      <h2>Inicializar Datos de Prueba</h2>
      <p>Este componente inicializa datos de prueba en Firestore para demostrar el carrusel hero.</p>
      <button (click)="initTestData()" [disabled]="isLoading" style="padding: 10px 20px; font-size: 16px;">
        {{ isLoading ? 'Cargando...' : 'Crear Datos de Prueba' }}
      </button>
    </div>
  `,
})
export class InitDataComponent {
    private homeContentService = inject(HomeContentService);
    private sweetAlertService = inject(SweetAlertService);

    isLoading = false;

    async initTestData() {
        this.isLoading = true;
        try {
            await this.homeContentService.initializeTestData();
            this.sweetAlertService.success(
                "✅ Éxito",
                "Datos de prueba creados correctamente. Recargando...",
            );
            setTimeout(() => window.location.href = "/", 2000);
        } catch (error) {
            console.error(error);
            this.sweetAlertService.error(
                "❌ Error",
                "No se pudieron crear los datos de prueba.",
            );
        } finally {
            this.isLoading = false;
        }
    }
}
