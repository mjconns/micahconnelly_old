import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  Gallery,
  GalleryItem,
  ImageItem,
  ThumbnailsPosition,
  ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css']
})
export class PhotographyComponent implements OnInit {
  public data = [];
  public items: GalleryItem[];
  public log: string[] = [];
  public lightboxref;
  constructor(private gallery: Gallery, private lightbox: Lightbox) {}

  ngOnInit(): void {
    this.data = [
      {
        srcUrl: 'https://i.imgur.com/8yui1eR.jpg',
        previewUrl: 'https://i.imgur.com/8yui1eR.jpg',
      },
      {
        srcUrl: 'https://i.imgur.com/FsjwKyv.jpg',
        previewUrl: 'https://i.imgur.com/FsjwKyv.jpg',
      },
      {
        srcUrl: 'https://i.imgur.com/TfycV1r.jpg',
        previewUrl: 'https://i.imgur.com/TfycV1r.jpg',
      },
      {
        srcUrl: 'https://i.imgur.com/xzBFvmv.jpg',
        previewUrl: 'https://i.imgur.com/xzBFvmv.jpg',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      },
      {
        srcUrl: '',
        previewUrl: '',
      }
    ];
    this.lightboxref = this.gallery.ref('lightbox');
    this.lightboxref.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top,
    });

    this.items = this.data.map(
      (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    );

    this.lightboxref.load(this.items);
  }

  public onChange(index: number) {
    this.log.push(`MatCarousel#change emitted with index ${index}`);
  }

}
