import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Output() linkClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onLinkClick(): void {
    this.linkClicked.emit();
  }

}
