import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit {

  images: string[];

  constructor() {
    this.images = [
      'assets/images/banner-1.jpg',
      'assets/images/banner-2.jpg',
      'assets/images/banner-3.jpg'
    ];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const mySwiper = new Swiper ('.swiper-container');
  }

}
