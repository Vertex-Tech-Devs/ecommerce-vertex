import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-pagination.html',
  styleUrl: './admin-pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPagination {
  readonly totalItems = input<number>(0);
  readonly currentPage = input<number>(1);
  readonly pageSize = input<number>(10);
  readonly pageSizeOptions = input<number[]>([10, 25, 50]);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalItems() / Math.max(1, this.pageSize()))),
  );

  readonly startItem = computed(() => {
    if (this.totalItems() === 0) {
      return 0;
    }
    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  readonly endItem = computed(() => {
    return Math.min(this.totalItems(), this.currentPage() * this.pageSize());
  });

  readonly visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);
    if (current > 3) {
      pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }
    pages.push(total);

    return pages;
  });

  onPageClick(page: number | string): void {
    if (
      typeof page === 'number' &&
      page >= 1 &&
      page <= this.totalPages() &&
      page !== this.currentPage()
    ) {
      this.pageChange.emit(page);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  onSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSize = Number(target.value);
    if (newSize && newSize !== this.pageSize()) {
      this.pageSizeChange.emit(newSize);
    }
  }
}
