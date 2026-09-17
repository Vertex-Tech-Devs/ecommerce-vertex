import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Observable } from 'rxjs';
import type { AboutUsData } from '@core/models/about-us.model';
import { AboutUsService } from '@core/services/about-us.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private aboutUsService = inject(AboutUsService);

  readonly data$: Observable<AboutUsData | undefined> = this.aboutUsService.getAboutUsData();
  readonly about = toSignal(this.data$);
}
