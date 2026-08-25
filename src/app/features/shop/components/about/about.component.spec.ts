import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { About } from './about';
import { AboutUsService } from '@core/services/about-us.service';
import type { AboutUsData } from '@core/models/about-us.model';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;
  let aboutUsServiceSpy: jasmine.SpyObj<AboutUsService>;

  const mockAboutUsData: AboutUsData = {
    bannerTitle: 'Sobre Nosotros',
    bannerSubtitle: 'Conoce más acerca de nuestra empresa',
    bannerImageUrl: 'https://example.com/banner.jpg',
    centralTitle: 'Nuestra Historia',
    centralImageUrl: 'https://example.com/story.jpg',
    centralDescription: 'Historia de la tienda.',
    cardsSectionTitle: 'Misión y Visión',
    featureCards: [
      {
        icon: 'bullseye',
        title: 'Misión',
        content: 'Nuestra misión es ofrecer la mejor experiencia.',
      },
    ],
  };

  beforeEach(async () => {
    aboutUsServiceSpy = jasmine.createSpyObj('AboutUsService', ['getAboutUsData']);
    aboutUsServiceSpy.getAboutUsData.and.returnValue(of(mockAboutUsData));

    await TestBed.configureTestingModule({
      imports: [About],
      providers: [{ provide: AboutUsService, useValue: aboutUsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch about us data on construction', (done) => {
    expect(aboutUsServiceSpy.getAboutUsData).toHaveBeenCalled();
    component.data$.subscribe((data) => {
      expect(data).toEqual(mockAboutUsData);
      done();
    });
  });
});
