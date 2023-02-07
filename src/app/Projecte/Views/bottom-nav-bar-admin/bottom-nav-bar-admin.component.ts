import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-bottom-nav-bar-admin',
  templateUrl: './bottom-nav-bar-admin.component.html',
  styleUrls: ['./bottom-nav-bar-admin.component.css']
})
export class BottomNavBarAdminComponent implements OnInit {
  btnStyle : string = '';
  btnStyle2 : string = '';
  btnStyle3 : string = '';
  btnStyle4 : string = '';
  btnStyle5 : string = '';

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  submit() {
    this.btnStyle = 'selected';
    this.btnStyle2 = '';
    this.btnStyle3 = '';
    this.btnStyle4 = '';
    this.btnStyle5 = '';
  }
  submit2() {
    this.btnStyle = '';
    this.btnStyle2 = 'selected';
    this.btnStyle3 = '';
    this.btnStyle4 = '';
    this.btnStyle5 = '';
  }
  submit3() {
    this.btnStyle = '';
    this.btnStyle2 = '';
    this.btnStyle3 = 'selected';
    this.btnStyle4 = '';
    this.btnStyle5 = '';
  }
  submit4() {
    this.btnStyle = '';
    this.btnStyle2 = '';
    this.btnStyle3 = '';
    this.btnStyle4 = 'selected';
    this.btnStyle5 = '';
  }
  submit5() {
    this.btnStyle = '';
    this.btnStyle2 = '';
    this.btnStyle3 = '';
    this.btnStyle4 = '';
    this.btnStyle5 = 'selected';
  }
}
