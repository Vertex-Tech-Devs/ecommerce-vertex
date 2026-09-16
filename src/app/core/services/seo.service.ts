import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface OpenGraphTags {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export interface TwitterCardTags {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  setMetaDescription(description: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  setOpenGraphTags(options: OpenGraphTags): void {
    if (options.title) {
      this.metaService.updateTag({ property: 'og:title', content: options.title });
    }
    if (options.description) {
      this.metaService.updateTag({ property: 'og:description', content: options.description });
    }
    if (options.image) {
      this.metaService.updateTag({ property: 'og:image', content: options.image });
    }
    if (options.url) {
      this.metaService.updateTag({ property: 'og:url', content: options.url });
    }
    if (options.type) {
      this.metaService.updateTag({ property: 'og:type', content: options.type });
    }
  }

  setTwitterTags(options: TwitterCardTags): void {
    if (options.card) {
      this.metaService.updateTag({ name: 'twitter:card', content: options.card });
    }
    if (options.title) {
      this.metaService.updateTag({ name: 'twitter:title', content: options.title });
    }
    if (options.description) {
      this.metaService.updateTag({ name: 'twitter:description', content: options.description });
    }
    if (options.image) {
      this.metaService.updateTag({ name: 'twitter:image', content: options.image });
    }
  }

  resetDefaults(): void {
    this.setTitle('Vertex Store');
    this.setMetaDescription('Tienda online oficial');
  }
}
