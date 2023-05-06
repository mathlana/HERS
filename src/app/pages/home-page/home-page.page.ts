import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit, OnDestroy {

  constructor() { 
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');

  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter');

  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');

  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave');

  }
  ionViewDidLeave() {
    console.log('ionViewDidLeave');

  }
  ngOnDestroy(){
    console.log('ngOnDestroy');
  }
}
