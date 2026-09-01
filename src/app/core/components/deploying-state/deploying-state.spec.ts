import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { DeployingState } from './deploying-state';

describe('DeployingState', () => {
  let component: DeployingState;
  let fixture: ComponentFixture<DeployingState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeployingState],
    }).compileComponents();

    fixture = TestBed.createComponent(DeployingState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have retry method', () => {
    expect(typeof component.retry).toBe('function');
  });
});
