import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deploying-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deploying-state.html',
  styleUrl: './deploying-state.scss',
})
export class DeployingState {
  retry(): void {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}
