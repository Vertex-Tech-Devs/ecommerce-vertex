import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class LoadingComponent {
  private readonly loadingService = inject(LoadingService);

  readonly isLoading = this.loadingService.isLoading;
}
