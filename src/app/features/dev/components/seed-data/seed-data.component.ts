import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SeedDataService } from '@core/services/seed-data.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';

@Component({
  selector: 'app-seed-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="seed-container">
      <div class="seed-card">
        <div class="seed-header">
          <h1><i class="bi bi-database-fill-add"></i> Generador de Datos de Prueba</h1>
          <p class="subtitle">Esta herramienta solo debe usarse en desarrollo</p>
        </div>

        <div class="seed-content">
          <div class="info-box">
            <h3><i class="bi bi-info-circle"></i> ¿Qué hace este generador?</h3>
            <ul>
              <li>✓ Crea 5 atributos globales (talles, colores, material)</li>
              <li>✓ Crea 5 categorías de indumentaria y calzado</li>
              <li>✓ Genera 25 productos con precios, descripciones y 4 imágenes cada uno</li>
              <li>✓ Configura el banner hero con <strong>5 imágenes</strong> (slots completos)</li>
              <li>✓ Crea 3 categorías destacadas en la home</li>
              <li>✓ Agrega 20 clientes con datos realistas argentinos</li>
              <li>✓ Genera 20 pedidos con distintos estados y productos reales</li>
              <li>✓ Completa el contenido de "Quiénes Somos" y el footer</li>
            </ul>
          </div>

          <div class="warning-box">
            <i class="bi bi-exclamation-triangle"></i>
            <div>
              <strong>Atención:</strong>
              <p>
                Esta acción <strong>elimina absolutamente todos los datos</strong> (productos,
                categorías, pedidos, clientes, atributos, banner, About y Footer) y los
                vuelve a crear desde cero con datos de prueba completos y consistentes.
              </p>
            </div>
          </div>

          <div class="stats-box">
            <h3>📊 Datos que se generarán:</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">5</div>
                <div class="stat-label">Atributos</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">5</div>
                <div class="stat-label">Categorías</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">25</div>
                <div class="stat-label">Productos</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">5</div>
                <div class="stat-label">Fotos Hero</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">20</div>
                <div class="stat-label">Clientes</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">20</div>
                <div class="stat-label">Pedidos</div>
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <button
              (click)="onSeedData()"
              [disabled]="isLoading"
              class="btn btn-warning btn-lg"
            >
              <i class="bi bi-arrow-clockwise"></i>
              {{ isLoading ? 'Regenerando...' : 'Regenerar Todo' }}
            </button>
            <button (click)="onCancel()" class="btn btn-secondary btn-lg">
              <i class="bi bi-x-lg"></i> Cancelar
            </button>
          </div>

          <div class="info-footer">
            <p>
              Las imágenes se obtienen de <strong>picsum.photos</strong> (licencia abierta). Todos los datos son
              ficticios y solo sirven para testing y demostración. No usar en producción.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .seed-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .seed-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 700px;
      width: 100%;
      overflow: hidden;
    }

    .seed-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      text-align: center;

      h1 {
        margin: 0;
        font-size: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        i {
          font-size: 2.5rem;
        }
      }

      .subtitle {
        margin: 0.5rem 0 0 0;
        opacity: 0.9;
        font-size: 0.9rem;
      }
    }

    .seed-content {
      padding: 2rem;
    }

    .info-box {
      background: #f0f7ff;
      border-left: 4px solid #667eea;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;

      h3 {
        margin: 0 0 1rem 0;
        color: #667eea;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 0.5rem 0;
          color: #333;
          font-size: 0.95rem;

          &:before {
            content: '✓ ';
            color: #28a745;
            font-weight: bold;
            margin-right: 0.5rem;
          }
        }
      }
    }

    .warning-box {
      background: #fff3cd;
      border: 2px solid #ffc107;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      display: flex;
      gap: 1rem;

      i {
        font-size: 1.5rem;
        color: #ff6b6b;
        flex-shrink: 0;
      }

      strong {
        color: #ff6b6b;
      }

      p {
        margin: 0.5rem 0 0 0;
        font-size: 0.9rem;
        color: #333;
      }
    }

    .stats-box {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;

      h3 {
        margin: 0 0 1.5rem 0;
        color: #333;
        font-size: 1.1rem;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
      }

      .stat-item {
        text-align: center;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #666;
          font-weight: 500;
        }
      }
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;

      button {
        flex: 1;
        min-width: 150px;
        padding: 1rem;
        font-size: 1rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.3s ease;

        i {
          font-size: 1.2rem;
        }

        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      }

      .btn-success {
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(40, 167, 69, 0.3);
        }
      }

      .btn-secondary {
        background: #6c757d;
        color: white;

        &:hover {
          background: #5a6268;
          transform: translateY(-2px);
        }
      }

      .btn-lg {
        padding: 1.2rem;
        font-size: 1.1rem;
      }
    }

    .info-footer {
      text-align: center;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      font-size: 0.85rem;
      color: #666;

      p {
        margin: 0;
      }

      strong {
        color: #333;
      }
    }

    @media (max-width: 600px) {
      .seed-container {
        padding: 1rem;
      }

      .seed-card {
        border-radius: 8px;
      }

      .seed-header {
        padding: 1.5rem;

        h1 {
          font-size: 1.5rem;
        }
      }

      .seed-content {
        padding: 1rem;
      }

      .action-buttons {
        flex-direction: column;

        button {
          width: 100%;
          font-size: 0.9rem;
          padding: 0.8rem;
        }
      }

      .stats-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }
  `],
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
      this.router.navigate(['/shop']);
    } catch (error) {
      this.isLoading = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/shop']);
  }
}
