import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import type { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { HeroImage } from '@core/models/home-content.model';
import type { Category } from '@core/models/category.model';
import type { Product } from '@core/models/product.model';

@Component({
  selector: 'app-hero-link-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'hero-link-modal.component.html',
  styleUrl: 'hero-link-modal.component.scss',
})
export class HeroLinkModalComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() heroImage!: HeroImage;
  @Input() heroIndex = -1;
  @Input() categories: Category[] = [];
  @Input() filteredProducts: Product[] = [];
  @Input() productSearchTerm = '';

  @Output() close = new EventEmitter<void>();
  @Output() updateType = new EventEmitter<'product' | 'category' | 'none'>();
  @Output() updateId = new EventEmitter<string>();
  @Output() searchProduct = new EventEmitter<string>();

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  isDropdownOpen = false;

  get selectedProduct(): Product | undefined {
    if (!this.heroImage?.linkId) {
      return undefined;
    }
    return this.filteredProducts.find((p) => p.id === this.heroImage.linkId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible']?.currentValue && this.heroImage?.linkType === 'product') {
      this.isDropdownOpen = false;
      this.focusSearchInput();
    }
  }

  onClose(): void {
    this.isDropdownOpen = false;
    this.close.emit();
  }

  onTypeChange(event: Event): void {
    const type = (event.target as HTMLSelectElement).value as 'product' | 'category' | 'none';
    this.updateType.emit(type);
    if (type === 'product') {
      this.isDropdownOpen = true;
      this.focusSearchInput();
    } else {
      this.isDropdownOpen = false;
    }
  }

  onIdChange(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    this.updateId.emit(id);
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchProduct.emit(term);
    this.isDropdownOpen = true;
  }

  selectProduct(product: Product): void {
    this.updateId.emit(product.id);
    this.searchProduct.emit(product.name);
    this.isDropdownOpen = false;
  }

  clearSelectedProduct(): void {
    this.updateId.emit('');
    this.searchProduct.emit('');
    this.isDropdownOpen = true;
    this.focusSearchInput();
  }

  focusSearchInput(): void {
    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
    }, 0);
  }
}
