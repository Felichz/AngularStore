import { Component, OnInit } from '@angular/core';
import {
  Observable,
  from,
  Subject,
  of,
  interval,
  concat,
  ConnectableObservable
} from 'rxjs';

import {
  map,
  concatAll,
  mergeAll,
  switchAll,
  exhaust,
  take,
  multicast
} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
