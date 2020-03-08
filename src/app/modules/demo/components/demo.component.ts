import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  title: string;
  exp: number;

  constructor() {
    this.title = 'Angular Store';
    this.exp = 5;
  }

  ngOnInit() {
    // Es buena practica siempre tener este metodo declarado aunque sea vacio,
    // por si acaso de que se le necesite
  }

}
