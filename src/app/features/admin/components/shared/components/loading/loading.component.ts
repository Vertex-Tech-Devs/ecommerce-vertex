import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoadingComponent implements OnInit, OnDestroy {
  isLoading!: Observable<boolean>;
  private subscription!: Subscription;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.isLoading = this.loadingService.isLoading$;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
