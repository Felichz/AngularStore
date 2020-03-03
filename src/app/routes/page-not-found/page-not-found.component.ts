import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    document.getElementById('homeHover').style.display = 'none';
  }

  mouseEnter( event ) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('homeHover').style.display = 'block';
  }

  mouseLeave( event ) {
    document.getElementById('home').style.display = 'block';
    document.getElementById('homeHover').style.display = 'none';
  }

}
