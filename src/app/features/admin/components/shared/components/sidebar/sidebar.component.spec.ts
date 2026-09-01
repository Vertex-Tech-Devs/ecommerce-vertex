import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create sidebar component', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen).toBeFalse();
  });

  it('should toggle collapsible sections', () => {
    expect(component.isExpanded('catalog')).toBeTrue();
    component.toggleSection('catalog');
    expect(component.isExpanded('catalog')).toBeFalse();
    component.toggleSection('catalog');
    expect(component.isExpanded('catalog')).toBeTrue();
  });

  it('should emit linkClicked on onLinkClick', () => {
    spyOn(component.linkClicked, 'emit');
    component.onLinkClick();
    expect(component.linkClicked.emit).toHaveBeenCalled();
  });

  it('should emit linkClicked on onBackdropClick', () => {
    spyOn(component.linkClicked, 'emit');
    component.onBackdropClick();
    expect(component.linkClicked.emit).toHaveBeenCalled();
  });
});
