import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;

  constructor(
    private updates: SwUpdate,
    ) {}

    public init() {
      if (this.updates.isEnabled) {
        console.log('service worker enabled');
        this.updates.checkForUpdate();
        this._setupUpdateService();
      } else {
        console.log('service worker disabled');
      }
    }
    private _setupUpdateService() {
      const intervalObs = interval(60000);
      intervalObs.subscribe(() => {
        this.updates.checkForUpdate();
      });
      this.updates.available.subscribe(evt => {
        console.log('sw update available');
        this.updates.activateUpdate().then(() => document.location.reload());
      });
    }
}
