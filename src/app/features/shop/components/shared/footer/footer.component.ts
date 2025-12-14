import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterData } from '@core/models/footer.model';
import { FooterService } from '@core/services/footer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  currentYear = new Date().getFullYear();

  private footerService = inject(FooterService);

  public footerData$: Observable<FooterData | undefined>;

  constructor() {
    this.footerData$ = this.footerService.getFooterData();
  }
}
