import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css']
})
export class PhotographyComponent implements OnInit {
  public data = [];
  constructor() {}

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
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // },
      // {
      //   srcUrl: '',
      //   previewUrl: '',
      // }
    ];
  }

}
