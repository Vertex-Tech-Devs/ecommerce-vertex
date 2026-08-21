import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '@features/shop/components/shared/header/header';
import { Footer } from '@features/shop/components/shared/footer/footer';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class Shop {}
