import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.css']
})
export class BottomNavBarComponent implements OnInit {
  btnStyle : string = '';
  btnStyle2 : string = '';
  btnStyle3 : string = '';
  btnStyle4 : string = '';

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  submit() {
    this.btnStyle = 'isActive';
    this.btnStyle2 = '';
    this.btnStyle3 = '';
    this.btnStyle2 = '';
  }
  submit2() {
    this.btnStyle = '';
    this.btnStyle2 = 'isActive';
    this.btnStyle3 = '';
    this.btnStyle4 = '';
  }
  submit3() {
    this.btnStyle = '';
    this.btnStyle2 = '';
    this.btnStyle3 = 'isActive';
    this.btnStyle4 = '';
  }
  submit4() {
    this.btnStyle = '';
    this.btnStyle2 = '';
    this.btnStyle3 = '';
    this.btnStyle4 = 'isActive';
  }
}
