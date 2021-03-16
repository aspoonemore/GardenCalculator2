import { Component } from '@angular/core';
export interface RaisedBed {
  raisedBedName: string;
  raisedBedLengthFeet: number;
  raisedBedWidthFeet: number;
  raisedBedHeightFeet: number;
  soilVolume: number;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  raisedBedName: string;
  raisedBedLengthFeet: number = 8;
  raisedBedWidthFeet: number = 4;
  raisedBedHeightInches: number = 16;
  soilVolume: number;
  testGarden: RaisedBed[] = [];
  totalVolume: number = 0;

  constructor() {}

  addToGardenList() {
    let raisedBedHeightFeet = this.raisedBedHeightInches / 12;
    this.soilVolume = raisedBedHeightFeet * this.raisedBedLengthFeet * this.raisedBedWidthFeet;
    let newTestRaisedBed: RaisedBed = {
      raisedBedName: this.raisedBedName,
      raisedBedHeightFeet: raisedBedHeightFeet,
      raisedBedLengthFeet: this.raisedBedLengthFeet,
      raisedBedWidthFeet: this.raisedBedWidthFeet,
      soilVolume: this.soilVolume,
    }
    this.testGarden.push(newTestRaisedBed);
    this.updateTotalVolume(this.soilVolume);
    console.log(this.testGarden)
  }

  updateTotalVolume(newVolume: number) {
    this.totalVolume += newVolume;
  }
}