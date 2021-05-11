import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { RaisedBed } from '../tab1/tab1.page';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // JSON "set" example
async setRaisedBeds(beds: RaisedBed[]) {
  await Storage.set({
    key: 'beds',
    value: JSON.stringify(beds)
  });
}

// JSON "get" example
async getRaisedBeds() {
  const ret = await Storage.get({ key: 'beds' });
  return JSON.parse(ret.value);
}
}

