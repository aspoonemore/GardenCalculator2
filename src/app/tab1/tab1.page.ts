import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Guid } from 'guid-typescript';
import { LocalStorageService } from '../services/local-storage.service';
export interface RaisedBed {
  raisedBedId: Guid;
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
export class Tab1Page implements OnInit{
  raisedBedName: string;
  raisedBedLengthFeet: number;
  raisedBedWidthFeet: number;
  raisedBedHeightInches: number;
  soilVolume: number;
  raisedBeds: RaisedBed[] = [];
  totalVolume: number = 0;

  constructor(public alertController: AlertController, private localStorageService: LocalStorageService) {}

  ngOnInit(){
    this.loadRaisedBeds();
  }

  addToGardenList() {
    let raisedBedHeightFeet = this.raisedBedHeightInches / 12;
    this.soilVolume = raisedBedHeightFeet * this.raisedBedLengthFeet * this.raisedBedWidthFeet;
    const newGuid = Guid.create();
    let newTestRaisedBed: RaisedBed = {
      raisedBedName: this.raisedBedName,
      raisedBedHeightFeet: raisedBedHeightFeet,
      raisedBedLengthFeet: this.raisedBedLengthFeet,
      raisedBedWidthFeet: this.raisedBedWidthFeet,
      soilVolume: this.soilVolume,
      raisedBedId: newGuid
    }
    this.raisedBeds.push(newTestRaisedBed);
    this.updateTotalVolume(this.soilVolume);
    this.saveRaisedBeds();
    this.raisedBedName = '';
  }

  updateTotalVolume(newVolume: number) {
    this.totalVolume += newVolume;
  }

  saveRaisedBeds(){
    this.localStorageService.setRaisedBeds(this.raisedBeds);
  }

  loadRaisedBeds(){
    this.localStorageService.getRaisedBeds().then(res => {
      if(res)
      this.raisedBeds = res
    });
  }

  async confirmDeleteRaisedBed(raisedBed: RaisedBed, index: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Raised Bed?',
      message: `Are you sure you want to delete ${this.determineRaisedBedName(raisedBed, index)}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteGarden(raisedBed.raisedBedId);
            this.saveRaisedBeds();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteGarden(raisedBedId: Guid) {
    console.log(raisedBedId);
    let newRaisedBeds = this.raisedBeds.filter(x => {
      
      return !raisedBedId.equals(x.raisedBedId)
    })
    this.raisedBeds = newRaisedBeds;
  }

  determineRaisedBedName(raisedBed: RaisedBed, index: number) {
    if (raisedBed.raisedBedName) {
      return raisedBed.raisedBedName
    } else return `Garden ${index}`
  }

}