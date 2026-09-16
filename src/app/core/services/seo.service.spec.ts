import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';

import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let titleSpy: jasmine.SpyObj<Title>;
  let metaSpy: jasmine.SpyObj<Meta>;

  beforeEach(() => {
    titleSpy = jasmine.createSpyObj('Title', ['setTitle', 'getTitle']);
    metaSpy = jasmine.createSpyObj('Meta', ['updateTag', 'addTag', 'removeTag']);

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy },
      ],
    });

    service = TestBed.inject(SeoService);
  });

  it('should update document title', () => {
    service.setTitle('Nuevo Título');
    expect(titleSpy.setTitle).toHaveBeenCalledWith('Nuevo Título');
  });

  it('should update meta description tag', () => {
    service.setMetaDescription('Descripción de la tienda');
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Descripción de la tienda',
    });
  });

  it('should update OpenGraph tags', () => {
    service.setOpenGraphTags({
      title: 'OG Title',
      description: 'OG Desc',
      image: 'http://img.jpg',
      url: 'http://store.com',
      type: 'website',
    });

    expect(metaSpy.updateTag).toHaveBeenCalledWith({ property: 'og:title', content: 'OG Title' });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: 'OG Desc',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: 'http://img.jpg',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:url',
      content: 'http://store.com',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      property: 'og:type',
      content: 'website',
    });
  });

  it('should update Twitter card tags', () => {
    service.setTwitterTags({
      card: 'summary_large_image',
      title: 'Twitter Title',
      description: 'Twitter Desc',
      image: 'http://twitter.jpg',
    });

    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'twitter:title',
      content: 'Twitter Title',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'twitter:description',
      content: 'Twitter Desc',
    });
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'twitter:image',
      content: 'http://twitter.jpg',
    });
  });

  it('should reset default title and description', () => {
    service.resetDefaults();
    expect(titleSpy.setTitle).toHaveBeenCalledWith('Vertex Store');
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Tienda online oficial',
    });
  });
});
