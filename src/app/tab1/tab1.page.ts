import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  raisedBedLengthFeet: number;
  raisedBedWidthFeet: number;
  raisedBedHeightInches: number;
  soilVolume: number;

  constructor() {}

  calculateSoilVolume() {
    let raisedBedHeightFeet = this.raisedBedHeightInches / 12;
    this.soilVolume = raisedBedHeightFeet * this.raisedBedLengthFeet * this.raisedBedWidthFeet;
    console.log(this.soilVolume);
  }
}
