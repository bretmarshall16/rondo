import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;

  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar
    ) {
    swUpdate.available.subscribe(event => {
      const ref = this.snackBar.open('UPDATE AVAILABLE', 'UDATE', {
        duration: 2000,
      });

      ref.afterDismissed().subscribe(o => {
        window.location.reload();
      });
    });


    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }
}
