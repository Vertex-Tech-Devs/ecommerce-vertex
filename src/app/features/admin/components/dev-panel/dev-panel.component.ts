import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dev-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container p-4">
      <h2 class="fw-bold mb-4">💻 Panel de Desarrollo (Interno)</h2>
      <div class="card p-4">
        <p>Herramientas y simulaciones para pruebas de entorno.</p>
        <span class="badge bg-success p-2 align-self-start">Entorno de Desarrollo Activo</span>
      </div>
    </div>
  `
})
export class DevPanelComponent {}
